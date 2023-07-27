import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  gmail: string;
  @Column()
  password: string;
}
