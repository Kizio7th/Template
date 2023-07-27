import dataSource from "../../services/db/dataSource";
import { Book } from "./Book.entity";

const bookRepository = dataSource.getRepository(Book);

export class BookService {
  createBook(name, author, price) {
    return bookRepository.save({
      name: name,
      author: author,
      price: price,
    });
  }
  async editBook(id, body) {
    const book = await this.findBookById(id);
    bookRepository.update(id, {
      name: body.Name || book.name,
      author: body.Author || book.author,
      price: body.Price || book.price,
    });
    return book;
  }
  findBooks() {
    return bookRepository.find();
  }
  findBookByName(name) {
    return bookRepository.find({
      where: {
        name: name,
      },
    });
  }
  findBookById(id) {
    return bookRepository.findOne({ where: { id: id } });
  }
  deleteBookById(id) {
    bookRepository.delete(id);
    return "Book " + id + " deleted"
  }
}
