import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class BookMiddleware {
  static async test(req: Request, res: Response, next: NextFunction) {
    return next();
  }
  static async checkOut(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const checkToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(checkToken);
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
