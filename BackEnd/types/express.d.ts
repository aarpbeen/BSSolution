// src/types/express.d.ts
import { UserDocument } from "../model/user.model"; // Correct path to your model

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // Now TypeScript knows that req.user is of type UserDocument
    }
  }
}
