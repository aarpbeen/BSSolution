

require("dotenv").config()
import mongoose, {Document, Model, mongo, Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import  Jwt from "jsonwebtoken";

const emailRegexPattern : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Define role types
export enum UserRole {
    CLIENT = "client",
    RESEARCHER = "researcher",
    STUDENT = "student",
    ADMIN = "admin",
    USER = "user"  // Default role
}

// Define the IUser interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: {
        public_id?: string;
        url?: string;
    };
    role: UserRole; 
    isVerified: boolean;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
}

const userSchema : Schema<IUser> = new mongoose.Schema({
    name : {
        type :String,
        required : [true, " Please enter your name "],
    },
    email : {
        type : String,
        required : [true, " Please enter you email " ],
        validate : {
            validator : function (value : string){
                return emailRegexPattern.test(value)
            },
            message : "Please enter a valid email"
        },
        unique : true,
    },
    password : {
    type : String,
    minlength : [6, "Password must be at least 6 characters"],
    select : false,
    },

    avatar : {
        public_id : String,
        url : String,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),  // Enforces enum types
        default: UserRole.USER
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
  
},{timestamps : true})

// Hash Password before saving

userSchema.pre<IUser>('save', async function (next){
    if(!this.isModified('password')) return next()

        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password,salt)
        } catch(error:any){
            next(error)
        }
});

// sign access token

userSchema.methods.SignAccessToken = function () : string {
    return Jwt.sign({
        id : this._id,
    },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '5m' }
    )
}

// sign refresh token
 userSchema.methods.SignRefreshToken = function (): string {
    return Jwt.sign({
        id : this._id,
    },
    process.env.REFRESH_TOKEN as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
)
 }

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User : Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User;