"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateProfilePicture = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivateToken = exports.registrationUser = void 0;
require('dotenv').config();
const user_model_1 = __importDefault(require("../model/user.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const sendMail_1 = require("../utils/sendMail");
const jwt_1 = require("../utils/jwt");
const user_service_1 = require("../services/user.service");
const redis_1 = require("../utils/redis");
exports.registrationUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default('Email is already exist', 400));
        }
        const user = {
            name,
            email,
            password,
            role,
        };
        const activationToken = (0, exports.createActivateToken)(user);
        const activationCode = activationToken.activationCode;
        const activation_token = activationToken.token;
        const templateData = {
            user: { name: user.name },
            activation_token,
            activationCode
        };
        // Call the sendEmail function to send the activation mail
        yield (0, sendMail_1.sendEmail)({
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
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const createActivateToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, // Payload
    process.env.ACTIVATION_SECRET, // Secret key from environment variables
    { expiresIn: '5m' } // Token expiration time
    );
    return { token, activationCode };
};
exports.createActivateToken = createActivateToken;
exports.activateUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        // Verify the JWT Token
        const decodedToken = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        // Type Guard to ensure decodedToken is of type JwtPayload and contains the expected properties
        if (typeof decodedToken === 'object' &&
            'user' in decodedToken &&
            'activationCode' in decodedToken) {
            const newUser = decodedToken;
            // compare the activation code
            if (newUser.activationCode !== activation_code) {
                return next(new ErrorHandler_1.default('Invalid activation code', 400));
            }
            // Proceed with checking / saving the user in the database
            const userExists = yield user_model_1.default.findOne({ email: newUser.user.email });
            if (userExists) {
                return next(new ErrorHandler_1.default('User already exists', 400));
            }
            // Create a new User in the database
            const user = yield user_model_1.default.create(newUser.user);
            res.status(201).json({
                success: true,
                message: `Dear ${user.name} ,  your account has been successfully activated`,
                user,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default('Invalid or expired token', 400));
    }
}));
exports.loginUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler_1.default('Please enter email and password !', 400));
        }
        const user = (yield user_model_1.default.findOne({ email }).select('+password'));
        if (!user) {
            return next(new ErrorHandler_1.default('Invalid email or password !', 400));
        }
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default('Invalid Email or Password !', 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// LOGOUT USER
exports.logoutUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('access_token', '', { maxAge: 1 });
        res.cookie('refresh_token', '', { maxAge: 1 });
        res.status(201).json({
            success: true,
            message: 'Logged out successfully',
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// ------------UPDATE ACCESS TOKEN BY REFRESHING TOKEN --------
exports.updateAccessToken = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        // Check if refresh token exists
        if (!refresh_token) {
            return next(new ErrorHandler_1.default('No refresh token found', 400));
        }
        let decoded;
        try {
            // Verify the refresh token
            decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        }
        catch (err) {
            return next(new ErrorHandler_1.default('Invalid or expired refresh token', 401));
        }
        // Ensure the token has been decoded properly
        if (!decoded || !decoded.id) {
            return next(new ErrorHandler_1.default('Could not refresh token', 400));
        }
        // Fetch session from Redis
        const session = yield redis_1.redis.get(decoded.id);
        if (!session) {
            return next(new ErrorHandler_1.default('No active session found', 400));
        }
        // Parse session data (user object)
        const user = JSON.parse(session);
        // Generate a new access token
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' } // Set expiration to 15 minutes
        );
        // Optionally refresh the refresh token if needed
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: '3d' } // Set expiration to 3 days
        );
        // Set tokens as cookies
        res.cookie('access_token', accessToken, jwt_1.accessTokenOptions);
        res.cookie('refresh_token', refreshToken, jwt_1.refreshTokenOptions);
        // Update session in Redis and extend expiration time (e.g., 3 days)
        yield redis_1.redis.set(user._id, JSON.stringify(user), 'EX', 3 * 24 * 60 * 60); // Expire in 3 days
        // Send response
        res.status(200).json({
            status: 'success',
            accessToken,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message || 'Something went wrong', 500));
    }
}));
// ----------------GET USER INFO by ID-----------------------
exports.getUserInfo = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        yield (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.socialAuth = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({
                email,
                avatar,
                name,
            });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserInfo = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email } = req.body;
        // Check if both name and email are either not provided or are empty strings
        if (!name && !email) {
            return next(new ErrorHandler_1.default('Please provide a name or email to update', 400));
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (email && user) {
            const emailExists = yield user_model_1.default.findOne({ email });
            if (emailExists) {
                return next(new ErrorHandler_1.default('Email already exists', 400));
            }
            user.email = email;
        }
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updatePassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler_1.default("Please enter oldPassword and new Password", 400));
        }
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("+password");
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("Invalid User", 400));
        }
        const isPasswordMatch = user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Invalid old password", 400));
        }
        user.password = newPassword;
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateProfilePicture = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { avatar } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (avatar && user) {
            if ((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id) {
                yield cloudinary_1.v2.uploader.destroy((_c = user === null || user === void 0 ? void 0 : user.avatar) === null || _c === void 0 ? void 0 : _c.public_id);
                const myCloud = yield cloudinary_1.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
/// GET all user -- admin only
exports.getAllUsers = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// ----------UPDATE USER ROLE -------------------------
exports.updateUserRole = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body; // Get userId and role from request body
        // Validate role input
        const validRoles = ['user', 'admin']; // Define valid roles
        if (!validRoles.includes(role)) {
            return next(new ErrorHandler_1.default('Invalid role provided', 400));
        }
        // Find the user by ID
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default('User not found', 404));
        }
        // Update the user's role
        user.role = role;
        yield user.save(); // Save the updated user
        res.status(200).json({
            success: true,
            message: `User role updated to ${role} successfully!`,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// ----------------- DELETE USER -- ONLY ADMIN ------------------
exports.deleteUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Get userId from request body
        // Find the user by ID
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default('User not found', 404));
        }
        // Delete the user
        yield user.deleteOne();
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
