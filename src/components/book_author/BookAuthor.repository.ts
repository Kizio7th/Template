import dataSource from "../../services/db/dataSource";
import { BookAuthor } from "./BookAuthor.entity";
export const BookAuthorRepository = dataSource.getRepository(BookAuthor).extend({
});
