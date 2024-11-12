require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";


export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    // Check if the access token exists in the request
    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    let decoded: JwtPayload | undefined;

    // Verify the access token
    try {
        decoded = Jwt.verify(
            access_token,
            process.env.ACCESS_TOKEN as string
        ) as JwtPayload;
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired access token", 403));
    }

    // Ensure the decoded token contains a user ID
    if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Access token is not valid", 400));
    }

    // Retrieve user from Redis using the user ID from the token
    try {
        const user = await redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        req.user = JSON.parse(user); // Set the user object to req.user
    } catch (redisError) {
        return next(new ErrorHandler("Failed to fetch user from Redis", 500));
    }

    // Proceed to the next middleware or route handler
    next();
});

// validate user roles

export const authorizeRoles = (...roles : string[]) =>{
 return (req:Request, res:Response,next:NextFunction) =>{
    if(!roles.includes(req.user?.role || '')){
     return next (new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resources`,403))
    }
    next();
 }
}
