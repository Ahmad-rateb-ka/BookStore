import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Book, User } from "../services/interface";

import {
  EditISBNsUserToTakeBackService,
  AddService,
  DeleteService,
  EditISBNsUserToBorrowService,
  BorrowBookService,
  TakeBacktheBookService,
  FetchBooks,
  fetchBookById,
  fetchUsers,
  fetchBook,
  FetchSearchResultes,
} from "../services/BookServices";

// -------------------------------------- Start Borrow  Button Cards Section------------------------------------
// function edit status book and ISBNs user
export const useBorrowtheBook = (
  { setIsModelOpen }: { setIsModelOpen: (isOpen: boolean) => void },
  UserId: number,
) => {
  const queryClient = useQueryClient();
  const EditISBNsToBorrowMutution = useMutation({
    mutationFn: ({ bookInfo, userId }: { bookInfo: Book; userId: number }) =>
      // here we need to recive two paramters because 
    // the first one to make the status of book UnAvailable
    // and  the seconde one to add new book for user by his id  
    EditISBNsUserToBorrowService({ bookInfo, userId }),
  });
  
  const BorrowBook = useMutation({
    mutationFn: BorrowBookService,
    onSuccess: (data) => {
      // if producre success we will update the books 
      queryClient.invalidateQueries({ queryKey: ["books"] });
      // and we will close the dialog
      setIsModelOpen(false);
      //  to add isbn number to ISBNs user
      EditISBNsToBorrowMutution.mutate({
        bookInfo: data.updatedBook,
        userId: UserId,
      });
      // update users info
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });
  
  return {
    editpro: BorrowBook.mutate,
    editSuccess: BorrowBook.isSuccess,
    editPending: BorrowBook.isPending || EditISBNsToBorrowMutution.isPending,
  };
};

// --------------------------------------  End Borrow Button Cards Section------------------------------------

// -------------------------------------- Start Takeback Buuton Borrowed Page---------------------------------

export const useTakeBackBook = (UserId: number) => {
  const queryClient = useQueryClient();
  const EditISBNsToTakeBackMutation = useMutation({
    mutationFn: ({ bookInfo, userId }: { bookInfo: Book; userId: number }) =>
      EditISBNsUserToTakeBackService({ bookInfo, userId }),
  });

  const EditBookTakeBackMution = useMutation({
    mutationFn: TakeBacktheBookService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      EditISBNsToTakeBackMutation.mutate({
        bookInfo: data.updatedBook,
        userId: UserId,
      });
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  return {
    editpro: EditBookTakeBackMution.mutate,
    editSuccess: EditBookTakeBackMution.isSuccess,
    editPending:
      EditBookTakeBackMution.isPending || EditISBNsToTakeBackMutation.isPending,
  };
};
// -------------------------------------- End Takeback Buuton Borrowed Page---------------------------------

// -------------------------------------- Start  Admin Page---------------------------------

// ----------------------------------Start Add Button----------------------------------
export const useAddBook = () => {
  const queryClient = useQueryClient();
  const AddBook = useMutation({
    mutationFn: (newBookData: Book) => {
      return AddService.Add(newBookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      alert("The Book is Added Successfully");
    },
  });
  return { BookAdd: AddBook.mutate };
};
// ------------------------------------End Add Button----------------------------------
// ----------------------------------Start Delete Button----------------------------------
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const DeleteBook = useMutation({
    mutationFn: (ISBN: number) => {
      return DeleteService.Delete(ISBN);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => {
      alert("the Book isn't found");
    },
  });
  return { DeleteBook: DeleteBook.mutate };
};
// ----------------------------------End Delete Button----------------------------------
// ------------------------------------ End Admin Page---------------------------------

//  ----------------------------------- Start cards Section---------------------------

// for getting Book and appear it in cards
export const useFetchBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: FetchBooks,
    refetchInterval:500,
    refetchIntervalInBackground: true,
  });
};

// for getting details Books when the user click on button details
export const useBookDetails = (IdBook: string) => {
  return useQuery<Book>({
    queryKey: ["book", IdBook],
    queryFn: () => fetchBookById(IdBook),
  });
};

// for getting users to borrow or takeBack Book
export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ["Users"],
    queryFn: fetchUsers,
    refetchInterval:500,
    refetchIntervalInBackground: true,
  });
};

// for getting Borrowed Books by user id
export const useGetBooks = (UserID: string) => {
  return useQuery<Book[]>({
    queryKey: ["borrowed-books", UserID],
    queryFn: () => fetchBook(UserID),
    enabled: !!UserID,
    refetchInterval:500,
    refetchIntervalInBackground: true,
  });
};

//  ----------------------------------- End cards Section---------------------------

//  ----------------------------------- Start Login page---------------------------
// getting users to compare them with data inputs form textFields
export const useGetUsersLogin = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
//  ----------------------------------- End Login page---------------------------

//  ----------------------------------- Start Resultes page---------------------------
//  for getting books depend on text input from user Like ISBN Number or Name of book
export const useGetSearchResultes = (searchState: string | number) => {
  return useQuery<Book[]>({
    queryKey: ["FoundBooks", searchState],
    queryFn: () => FetchSearchResultes(searchState),
    enabled: searchState !== "",
  });
};
