import axios from "axios";
import { API_books, API_URL } from "../services/global";
import type { Book } from "../services/interface";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useAuth } from "../services/AuthContext";
import { takeBacktheBook } from "../services/userRepo";

const BorrowedBooks = () => {
  const { userId } = useAuth();
  const fetchBook = async () => {
    const response = await axios.get(`${API_URL}/${userId}`);
    const ArrayISBNs = response.data.ISBNs || [];
    if (ArrayISBNs.length === 0) return [];
    const bookPromises = ArrayISBNs.map(async (ISBN: string) => {
      const response = await axios.get<Book[]>(API_books, {
        params: { isbn: ISBN },
      });
      return response.data && response.data.length > 0
        ? response.data[0]
        : null;
    });
    const allBooks = await Promise.all(bookPromises);
    return allBooks;
  };
  const { data: Books = [] } = useQuery<Book[]>({
    queryKey: ["borrowed-books", userId],
    queryFn: fetchBook,
    enabled: !!userId,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const { t } = useTranslation();
  const { editpro, editPending } = takeBacktheBook(Number(userId));
  return (
    <div>
      <h1 className="title-section section margin-title" id="title-section">
        {t("BorrowedBooks")}
      </h1>
      <div className="cards section">
        {Books.map((book: Book) => (
          <div className="card" key={book.id}>
            <div className="info-card">
              <img src={book.cover_image_url} />
              <div className="deatiels-card">
                <span></span>
                <span>
                  {t("title")} :&nbsp;<span> {book.title}</span>
                </span>
                <span>
                  {t("Author")} :&nbsp;<span> {book.author}</span>
                </span>
                <span>
                  {t("ISBN")} :&nbsp;<span>{Number(book.isbn)}</span>
                </span>
              </div>
            </div>
            <div className="description-card">
              <p> {book.description}</p>
              <div className="btns-card">
                <Button
                  sx={{
                    fontFamily: "Alexandria",
                    color: "white",
                    backgroundColor: "#fbac0f",
                    flex: "0.5",
                  }}
                  onClick={() => {
                    const updatedBook = { ...book, isBorrowed: true };
                    editpro(updatedBook);
                  }}
                >
                  {editPending ? t("takingBack") : t("takeBack")}
                </Button>
                <span>
                  {Boolean(book.isBorrowed) === true
                    ? t("Available")
                    : t("Not_Available")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
