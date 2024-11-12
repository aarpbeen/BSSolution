import NotificationModel from "../model/notification.model";
import {Request, Response , NextFunction} from "express";
import CatchAsyncErrors from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/ErrorHandler";
import CatchAsyncError from "../middleware/catchAsyncErrors";
import cron from 'node-cron'

// GET ALL NOTIFICATION -- ONLY ADMIN
export const getNotifications = CatchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const notifications = await NotificationModel.find().sort({createdAt:-1});

      res.status(201).json({
        success : true,
        notifications
      })
    }catch(error:any){
        return next (new ErrorHandler(error.message,400))
    }
})


// Update notification -- only admin
export const updateNotification = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const notificationId  = req.params.id;
  
        // Check if the notification ID is valid and exists
        const notification = await NotificationModel.findById(notificationId);
        if (!notification) {
          return next(new ErrorHandler('Notification not found', 404));
        }else {
            notification.status ? notification.status = "read" : notification.status
        }

        // Save the updated notification
        await notification.save();

        const notifications = await NotificationModel.find().sort({createdAt:-1})
  
        res.status(200).json({
          success: true,
          notifications,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );

  // delete notification --only admin

  cron.schedule("0 0 0 * * *", async ()=>{
    const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);
    await NotificationModel.deleteMany({status:"read", createdAt:{$lt : thirtyDaysAgo }})
    console.log("Deleted read notifications")
  })

