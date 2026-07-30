import { useLocation } from "react-router-dom";
import type { Book } from "../services/interface";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  CircularProgress,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useBorrowtheBook } from "../repo/BookRepo";
import { useAuth } from "../context/AuthContext";
import { useGetSearchResultes } from "../repo/BookRepo";
import { useBookDetails } from "../repo/BookRepo";


function Resultes() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idBook, SetIdBook] = useState<number | null>(null);
  //  we recive the isbn number or name of book from main section and put it in searchstate
  const searchState = location.state?.trim();
  //  fetch the Found Books depend on serchState
  const { data: foundBooks = [], isLoading } =useGetSearchResultes(searchState);
  //  to load every details that's book we want
  const { data: bookDetails } = useBookDetails(String(idBook));
  //  function openDialog
  const handleOpenDialog = (id: number) => {
    SetIdBook(id);
    setIsDialogOpen(true);
  };

  // restore the user id to borrow if we can 
  const { userId } = useAuth();
  //  edit status of book and add to ISBNs user
  const { editpro, editPending } = useBorrowtheBook(
    { setIsModelOpen: setIsDialogOpen },
    Number(userId),
  );
  
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="resultes">
          <h1 className="title-section section margin-title" id="title-section">
            {t("SearchRes")}
          </h1>
          {foundBooks.length > 0 ? (
            <div className="cards">
              {foundBooks.map((book: Book) => (
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
                        <span>{t("Author")} : </span>{" "}
                        <span> {book.author}</span>
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
                          handleOpenDialog(Number(book.id));
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
                          open={isDialogOpen}
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
                            {bookDetails && (
                              <>
                                <img
                                  src={bookDetails.cover_image_url}
                                  className="img-detl-dialog"
                                  alt=""
                                />
                                <Typography>
                                  <strong> {t("id")}</strong> : {bookDetails.id}
                                </Typography>
                                <Typography>
                                  <strong>{t("title")}</strong> :{" "}
                                  {bookDetails.title}
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
                                  <strong>{t("pages")}</strong> :{" "}
                                  {bookDetails.pages}
                                </Typography>
                                <Typography>
                                  <strong>{t("publication_year")}</strong> :{" "}
                                  {bookDetails.publication_year}
                                </Typography>
                                <Typography>
                                  <strong>{t("categories")}</strong> :{" "}
                                  {bookDetails.categories.join(" , ")}
                                </Typography>
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
                                    {editPending
                                      ? t("borrowing")
                                      : t("borrowBook")}
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
          ) : (
            <h1>{t("ErrorSerech")}</h1>
          )}{" "}
        </div>
      )}
    </>
  );
}

export default Resultes;
