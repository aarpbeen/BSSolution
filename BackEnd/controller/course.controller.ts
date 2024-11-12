import { Request, Response, NextFunction } from 'express';
import CatchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { v2 as cloudinary } from 'cloudinary';
import { redis } from '../utils/redis';
import CourseModel from '../model/course.model';
import mongoose, { Error } from 'mongoose';
import { sendEmail } from '../utils/sendMail';
import NotificationModel from '../model/notification.model';

// upload course

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const thumbnail = data.thumbnail;

    // if (thumbnail) {
    //   const myCloud = await cloudinary.uploader.upload(thumbnail, {
    //     folder: 'courses',
    //   });

    //   data.thumbnail = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  } catch (error: any) {
    console.log('this is an error', error);
    return next(new ErrorHandler(error.message, 400));
  }
};

//----------------- edit course ----------------------

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { thumbnail, ...courseData } = req.body;

    // Find the course to be updated
    const course = await CourseModel.findById(id);
    if (!course) {
      return next(new ErrorHandler('Course not found', 404));
    }

    // If a new thumbnail is provided, update it in Cloudinary
    // if (thumbnail) {
    //   // Delete the old thumbnail from Cloudinary

    //   if (course.thumbnail && course.thumbnail.public_id) {
    //     await cloudinary.uploader.destroy(course.thumbnail.public_id);
    //   }

    //   // Upload the new thumbnail
    //   const uploadedImage = await cloudinary.uploader.upload(thumbnail, {
    //     folder: 'courses',
    //   });

    //   courseData.thumbnail = {
    //     public_id: uploadedImage.public_id,
    //     url: uploadedImage.secure_url,
    //   };
    // }

    // Update the course with the new data
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure data is validated based on the schema
    });

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error: any) {
    console.error('Error updating course:', error); // Log the error for debugging
    return next(
      new ErrorHandler(error.message || 'Failed to update course', 400)
    );
  }
};

// GET SINGLE COURSE -- WITHOUR PURCHASING

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
      
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
       
        const course = await CourseModel.findById(req.params.id).select(
          '-courseData.videoUrl -courseData.suggestion -courseData.links -courseData.comments'
        );

        // Store the course data in Redis (with an optional expiration time)
        await redis.set(courseId, JSON.stringify(course), 'EX', 3600); // 'EX' sets a 1-hour expiration
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//------------- DISPLAY COURSE DATA WITHOUT PURCHASING ---------------------

// GET ALL COURSE - WITHOUT PURCHASING
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = 'allCourses';

      // Check if all courses are cached in Redis
      const isCacheExist = await redis.get(cacheKey);

      if (isCacheExist) {
       
        const courses = JSON.parse(isCacheExist);

        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        console.log('Fetching courses from MongoDB');

        // Fetch all courses from MongoDB
        const courses = await CourseModel.find().select(
          '-courseData.videoUrl -courseData.suggestion -courseData.links -courseData.comments'
        );

        // Cache the result in Redis (with an optional expiration time)
        await redis.set(cacheKey, JSON.stringify(courses), 'EX', 3600); // 1 hour expiration

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      console.log('Error fetching courses:', error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// --------------- GET COURSE BY USER -------------------------------------
// get course by user

export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const courseId = req.params.id;
      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler('You are not eligible to access this course', 404)
        );
      }
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// -------------------------ADD QUESTION --------------------------

