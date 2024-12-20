require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../model/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import CatchAsyncError from '../middleware/catchAsyncErrors';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import { sendEmail } from '../utils/sendMail';
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from '../utils/jwt';
import { getUserById } from '../services/user.service';
import { redis } from '../utils/redis';

// --------------------REGISTER USER---------------------------

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  role : string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password,role } = req.body;
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler('Email is already exist', 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
        role,
      };
      const activationToken = createActivateToken(user);
      const activationCode = activationToken.activationCode;
      const activation_token = activationToken.token;

      const templateData = {
        user: { name: user.name },
        activation_token,
        activationCode
      };

      // Call the sendEmail function to send the activation mail
      await sendEmail({
        to: user.email,
        subject: 'Account activation',
        templateName: 'activation-mail',
        templateData,
      });

      res.status(200).json({
        success: true,
        activation_token,
        message: 'Activation email sent successfully !',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivateToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = Jwt.sign(
    { user, activationCode }, // Payload
    process.env.ACTIVATION_SECRET as string, // Secret key from environment variables
    { expiresIn: '5m' } // Token expiration time
  );

  return { token, activationCode };
};

// --------------------ACTIVATE USER---------------------------

// activate user structure
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;
             

      // Verify the JWT Token
      const decodedToken = Jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      );
      

      // Type Guard to ensure decodedToken is of type JwtPayload and contains the expected properties
      if (
        typeof decodedToken === 'object' &&
        'user' in decodedToken &&
        'activationCode' in decodedToken
      ) {
        const newUser = decodedToken as { user: IUser; activationCode: string };

        // compare the activation code
        if (newUser.activationCode !== activation_code) {
          return next(new ErrorHandler('Invalid activation code', 400));
        }

        // Proceed with checking / saving the user in the database
        const userExists = await User.findOne({ email: newUser.user.email });

        if (userExists) {
          return next(new ErrorHandler('User already exists', 400));
        }

        // Create a new User in the database
        const user = await User.create(newUser.user);

        res.status(201).json({
          success: true,
          message: `Dear ${user.name} ,  your account has been successfully activated`,
          user,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler('Invalid or expired token', 400));
    }
  }
);

// -----------------------LOGIN USER-----------------------------

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password !', 400));
      }

      const user = (await User.findOne({ email }).select('+password')) as IUser;

      if (!user) {
        return next(new ErrorHandler('Invalid email or password !', 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Email or Password !', 400));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// LOGOUT USER
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.status(201).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ------------UPDATE ACCESS TOKEN BY REFRESHING TOKEN --------

export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      console.log("this is for production refresh token", refresh_token)

      // Check if refresh token exists
      if (!refresh_token) {
        return next(new ErrorHandler('No refresh token found', 400));
      }

      let decoded: JwtPayload;
      try {
        // Verify the refresh token
        decoded = Jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN as string
        ) as JwtPayload;
      } catch (err) {
        return next(new ErrorHandler('Invalid or expired refresh token', 401));
      }

      // Ensure the token has been decoded properly
      if (!decoded || !decoded.id) {
        return next(new ErrorHandler('Could not refresh token', 400));
      }

      // Fetch session from Redis
      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler('No active session found', 400));
      }

      // Parse session data (user object)
      const user = JSON.parse(session);

      // Generate a new access token
      const accessToken = Jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: '15m' } // Set expiration to 15 minutes
      );

      // Optionally refresh the refresh token if needed
      const refreshToken = Jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: '3d' } // Set expiration to 3 days
      );


      // Set tokens as cookies
      res.cookie('access_token', accessToken, accessTokenOptions);
      res.cookie('refresh_token', refreshToken, refreshTokenOptions);

      // Update session in Redis and extend expiration time (e.g., 3 days)
      await redis.set(user._id, JSON.stringify(user), 'EX', 3 * 24 * 60 * 60); // Expire in 3 days

      // Send response
      res.status(200).json({
        status: 'success',
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message || 'Something went wrong', 500));
    }
  }
);

// ----------------GET USER INFO by ID-----------------------

export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      await getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//----------------SOCIAL AUTH -------------------------

interface ISocialAuth {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, avatar } = req.body as ISocialAuth;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({
          email,
          avatar,
          name,
        });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// --------------UPDATE USER INFO -----------------------

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;

      // Check if both name and email are either not provided or are empty strings
      if (!name && !email) {
        return next(
          new ErrorHandler('Please provide a name or email to update', 400)
        );
      }
      const userId = req.user?._id as string;
      const user = await User.findById(userId);
      if (email && user) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return next(new ErrorHandler('Email already exists', 400));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
      }
      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// -------------UPDATE PASSWORD ------------------
// update password

interface IUdatePassword {
    oldPassword : string;
    newPassword : string;
}

export const updatePassword = CatchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {oldPassword, newPassword } = req.body as IUdatePassword

      if(!oldPassword || !newPassword){
        return next ( new ErrorHandler("Please enter oldPassword and new Password",400))
      }


      const user = await User.findById(req.user?._id).select("+password")
      if(user?.password === undefined){
        return next ( new ErrorHandler("Invalid User",400))
      }
     const isPasswordMatch = user?.comparePassword(oldPassword);
     if(!isPasswordMatch){
        return next (new ErrorHandler("Invalid old password",400))
     }
     user.password = newPassword
      
    }catch(error:any){
     return next (new ErrorHandler(error.message,400))
    }
})

//-----------UPDATE PROFILE ------------------

interface IUpdateProfilePicture {
  avatar : string;
}

export const updateProfilePicture = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {avatar} = req.body as IUpdateProfilePicture
    const userId = req.user?._id as string

    const user = await User.findById(userId)


    if ( avatar && user ){
      if(user?.avatar?.public_id) {
        await cloudinary.uploader.destroy(user?.avatar?.public_id);

        const myCloud = await cloudinary.uploader.upload(avatar, {
          folder : "avatars",
          width : 150,
        });
        user.avatar = {
          public_id:myCloud.public_id,
          url : myCloud.secure_url,
        }

      }
    }
    await user?.save();
    await redis.set(userId, JSON.stringify(user))

    res.status(200).json({
      success : true,
      user
    })
     
  }catch(error:any){
    return next ( new ErrorHandler(error.message, 400))
  }
})


/// GET all user -- admin only

export const getAllUsers = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const users = await User.find();

    res.status(200).json({
      success : true,
      users
    })
  }catch(error:any){
    return next (new ErrorHandler(error.message,400))
  }
})

// ----------UPDATE USER ROLE -------------------------

export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, role } = req.body; // Get userId and role from request body

      // Validate role input
      const validRoles = ['user', 'admin']; // Define valid roles
      if (!validRoles.includes(role)) {
        return next(new ErrorHandler('Invalid role provided', 400));
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }

      // Update the user's role
      user.role = role;
      await user.save(); // Save the updated user

      res.status(200).json({
        success: true,
        message: `User role updated to ${role} successfully!`,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ----------------- DELETE USER -- ONLY ADMIN ------------------

export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id; // Get userId from request body

      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }

      // Delete the user
      await user.deleteOne();
      await redis.del(id)

      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);