import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookAuthor } from "../book_author/BookAuthor.entity";
import { User } from "../user/User.entity";

@Entity({ name: "book" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @ManyToOne( () => User, (user) => user.books, { eager: true })
  user: User
  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book, { cascade: true })
  bookAuthors: BookAuthor[]
}
