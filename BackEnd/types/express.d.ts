// types/express.d.ts

import { UserDocument } from "../models/user.model"; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // Correct type from your user model
    }
  }
}
