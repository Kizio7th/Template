import { ClassMiddleware, Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { BookService } from "./Book.repository";
import BookMiddleware from "./Book.middleware";


const bookService = new BookService();

@Controller("api/book")
@ClassMiddleware([BookMiddleware.checkOut])
export class BookAPI {
  @Get("all")
  public async getAllBooks(req: Request, res: Response, next: NextFunction) {
    res.send(await bookService.findBooks());
  }
  @Get("id/:id")
  public async getBookById(req: Request, res: Response, next: NextFunction) {
    res.send(await bookService.findBookById(req.params.id));
  }
  @Get("name/:name")
  public async getBookByName(req: Request, res: Response, next: NextFunction) {
    res.send(await bookService.findBookByName(req.params.name));
  }
  @Post("addBook")
  public async addBook(req: Request, res: Response, next: NextFunction) {
    const { Name, Author, Price } = req.body;
    try {
      const book = await bookService.createBook(Name, Author, Price);
      console.log("New Book created:", book);
      res.send({ message: "New Book created", book });
    } catch (error) {
      console.log(error);
    }
  }
  @Put("editBook/:id")
  public async editBook(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.body)
        const book = await bookService.editBook(req.params.id,req.body);
        console.log("Book edited:", book);
        res.send({ message: "Book edited", book });
      } catch (error) {
        console.log(error);
      }
  }
  @Delete("removeBook/:id")
  public async deleteBook(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    try {
      res.send(bookService.deleteBookById(req.params.id));
    } catch (error) {
      console.log(error);
    }
  }
}
