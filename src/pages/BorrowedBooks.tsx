import type { Book } from "../services/interface";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTakeBackBook, useGetBooks } from "../repo/BookRepo";
const BorrowedBooks = () => {
  // for getting user id to borrowed him a book
  const { userId } = useAuth();
  // translate
  const { t } = useTranslation();
  // fething the books depend on user id
  const { data: Books = [] } = useGetBooks(String(userId));
  //  for change statues Book (Available or Not Available) also depend on user id
  const { editpro, editPending } = useTakeBackBook(Number(userId));
  return (
    <div>
      <h1 className="title-section section margin-title" id="title-section">
        {t("BorrowedBooks")}
      </h1>
      <div className="cards section">
        {Books.map((book: Book) => (
          <div className="card" key={book.id}>
            <div className="info-card">
              <div>
                <img src={book.cover_image_url} />
              </div>
              <div className="deatiels-card">
                <div>
                  <span>{t("title")} : </span> <span> {book.title}</span>
                </div>
                <div>
                  <span>{t("Author")} : </span> <span> {book.author}</span>
                </div>

                <div>
                  <span>{t("ISBN")} : </span>
                  <span>{Number(book.isbn)}</span>
                </div>
                <div>
                  <span>{t("pages")} : </span>
                  <span>{book.pages}</span>
                </div>
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
