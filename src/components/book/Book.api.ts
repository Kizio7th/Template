import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import UserMiddleware, { CustomRequest } from "../user/User.middleware";
import { BookRepository } from "./Book.repository";
import { HttpStatusCode } from "axios";

@Controller("api/book")
@ClassMiddleware([UserMiddleware.checkAuth])
export class BookAPI {
    @Get("all")
    public async getAllBooks(req: Request, res: Response, next: NextFunction) {
        res.send(await BookRepository.find());
    }
    @Get("id/:id")
    public async getBookById(req: Request, res: Response, next: NextFunction) {
        res.send(await BookRepository.findOne({ where: { id: Number(req.params.id) } }));
    }
    @Get("author/:name")
    public async getBooksByAuthor(req: Request, res: Response, next: NextFunction) {
        res.send(await BookRepository.findBooksByAuthor(req.params.name));
    }

    @Post("addBook")
    public async addBook(req: CustomRequest, res: Response, next: NextFunction) {
        const { Name, Author, Price } = req.body;
        const User = req.user;
        try {
            const book = await BookRepository.addBook(Name, Author, Price, User);
            console.log("New Book created:", book);
            res.send({ message: "New Book created", book });
        } catch (error) {
            console.log(error);
        }
    }
    @Put("editBook/:id")
    public async editBook(req: CustomRequest, res: Response, next: NextFunction) {
        const user = (await BookRepository.findOne({ where: { id: Number(req.params.id) } })).user;
        if (req.user.id != user.id) {
            res.sendStatus(HttpStatusCode.Forbidden);
        }
        else {
            const book = await BookRepository.editBook(req.params.id, req.body);
            console.log("Book edited:", book);
            res.send({ message: "Book edited", book });
        }
    }
    @Delete("removeBook/:id")
    public async deleteBook(req: CustomRequest, res: Response, next: NextFunction) {
        const user = (await BookRepository.findOne({ where: { id: parseInt(req.params.id) } })).user;
        if (req.user.id != user.id) {
            res.sendStatus(HttpStatusCode.Forbidden);
        }
        else {
            BookRepository.delete(req.params.id)
            res.send("Delete success");
        }
    }
}
