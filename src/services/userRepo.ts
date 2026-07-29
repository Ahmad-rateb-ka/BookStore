import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book, EditProps } from "./interface";
import { API_books, API_URL } from "./global";
import axios from "axios";
import { AddService, DeleteService } from "./PostServices";

export const borrowtheBook = (
  { setIsModelOpen }: EditProps,
  userId: number,
) => {
  const queryClient = useQueryClient();
  const EditMutation = useMutation({
    mutationFn: async (updatedBook: Book) => {
      const response = await axios.put(
        `${API_books}/${updatedBook.id}`,
        updatedBook,
      );
      return { responseData: response.data, updatedBook };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setIsModelOpen(false);
      EditISBNs.mutate(data.updatedBook);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const EditISBNs = useMutation({
    mutationFn: async (bookInfo: Book) => {
      const response = await axios.get(`${API_URL}/${userId}`);
      const user = response.data;

      if (user) {
        const updatedUser = {
          ...user,
          ISBNs: Array.isArray(user.ISBNs)
            ? [...user.ISBNs, bookInfo.isbn]
            : [bookInfo.isbn],
        };
        const editResponse = await axios.put(
          `${API_URL}/${userId}`,
          updatedUser,
        );
        console.log(editResponse);
        return editResponse.data;
      } else {
        throw new Error("The user wasn't found");
      }
    },
  });
  return {
    editpro: EditMutation.mutate,
    editSuccess: EditMutation.isSuccess,
    editPending: EditMutation.isPending || EditISBNs.isPending,
  };
};

export const takeBacktheBook = (userId: number) => {
  const queryClient = useQueryClient();
  const EditMutation = useMutation({
    mutationFn: async (updatedBook: Book) => {
      const response = await axios.put(
        `${API_books}/${updatedBook.id}`,
        updatedBook,
      );
      return { responseData: response.data, updatedBook };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      EditISBNs.mutate(data.updatedBook);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const EditISBNs = useMutation({
    mutationFn: async (bookInfo: Book) => {
      const response = await axios.get(`${API_URL}/${userId}`);
      const user = response.data;
      if (user) {
        const updatedUser = {
          ...user,
          ISBNs: Array.isArray(user.ISBNs)
            ? user.ISBNs.filter((id: any) => id !== bookInfo.isbn)
            : [],
        };
        const editResponse = await axios.put(
          `${API_URL}/${userId}`,
          updatedUser,
        );
        console.log(editResponse);
        return editResponse.data;
      } else {
        throw new Error("The user wasn't found");
      }
    },
  });
  return {
    editpro: EditMutation.mutate,
    editSuccess: EditMutation.isSuccess,
    editPending: EditMutation.isPending || EditISBNs.isPending,
  };
};

export const numberOfBook = async () => {
  const response = await axios.get(API_books);
  return response.data.length + 1;
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
  return {
    BookAdd: AddBook.mutate,
  };
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
