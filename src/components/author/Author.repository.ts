import dataSource from "../../services/db/dataSource";
import { Author } from "./Author.entity";

export const AuthorRepository = dataSource.getRepository(Author).extend({
  addAuthor(name: string): Promise<Author> {
    try {
      return this.save({ name: name });
    } catch (error) {
      console.log(error);
    }
  },
});
