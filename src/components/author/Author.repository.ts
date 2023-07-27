import dataSource from "../../services/db/dataSource";
import { Author } from "./Author.entity";

export const AuthorRepository = dataSource.getRepository(Author).extend({
  async findAuthorByName(name: string): Promise<Author> {
    return await this.findOne({ where: { name: name } });
  },
  createAuthor(name: string): Promise<Author> {
    return this.save({ name: name });
  },
});
