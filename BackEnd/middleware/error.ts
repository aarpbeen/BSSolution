import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Wrong MongoDB ObjectId Error (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
   
  }

  // Duplicate Key Error (MongoDB Error)
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
 
  }

  // JWT Invalid Error
  if (err.name === 'JsonWebTokenError') {
    message = `Json Web Token is invalid. Try again.`;
    err = new ErrorHandler(message, 400);
 
  }

  // JWT Expired Error
  if (err.name === 'TokenExpiredError') {
    message = `Json Web Token has expired. Try again.`;
    err = new ErrorHandler(message, 400);
  
  }

  // Send response to the client with the error details
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
