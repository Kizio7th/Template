import dataSource from "../../services/db/dataSource";
import { AuthorRepository } from "../author/Author.repository";
import { BookAuthorRepository } from "../book_author/BookAuthor.repository";
import { Book } from "./Book.entity";
import { UserRepository } from "../user/User.repository";
export const BookRepository = dataSource.getRepository(Book).extend({
  async addBook(name: string, authorNames: string[], price: number, user): Promise<Book> {
    const currentUser = await UserRepository.findOne({ where: { id: user.id } })
    const book = await this.save({
      name: name,
      price: price,
      user: currentUser
    });
    for (const authorName of authorNames) {
      let author = await AuthorRepository.findOne({ where: { name: authorName }, });

      if (!author) {
        author = await AuthorRepository.addAuthor(authorName);
      }
      await BookAuthorRepository.save({
        book: book,
        author: author
      });
    }
    return book;
  },
  async editBook(id, body): Promise<Book> {
    try {
      const book = await this.findOne({ where: { id: id } });
      this.update(id, {
        name: body.Name || book.name,
        authorBooks: body.Authors || book.authorBooks,
        price: body.Price || book.price,
      });
      return book;
    } catch (error) {
      console.log(error);
    }

  },
  async findBooksByAuthor(name): Promise<Book[]> {
    const author = await AuthorRepository.findOne({ where: { name: name } });
    // return await BookRepository.createQueryBuilder("book")
    //   .innerJoin("book.authorBooks", "authorBook")
    //   .innerJoin("authorBook.author", "author")
    //   .where("author.id = :authorId", { authorId: author.id })
    // .getMany();
    const bookAuthors = await BookAuthorRepository.find({ where: { author: author }, });
    const books = [];
    console.log(bookAuthors)
    for (let bookAuthor of bookAuthors) {
      books.push(await this.findOne({ where: { id: bookAuthor.book.id } }));
    }
    return books;
  }
});
