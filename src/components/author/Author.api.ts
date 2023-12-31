import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { AuthorRepository } from "./Author.repository";
import UserMiddleware from "../user/User.middleware";

@Controller("api/author")
@ClassMiddleware([UserMiddleware.checkAuth])
export class AuthorAPI {
  @Get("find/:name")
  public async findAuthor(req: Request, res: Response, next: NextFunction) {
    res.send(await AuthorRepository.findOne({ where: { name: req.params.name }, }));
  }
  @Post("add")
  public async addAuthor(req: Request, res: Response, next: NextFunction) {
    const { Name } = req.body;
    const author = await AuthorRepository.addAuthor(Name);
    console.log("New Author added:", author);
    res.send({ message: "New Author added", author });
  }
}
