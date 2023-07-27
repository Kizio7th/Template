import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "../author/Author.entity";

@Entity({ name: "book" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
