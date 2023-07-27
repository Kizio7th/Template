import dataSource from "../../services/db/dataSource";
import { AuthorBook } from "./AuthorBook.entity";
import { Book } from "../book/Book.entity";
import { Author } from "../author/Author.entity";
export const AuthorBookRepository = dataSource.getRepository(AuthorBook).extend({
  createAuthorBook(book: Book ,author: Author): Promise<AuthorBook> {
    return this.save({
      book: book,
      author: author
    });
  },
});
