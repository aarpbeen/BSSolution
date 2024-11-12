import { Request, Response, NextFunction } from 'express';
import OrderModel, { IOrder } from '../model/order.model'; // Adjust the path as needed
import CatchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import User from '../model/user.model';
import { sendEmail } from '../utils/sendMail';
import mongoose from 'mongoose';
import CourseModel from '../model/course.model';
import NotificationModel from '../model/notification.model';



// Create an order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    if (!courseId || !payment_info) {
      return next(new ErrorHandler('Course ID and payment information are required', 400));
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return next(new ErrorHandler('Course not found', 404));
    }

    const user = req.user;
    if (!user) {
      return next(new ErrorHandler('User not authenticated', 401));
    }

    const userExists = await User.findById(user._id);
    if (!userExists) {
      return next(new ErrorHandler('User does not exist!', 401));
    }
   

    const courseIdStr = (course._id as mongoose.Types.ObjectId).toString();
    const isCourseExist = userExists.courses.some(cour => cour.courseId.toString() === courseIdStr);

    if (isCourseExist) {
      return next(new ErrorHandler('You have already purchased this course', 400));
    }

    const newOrder = await OrderModel.create({
      courseId: course._id,
      userId: userExists._id,
      payment_info,
    });

    if (!newOrder) {
      return next(new ErrorHandler('Order creation failed', 500));
    }

    await User.findByIdAndUpdate(user._id, {
      $push: { courses: { courseId } },
    });

    const templateData = {
      order: {
        ID: courseIdStr.toString().slice(0,8),
        course_name: course.name,
        customer_name: user.name,
        customer_email: user.email,
        duration: course.courseData?.length
          ? course.courseData.reduce((totalDuration, data) => totalDuration + data.videoLength, 0)
          : 0,
        price: course.estimationPrice,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      },
    };

    await sendEmail({
      to: user.email as string,
      subject: 'Order Receipt',
      templateName: 'order-complete',
      templateData,
    });

    await NotificationModel.create({
      user : user._id,
      title : "New Order",
      message : `You have a new order from ${course?.name}`,
    })

    res.status(201).json({
      success: true,
      order: newOrder,
    });
  }
);

/// GET all order -- admin only

export const getAllOrder = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const orders = await OrderModel.find();

    res.status(200).json({
      success : true,
      orders
    })
  }catch(error:any){
    return next (new ErrorHandler(error.message,400))
  }
})

