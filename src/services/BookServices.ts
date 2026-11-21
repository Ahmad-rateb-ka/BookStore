import axios from "axios";
import type { Book } from "./interface";
import { API_books, API_URL } from "./global";

// ----------------------start Admin Page--------------------------------

// Add Book
export const AddService = {
  Add: async (book: Book): Promise<Book> => {
    const response = await axios.post(API_books, book);
    return response.data;
  },
};

//  Delete Book
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
// ----------------------End Admin Page--------------------------------

// -----------------start borrow button cards section Page-------------

//first thing we shoud edit info of book
export const BorrowBookService = async (updatedBook: Book) => {
  const response = await axios.put(`${API_books}/${updatedBook.id}`, updatedBook,);
  return { responseData: response.data, updatedBook };
};
export const EditISBNsUserToBorrowService = async ({
  bookInfo,
  userId,
}: {
  bookInfo: Book;
  userId: number;
}) => {
  // seconde we should get info user
  const response = await axios.get(`${API_URL}/${userId}`);
  const user = response.data;
  if (user) {
    const updatedUser = {
      ...user,
      ISBNs: Array.isArray(user.ISBNs)
        ? [...user.ISBNs, bookInfo.isbn]
        : [bookInfo.isbn],
    };
    // third thing we should edit info user or update it to be user has the isbn number for Book which is borrowed
    const editResponse = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return editResponse.data;
  } else {
    throw new Error("The user wasn't found");
  }
};
// -----------------End borrow button cards section Page-------------

// -----------------Start takeBack button in Borrowed Page-------------

//  here the same idea but the deference here we should make the state of book Available and remove the ISBN from ISBNs user
//  Because the user takeback the book so he don't have this book
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
    return editResponse.data;
  } else {
    throw new Error("The user wasn't found");
  }
};

// -----------------End takeBack button in Borrowed Page-------------

// -----------------Start cards Page---------------------------------
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
// --------------------End cards Page--------------------------------------

// -------------------start Borrowed Books page------------------------------

// function for showing is Borrowed Book by the user
export const fetchBook = async (UserID: String) => {
  // here get info-user by his id
  const response = await axios.get(`${API_URL}/${UserID}`);
  // her we get his ISBNs from his info
  const ArrayISBNs = response.data.ISBNs || [];
  // if the user don't have ISBNs  we will return empty array
  if (ArrayISBNs.length === 0) return [];
  // else if he has we will get his ArrayISBNs
  const bookPromises = ArrayISBNs.map(async (ISBN: string) => {
    //  then we will start start Loading the books by their ISBNs
    const response = await axios.get<Book[]>(API_books, {
      params: { isbn: ISBN },
    });
    // to return the book if isn't empty or null
    return response.data && response.data.length > 0 ? response.data[0] : null;
  });
  // to collect every Books Borrowed from user
  const allBooks = await Promise.all(bookPromises);
  // return borroed Books
  return allBooks;
};

// -------------------End Borrowed Books page------------------------------

// -------------------Start SearchResultes page------------------------------

// function Loading the books if the ISBN or Name is true
export const FetchSearchResultes = async (SearchState: string | number) => {
  // check data if the user give us ISBN or Name of Book
  // if the value of (const isISBN)= NaN(not a number) that mean's the user give us Name of Book
  // else the value was number so that mean's that valus is ISBN
  const isISBN = !isNaN(Number(SearchState));
  // who has the filled value we will in params
  const searchParams = isISBN
    ? { isbn: Number(SearchState) }
    : { title: SearchState };
  const response = await axios.get(API_books, { params: searchParams });
  return response.data;
};

// -------------------End SearchResultes page------------------------------
