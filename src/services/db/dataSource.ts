/* eslint-disable max-len */
import { DataSource } from 'typeorm';
import { User } from '../../components/user/User.entity';
import { Book } from '../../components/book/Book.entity';
import { Author } from '../../components/author/Author.entity';
import { AuthorBook } from '../../components/author_book/AuthorBook.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  maxQueryExecutionTime: 20000,
  charset: 'utf8mb4',
  entities: [
    User,
    Author,
    Book,
    AuthorBook
  ],
  cache: {
    // type: 'ioredis',
    // duration: 60000,
    // options: {
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   password: process.env.REDIS_PASSWORD,
    // }
  }
})

export default dataSource
