require("dotenv").config();
import { Response } from "express";
import { IUser } from "../model/user.model";
import {redis} from "./redis"

interface ITokenOptions {
    expires : Date;
    maxAge : number;
    httpOnly :boolean;
    samesite : 'lax' | 'strict' | 'none' | undefined
    secure?:boolean;
}

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10)

export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    samesite: 'lax',
  };

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samesite: 'lax',
  };

export const sendToken = async (user : IUser, statusCode : number , res :Response) =>{
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken();

    // Upload session to Redis with expiration (e.g., 7 days)
    await redis.set(user._id as string, JSON.stringify(user), 'EX', 7 * 24 * 60 * 60); // Set to expire in 7 days

 
    // only set to true in production
    if(process.env.NODE_ENV === 'production'){
        accessTokenOptions.secure = true
    }

    // Send tokens as HTTP-only cookies
    res.cookie('access_token',accessToken,accessTokenOptions)
    res.cookie('refresh_token',refreshToken,refreshTokenOptions)

    res.status(statusCode).json({
        success : true,
        user,
        accessToken,
       
    })


} 
