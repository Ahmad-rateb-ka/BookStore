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
  fetchUsersLogin,
  FetchSearchResultes,
} from "../services/BookServices";

// تصحيح الاسم ليصبح دالة مخصصة تبدأ بـ use لتتمكن من استخدام useQueryClient و useMutation
export const useBorrowtheBook = (
  { setIsModelOpen }: { setIsModelOpen: (isOpen: boolean) => void },
  UserId: number,
) => {
  const queryClient = useQueryClient();

  const EditISBNsToBorrowMutution = useMutation({
    mutationFn: ({ bookInfo, userId }: { bookInfo: Book; userId: number }) =>
      EditISBNsUserToBorrowService({ bookInfo, userId }),
  });

  const BorrowBook = useMutation({
    mutationFn: BorrowBookService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setIsModelOpen(false);
      EditISBNsToBorrowMutution.mutate({
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
    editpro: BorrowBook.mutate,
    editSuccess: BorrowBook.isSuccess,
    editPending: BorrowBook.isPending || EditISBNsToBorrowMutution.isPending,
  };
};

//------------------------------------------------------------------------------------

// تصحيح الاسم ليصبح دالة مخصصة تبدأ بـ use
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
  return { TakeBacktheBookService, BookAdd: AddBook.mutate };
};

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

// تصحيح وتحويل جلب الكتب إلى Custom Hook يبدأ بـ use
export const useFetchBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: FetchBooks,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useBookDetails = (IdBook: string) => {
  return useQuery<Book>({
    queryKey: ["book", IdBook],
    queryFn: () => fetchBookById(IdBook),
  });
};

// تصحيح وتحويل جلب المستخدمين إلى Custom Hook صحيح
export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ["Users"],
    queryFn: fetchUsers,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useGetBooks = (UserID: string) => {
  return useQuery<Book[]>({
    queryKey: ["borrowed-books", UserID],
    queryFn: () => fetchBook(UserID),
    enabled: !!UserID,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

// -------------------------------------------------
export const useGetUsersLogin = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsersLogin,
  });
};
// ------------------------------------------------

export const useGetSearchResultes = (searchState: string | number) => {
  return useQuery<Book[]>({
    queryKey: ["FoundBooks", searchState],
    queryFn: () => FetchSearchResultes(searchState),
    enabled: searchState !== "",
  });
};
