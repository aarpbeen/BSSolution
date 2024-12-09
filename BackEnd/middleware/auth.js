"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticated = void 0;
require("dotenv").config();
const catchAsyncErrors_1 = __importDefault(require("./catchAsyncErrors"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
exports.isAuthenticated = (0, catchAsyncErrors_1.default)(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    // Check if the access token exists in the request
    if (!access_token) {
        return next(new ErrorHandler_1.default("Please login to access this resource", 401));
    }
    let decoded;
    // Verify the access token
    try {
        decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Invalid or expired access token", 403));
    }
    // Ensure the decoded token contains a user ID
    if (!decoded || !decoded.id) {
        return next(new ErrorHandler_1.default("Access token is not valid", 400));
    }
    // Retrieve user from Redis using the user ID from the token
    try {
        const user = await redis_1.redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        req.user = JSON.parse(user); // Set the user object to req.user
    }
    catch (redisError) {
        return next(new ErrorHandler_1.default("Failed to fetch user from Redis", 500));
    }
    // Proceed to the next middleware or route handler
    next();
});
// validate user roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new ErrorHandler_1.default(`Role: ${req.user?.role} is not allowed to access this resources`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
