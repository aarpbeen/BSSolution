import { IUser } from "../model/user.model"; // Import your user type

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the user property, can be optional
    }
  }
}