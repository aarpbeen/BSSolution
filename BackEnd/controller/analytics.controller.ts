import { generateLast12MonthData } from '../utils/analytics.generator';
import User from '../model/user.model'; // Import your UserModel
import { Request, Response, NextFunction } from 'express';
import CatchAsyncError from '../middleware/catchAsyncErrors'; // For handling async errors
import CourseModel from '../model/course.model';
import OrderModel from '../model/order.model';

// Function to get user registration data for the last 12 months
export const getUserRegistrationAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the analytics generator for UserModel
      const userAnalytics = await generateLast12MonthData(User);

      res.status(200).json({
        success: true,
        data: userAnalytics.last12Months, // Return the last 12 months' data
      });
    } catch (error: any) {
      return next(new Error(error.message));
    }
  }
);


// Function to get course data for the last 12 months
export const getCourseAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the analytics generator for UserModel
      const courseAnalytics = await generateLast12MonthData(CourseModel);

      res.status(200).json({
        success: true,
        data: courseAnalytics.last12Months, // Return the last 12 months' data
      });
    } catch (error: any) {
      return next(new Error(error.message));
    }
  }
);



// Function to get order data for the last 12 months
export const getOrderAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the analytics generator for UserModel
      const orderAnalytics = await generateLast12MonthData(OrderModel);

      res.status(200).json({
        success: true,
        data: orderAnalytics.last12Months, // Return the last 12 months' data
      });
    } catch (error: any) {
      return next(new Error(error.message));
    }
  }
);

