import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "book"})
export class Book{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    author: string;
    @Column()
    price: number;
    

}