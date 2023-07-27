import dataSource from "../../services/db/dataSource";
import { AuthorRepository } from "../author/Author.repository";
import { Book } from "./Book.entity";

export const BookRepository = dataSource.getRepository(Book).extend({
  async createBook(name: string, authorName: string, price: number): Promise<Book> {
    const author = await AuthorRepository.createAuthor(authorName);
    const book = this.save({
      name: name,
      author: author,
      price: price,
    });
    author.books.push(book)
    return book;
  },
  async editBook(id, body): Promise<Book> {
    const book = await this.findBookById(id);
    this.update(id, {
      name: body.Name || book.name,
      price: body.Price || book.price,
    });
    return book;
  },
  findBooks():Promise<Book>[] {
    return this.find();
  },
  findBookByName(name): Promise<Book>[] {
    return this.find({
      where: {
        name: name,
      },
    });
  },
  findBookById(id): Promise<Book> {
    return this.findOne({ where: { id: id } });
  },
  findBookByAuthor(name):Promise<Book> {
    const author = AuthorRepository.findAuthorByName(name);
    return this.findOne({ where: { author: author } });
  },
  deleteBookById(id) {
    this.delete(id);
    return "Book " + id + " deleted";
  },
});
