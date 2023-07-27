import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthorBook } from "../author_book/AuthorBook.entity";

@Entity({ name: "author" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => AuthorBook, authorBook => authorBook.book)
  authorBooks: AuthorBook[];
}
