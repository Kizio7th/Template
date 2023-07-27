import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "./User.entity";

export interface CustomRequest extends Request {
  user?: User
}

export default class UserMiddleware {
  static async checkAuth(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      req.user = verify.user;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}


