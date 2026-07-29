import axios from "axios";
import type { Book } from "./interface";
import { API_books } from "./global";

export const AddService = {
  Add: async (book: Book): Promise<Book> => {
    const response = await axios.post(API_books, book);
    return response.data;
  },
};

export const DeleteService = {
  Delete: async (ISBN: number) => {
    const response = await axios.get(API_books);
    const books = response.data;
    const FoundBook = books.find((book: Book) => book.isbn === Number(ISBN));
    if (FoundBook) {
      const book = await axios.delete(`${API_books}/${FoundBook.id}`);
      alert("The Book is Deleted Successfully");
      return book;
    } else {
      alert("The Book isn't Found");
    }
  },
};
