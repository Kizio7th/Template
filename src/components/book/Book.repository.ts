import dataSource from "../../services/db/dataSource";
import { Author } from "../author/Author.entity";
import { AuthorRepository } from "../author/Author.repository";
import { AuthorBook } from "../author_book/AuthorBook.entity";
import { AuthorBookRepository } from "../author_book/AuthorBook.repository";
import { Book } from "./Book.entity";

export const BookRepository = dataSource.getRepository(Book).extend({
  async createBook(
    name: string,
    authorNames: string[],
    price: number
  ): Promise<Book> {
    const book = await this.save({
      name: name,
      price: price,
    });
    for (let i = 0; i < authorNames.length; i++) {
      const authorName = authorNames[i];
      let author = await AuthorRepository.findOne({
        where: { name: authorName },
      });
      if (!author) {
        if (!author)
          author = await AuthorRepository.createAuthor(authorNames[i]);
      }
      await AuthorBookRepository.createAuthorBook(book, author);
    }
    return book;
  },
  async editBook(id, body): Promise<Book> {
    const book = await this.findBookById(id);
    this.update(id, {
      name: body.Name || book.name,
      authorBooks: body.Authors || book.authorBooks,
      price: body.Price || book.price,
    });
    return book;
  },
  findBooks(): Promise<Book[]> {
    return this.find();
  },
  findBookByName(name): Promise<Book[]> {
    return this.find({
      where: {
        name: name,
      },
    });
  },
  async findBookById(id): Promise<Book> {
    return await this.findOne({ where: { id: id } });
  },
  async findBooksByAuthor(name): Promise<Book[]> {
    const author = await AuthorRepository.findAuthorByName(name);
    return await BookRepository.createQueryBuilder("book")
      .innerJoin("book.authorBooks", "authorBook")
      .innerJoin("authorBook.author", "author")
      .where("author.id = :authorId", { authorId: author.id })
      .getMany();
    // const authorBooks = await AuthorBookRepository.find({
    //   where: { author: author },
    // });
    // const books = [];
    // for (let authorBook of authorBooks) {
    //   books.push(await this.findBookById(authorBook.book.id));
    // }
    // return books;
  },
  deleteBookById(id) {
    this.delete(id);
    return "Book " + id + " deleted";
  },
});
