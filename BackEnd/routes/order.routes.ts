import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, getAllOrder } from '../controller/order.controller';

const orderRouter = express.Router();


orderRouter.post('/create-order',isAuthenticated,createOrder)

orderRouter.get('/all-order',isAuthenticated,authorizeRoles("admin"),getAllOrder)

export default orderRouter