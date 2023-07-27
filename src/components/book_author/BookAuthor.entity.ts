import { Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/Book.entity";
import { Author } from "../author/Author.entity";

@Entity({ name: "book_authors" })
export class BookAuthor {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Book, (book) => book.bookAuthors, { eager: true , onDelete: 'CASCADE' })
    book: Book;
    @ManyToOne(() => Author, (author) => author.bookAuthors, { eager: true , onDelete: 'CASCADE' })
    author: Author;
    
}
