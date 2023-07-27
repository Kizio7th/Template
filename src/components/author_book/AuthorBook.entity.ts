import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/Book.entity";
import { Author } from "../author/Author.entity";

@Entity({ name: "author_book" })
export class AuthorBook {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Book, book => book.authorBooks)
  @JoinColumn()
  book: Book;
  @ManyToOne(() => Author, author => author.authorBooks)
  @JoinColumn()
  author: Author;
}
