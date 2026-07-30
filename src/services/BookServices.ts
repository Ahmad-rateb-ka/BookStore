import axios from "axios";
import type { Book } from "./interface";
import { API_books, API_URL } from "./global";

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
// ---------------------------------------------------------------------
export const BorrowBookService = async (updatedBook: Book) => {
  const response = await axios.put(
    `${API_books}/${updatedBook.id}`,
    updatedBook,
  );
  return { responseData: response.data, updatedBook };
};

export const EditISBNsUserToBorrowService = async ({
  bookInfo,
  userId,
}: {
  bookInfo: Book;
  userId: number;
}) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  const user = response.data;

  if (user) {
    const updatedUser = {
      ...user,
      ISBNs: Array.isArray(user.ISBNs)
        ? [...user.ISBNs, bookInfo.isbn]
        : [bookInfo.isbn],
    };
    const editResponse = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return editResponse.data;
  } else {
    throw new Error("The user wasn't found");
  }
};
//----------------------------------------------------------------------------------------------------------------------

export const TakeBacktheBookService = async (updatedBook: Book) => {
  const response = await axios.put(
    `${API_books}/${updatedBook.id}`,
    updatedBook,
  );
  return { responseData: response.data, updatedBook };
};

export const EditISBNsUserToTakeBackService = async ({
  bookInfo,
  userId,
}: {
  bookInfo: Book;
  userId: number;
}) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  const user = response.data;
  if (user) {
    const updatedUser = {
      ...user,
      ISBNs: Array.isArray(user.ISBNs)
        ? user.ISBNs.filter((id: any) => id !== bookInfo.isbn)
        : [],
    };
    const editResponse = await axios.put(`${API_URL}/${userId}`, updatedUser);
    console.log(editResponse);
    return editResponse.data;
  } else {
    throw new Error("The user wasn't found");
  }
};

// -----------------------------------------------------------------------------

export const FetchBooks = async () => {
  const response = await axios.get(API_books);
  return response.data;
};

export const fetchBookById = async (idTheBook: string) => {
  const response = await axios.get(`${API_books}/${idTheBook}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// ------------------------------------------------------------------------

export const fetchBook = async (UserID: String) => {
  const response = await axios.get(`${API_URL}/${UserID}`);
  const ArrayISBNs = response.data.ISBNs || [];
  if (ArrayISBNs.length === 0) return [];
  const bookPromises = ArrayISBNs.map(async (ISBN: string) => {
    const response = await axios.get<Book[]>(API_books, {
      params: { isbn: ISBN },
    });
    return response.data && response.data.length > 0 ? response.data[0] : null;
  });
  const allBooks = await Promise.all(bookPromises);
  return allBooks;
};
//  -----------------------------------------------------------------------

export const fetchUsersLogin = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// -------------------------------------------------------------------------

export const FetchSearchResultes = async (SearchState: string | number) => {
  const isISBN = !isNaN(Number(SearchState));
  const searchParams = isISBN
    ? { isbn: Number(SearchState) }
    : { title: SearchState };
  const response = await axios.get(API_books, { params: searchParams });
  return response.data;
};
