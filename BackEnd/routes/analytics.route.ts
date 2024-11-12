// routes/analyticsRoutes.ts
import express from 'express';
import { getCourseAnalytics, getOrderAnalytics, getUserRegistrationAnalytics } from '../controller/analytics.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const analyticRouter = express.Router();

// Route to get last 12 months' user registration data
analyticRouter.get('/user-analytics',isAuthenticated,authorizeRoles("admin"), getUserRegistrationAnalytics);

analyticRouter.get('/course-analytics',isAuthenticated,authorizeRoles("admin"), getCourseAnalytics);

analyticRouter.get('/order-analytics',isAuthenticated,authorizeRoles("admin"), getOrderAnalytics);

export default analyticRouter;