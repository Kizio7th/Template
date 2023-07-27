import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/Book.entity";

@Entity({name: 'author'})
export class Author{
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    name: string
    @OneToMany(() => Book, (book) => book.author)
    books: Book[]

}
