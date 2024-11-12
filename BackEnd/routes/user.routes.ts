import express from 'express';
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateAccessToken,
  socialAuth,
  updateUserInfo,
  updatePassword,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controller/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);

userRouter.post('/user-login', loginUser);
userRouter.post('/socialAuth', socialAuth);

userRouter.get('/user-logout', isAuthenticated, logoutUser);
userRouter.get('/refreshToken', updateAccessToken);

userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/update-user-info', isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password', isAuthenticated, updatePassword);

userRouter.get(
  '/get-all-users',
  isAuthenticated,
  authorizeRoles('admin'),
  getAllUsers
);

userRouter.put('/update-user-role', isAuthenticated,authorizeRoles("admin"), updateUserRole);

userRouter.delete('/delete-user/:id',isAuthenticated,authorizeRoles("admin"),deleteUser)

export default userRouter;
