import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookAuthor } from "../book_author/BookAuthor.entity";

@Entity({ name: "author" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.author, { cascade: true })
  bookAuthors: BookAuthor[]
}
