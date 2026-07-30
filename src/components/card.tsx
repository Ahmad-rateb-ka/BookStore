import { useState } from "react";
import type { Book } from "../services/interface";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import "../style/master.css";
import { useTranslation } from "react-i18next";
import { useBorrowtheBook, useFetchBooks } from "../repo/BookRepo";
import { useBookDetails } from "../repo/BookRepo";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
function Cards() {

  const { t, i18n } = useTranslation();
  // For Saving The Dialog Statues
  const [isDiaologOpen, setIsDialogOpen] = useState(false);
  // To Fetch Every Book From DataBase Show The Books
  const { data: Books = [] } = useFetchBooks();
  // To Save The ID of Book And pass it to useBookDetails
  const [idBook, SetIdBook] = useState<string>("");

  //  Function Open Dialig Details Book and show Details Books
  const handleOpenDialog = (id: string) => {
    setIsDialogOpen(true);
    SetIdBook(id);
  };

  // Loading the Details Of Book By Get The ID of Book
  const { data: bookDetails, isLoading } = useBookDetails(idBook);

  // To Recive The ID of User From Login Page And Store It To Use Again But for 
  // Borrowing Book Beacse We Need To Know The ID Of User For Adding The Book For Him & ID Of Book 
  // To Make The Book Not Available 
  const {userId}=useAuth();

  // Function Edit The Borrow Book 
  const { editpro, editPending } = useBorrowtheBook(
    { setIsModelOpen: setIsDialogOpen },
    Number(userId),
  );

  return (
    <>
      <h1 className="title-section section" id="title-section">
        {t("ourBooks")}
      </h1>
      <div className="cards section" id="LatestBooks">
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
                <button
                  key={book.id}
                  className="btn-detl"
                  onClick={() => {
                    handleOpenDialog(book.id);
                  }}
                >
                  {t("details")}
                  &nbsp; &nbsp;
                  <span>
                    {i18n.language === "ar" ? (
                      <FaArrowLeft />
                    ) : (
                      <FaArrowRight />
                    )}
                  </span>
                </button>
                {
                  <Dialog
                    open={isDiaologOpen}
                    onClose={() => {
                      setIsDialogOpen(false);
                    }}
                    fullWidth
                    maxWidth="xs"
                    disableEnforceFocus
                    className="dialogDetails"
                    sx={{
                      "& *": {
                        fontFamily: '"Alexandria", sans-serif !important',
                      },
                    }}
                  >
                    <Box className="topBar">
                      <DialogTitle>{t("title-dialog")}</DialogTitle>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            setIsDialogOpen(false);
                          }}
                        >
                          X
                        </Button>
                      </DialogActions>
                    </Box>
                    <DialogContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        minWidth: "300px",
                        pt: 1,
                      }}
                    >
                      {isLoading && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 2,
                          }}
                        >
                          <CircularProgress color="warning" />
                        </Box>
                      )}

                      {!isLoading && bookDetails && (
                        <>
                          <img
                            src={bookDetails.cover_image_url}
                            className="img-detl-dialog"
                            alt=""
                          />
                          <Typography>
                            <strong>{t("title")}</strong> : {bookDetails.title}
                          </Typography>
                          <Typography>
                            <strong>{t("Description")}</strong> :{" "}
                            {bookDetails.description}
                          </Typography>
                          <Typography>
                            <strong>{t("Author")}</strong> :{" "}
                            {bookDetails.author}
                          </Typography>
                          <Typography>
                            <strong>{t("ISBN")}</strong> :{" "}
                            {Number(bookDetails.isbn)}
                          </Typography>
                          <Typography>
                            <strong>{t("LanguageD")}</strong> :{" "}
                            {bookDetails.language}
                          </Typography>
                          <Typography>
                            <strong>{t("pages")}</strong> : {bookDetails.pages}
                          </Typography>
                          <Typography>
                            <strong>{t("publication_year")}</strong> :{" "}
                            {bookDetails.publication_year}
                          </Typography>
                          {bookDetails.categories &&
                            bookDetails.categories.length > 0 && (
                              <Typography>
                                <strong>{t("categories")}</strong> :{" "}
                                {bookDetails.categories.join(" , ")}
                              </Typography>
                            )}
                          <Typography>
                            <strong>{t("rating")}</strong> :{" "}
                            {bookDetails.rating}
                          </Typography>
                          {bookDetails.isBorrowed && (
                            <Button
                              sx={{
                                backgroundColor: "#fbac0f",
                                color: "white",
                              }}
                              disabled={editPending}
                              onClick={() => {
                                const updatedBook = {
                                  ...bookDetails,
                                  isBorrowed: false,
                                };
                                editpro(updatedBook);
                              }}
                            >
                              {editPending ? t("borrowing") : t("borrowBook")}
                            </Button>
                          )}
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                }
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
    </>
  );
}

export default Cards;
