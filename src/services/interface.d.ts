export interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
  fullName: string;
  avatar: string;
  Job: string;
  feedback: string;
  ISBNs: number[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: Number;
  publication_year: number;
  publisher: string;
  language: string;
  pages: number;
  categories: string[];
  cover_image_url: string;
  description: string;
  rating: number;
  isBorrowed: boolean;
}

export interface EditUserDialogProps {
  open: boolean;
  formData: Book;
  setFormData: (data: any) => void;
  editPro: (data: any) => void;
  onClose: () => void;
}
