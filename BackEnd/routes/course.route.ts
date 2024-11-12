import express from 'express';
import { addAnswer, addQuestion, addReview, addReviewReply, createCourse, deleteCourse, getAllCourses, getCourse, getCourseByUser, getSingleCourse, updateCourse } from '../controller/course.controller';
import { isAuthenticated, authorizeRoles } from '../middleware/auth';

const courseRouter = express.Router()

courseRouter.post("/create-course",
    isAuthenticated,
    authorizeRoles("admin"),
    createCourse
)

courseRouter.put("/update-course/:id",
    isAuthenticated,
     authorizeRoles("admin"),
      updateCourse)


courseRouter.get('/single-course/:id',getSingleCourse)

courseRouter.get('/all-course',isAuthenticated,authorizeRoles("admin"),getAllCourses)

courseRouter.get('/get-course-content/:id',isAuthenticated, getCourseByUser)

courseRouter.post('/add-question',isAuthenticated,addQuestion)

courseRouter.put('/add-answer', isAuthenticated,addAnswer)

courseRouter.put('/add-review/:id', isAuthenticated, addReview)

courseRouter.put('/add-review-reply',isAuthenticated,addReviewReply)

courseRouter.get('/get-all-courses',isAuthenticated,authorizeRoles("admin"),getCourse)

courseRouter.delete('/delete-course',isAuthenticated,authorizeRoles("admin"),deleteCourse)

export default courseRouter