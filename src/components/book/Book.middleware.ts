import { NextFunction, Request, Response } from "express";


export default class BookMiddleware {
  static async test(req: Request, res: Response, next: NextFunction) {
    return next();
  }
  
}
