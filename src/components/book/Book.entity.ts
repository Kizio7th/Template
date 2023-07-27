import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthorBook } from "../author_book/AuthorBook.entity";

@Entity({ name: "book" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @OneToMany(() => AuthorBook, authorBook => authorBook.book)
  authorBooks: AuthorBook[];
}
