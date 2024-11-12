import User from '../model/user.model';
import { Response } from 'express';
import { redis } from '../utils/redis';
// get user by id

export const getUserById = async (userId: string, res: Response) => {
  const user = await User.findById(userId)
  if (user) {
   
    res.status(201).json({
      success: true,
      user,
    });
  }
};
