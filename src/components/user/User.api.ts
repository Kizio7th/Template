import { Controller, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "axios";
import { UserRepository } from "./User.repository";

@Controller("api/user")
export class UserAPI {
  @Post("register")
  public async register(req: Request, res: Response, next: NextFunction) {
    const { Name, Gmail, Password } = req.body;
    try {
      const user = await UserRepository.createUser(Name, Gmail, Password);
      console.log("New User created:", user);
      res.send({ message: "New User created", user });
    } catch (error) {
      console.log(error);
    }
  }
  @Get("login")
  public async login(req: Request, res: Response, next: NextFunction) {
    const { Email, Password } = req.body;
    const user = await UserRepository.login(Email, Password);
    if (!user) return res.sendStatus(HttpStatusCode.Forbidden);
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
    return res.send(token);
  }
}