// add question in Course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler('Invalid Content id', 400));
      }
      const courseContent = course?.courseData?.find((cdata: any) =>
        cdata._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler('Invalid content id', 400));
      }

      // Create a new Question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      courseContent.questions.push(newQuestion);

      await course?.save();

      await NotificationModel.create({
        user : req.user?._id,
        title : "New Question Received",
        message : `You have a new Question in ${courseContent?.title}`,
      })

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ------------------- QUESTION REPLIES --------------------------

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler('Invalid Course ID', 400));
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler('Invalid Content ID', 400));
      }

      if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return next(new ErrorHandler('Invalid Question ID', 400));
      }

      // Find Course by ID
      const course = await CourseModel.findById(courseId)
      .populate({
        path : 'courseData.questions.user',
        select : 'email name'
      })
     

      if (!course) {
        return next(new ErrorHandler('Course not found', 404));
      }

      // Find the content within the course data
      const courseContent = course.courseData?.find((cdata: any) =>
        cdata._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler('Invalid content ID', 400));
      }

      // Find the question within the content
      const question = courseContent.questions?.find((que: any) =>
        que._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler('Invalid question', 400));
      }

      // Create a new answer
      const newAnswer: any = {
        user: req.user?._id, // Assuming `req.user` exists after authentication middleware
        answer: answer,
      };

      // Push the new answer to the question's replies
      question.questionReplies.push(newAnswer);

      // Mark the course as modified to ensure it gets saved
      course.markModified('courseData');

      // Save the updated course
      await course.save();

    

      // Sending notification and email

      if( req.user?._id  ===  question.user._id) {
        await NotificationModel.create({
          user : req.user?._id,
          title : "New Question Reply Received",
          message : `You have a new question reply in ${courseContent?.title}`,
        })
      }else {

        if (!question.user || !question.user.email) {
          return next(new ErrorHandler('Recipient email not found', 400));
        }
        
        const data = {
          name : question.user.name,
          title : courseContent.title,
          courseUrl: `https://yourcourseplatform.com/courses/${course._id}`,
        }
       // call the send mail function
       try {
        await sendEmail({
        to: question.user.email,
        subject: 'Question Reply',
        templateName: 'question-reply-mail',
        templateData:data,
       })
      } catch (error:any){
        return next ( new ErrorHandler(error.message,500 ))
      }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      console.log('this is error in add answer', error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// ------------ Add a review to course ---------------

interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      
        // Ensure req.user and req.user.courses are defined
        if (!req.user || !req.user.courses) {
          return next(new ErrorHandler("User or courses information is missing", 400));
        }
  

      const userCourseList = req.user?.courses;

      const courseId = req.params.id;

      // Check if the course ID exists in the user's course list
      const isCourseExist = userCourseList?.some(
        (course: any) => course?._id.toString() === courseId.toString()
      );

      if (!isCourseExist) {
        return next(new ErrorHandler("You are not eligible to access this course", 404));
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const { review, rating } = req.body as IAddReviewData;

      // Create review data
      const reviewData: any = {
        user: req.user?._id, // Store only user ID
        rating,
        review: review,
      };

      // Add the new review to the course
      course.reviews.push(reviewData);

      // Calculate the average rating
      const totalRatings = course.reviews.reduce((sum, rev: any) => sum + rev.rating, 0);
      course.ratings = course.reviews.length > 0 ? totalRatings / course.reviews.length : 0;

      // Save the updated course
      await course.save();

      // Create a notification
      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} has given a review for ${course.name}`,
      };
      // Implement notification logic here (e.g., save to database, send to a messaging service, etc.)

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      console.log("this iserror", error)
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//----------------- review reply ---------------
interface IAddReviewReplyData {
  reviewReply: string;
  courseId: string;
  reviewId: string;
}

export const addReviewReply = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewReply, courseId, reviewId }: IAddReviewReplyData = req.body;

      // Ensure that reviewId, courseId, and reply are provided
      if (!reviewReply || !courseId || !reviewId) {
        return next(new ErrorHandler("Review ID, Course ID, and reply are required", 400));
      }

      // Find the course containing the review
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Find the review to which the reply will be added
      const review = course.reviews.find((rev: any) => rev._id.toString() === reviewId);

      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      // Create the reply object
      const replyData: any = {
        user: req.user?._id, // Assuming `req.user` exists after authentication middleware
        answer: reviewReply,
      };

      // delete previous reply if exists
      if(review.reviewReply){
        review.reviewReply = []
      }

      // review.commentReplies.push(replyData);
      review.reviewReply?.push(replyData)

      // Mark the reviews field as modified to ensure changes are saved
      course.markModified('reviews');

      // Save the updated course
      await course.save();

      // Send a success response
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      console.error('Error in addReviewReply:', error); // Additional logging for debugging
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

/// GET all course -- admin only

export const getCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const courses = await CourseModel.find();

    res.status(200).json({
      success : true,
      courses
    })
  }catch(error:any){
    return next (new ErrorHandler(error.message,400))
  }
})

// Delete course -- only admin -------------------------------------

export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id; // Get userId from request body

      // Find the user by ID
      const course = await CourseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler('Course not found', 404));
      }

      // Delete the user
      await course.deleteOne();
      await redis.del(id)

      res.status(200).json({
        success: true,
        message: 'Course deleted successfully!',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

