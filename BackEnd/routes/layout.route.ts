import express from 'express'
import { createLayout, updateLayout } from '../controller/layout.controller'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'

const layoutRouter = express.Router()

layoutRouter.post("/create-layout",isAuthenticated,createLayout)

layoutRouter.put("/update-layout",isAuthenticated,updateLayout)

export default layoutRouter