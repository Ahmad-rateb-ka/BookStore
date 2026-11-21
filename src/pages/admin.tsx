import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import type { Book } from "../services/interface";
import { useAddBook, useDeleteBook } from "../repo/BookRepo";

const Admin = () => {
  const { t } = useTranslation();

  // we create this formref for collecting information  from form
  const formref = useRef<HTMLFormElement>(null);
  // function  Adding Book
  const { BookAdd } = useAddBook();
  //function Deleting Book
  const { DeleteBook } = useDeleteBook();

  //function will send the data from form to DbBooks.json
  async function handleSubmit(e: any) {
    // to prevent clearing data from form
    e.preventDefault();

    //check if formref has the data from text Fileds
    if (!formref.current) return;
    const formData = new FormData(formref.current);

    // We select  input type = file
    const fileInput = formref.current.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // here we get the file from file input
    const file = fileInput?.files?.[0];
    // create this var for put image file in it
    let base64Image = "";
    // check if the file has info
    if (file) {
      // if the file has info we will start in converting Procedure
      base64Image = await new Promise<string>((resolve, reject) => {
        // we create file reader Beacse this class can help us in converting
        const fileReader = new FileReader();
        //here convert the data image for Base64
        fileReader.readAsDataURL(file);

        // then we will reszie the image to make it available for storing =>
        // because the json-server accept the imgae size until 100KB =>
        // After this limit he will reject the image
        fileReader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 400;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
            resolve(dataUrl);
          };
        };
        fileReader.onerror = (error) => reject(error);
      });
    }

    // here we are collecting the data input from text fields =>
    // and put it in BookData to be able to send to the DbBooks.json
    const bookData: Book = {
      id: "",
      title: formData.get("title") as string,
      author: formData.get("auth") as string,
      isbn: Number(formData.get("isbn")),
      publication_year:
        Number(formData.get("Publ")) || new Date().getFullYear(),
      publisher: "Unknown Publisher",
      language: formData.get("lang") as string,
      pages: Number(formData.get("page")) || 0,
      categories: formData.get("cate")
        ? (formData.get("cate") as string).split(",").map((c) => c.trim())
        : [],
      cover_image_url: base64Image,
      description: formData.get("desc") as string,
      rating: Number(formData.get("rati")) || 0,
      isBorrowed: true,
    };
    // here the data send it to function then after that the data is sent for dbBooks.json
    BookAdd(bookData);
  }
  // we create this isbn to store the isbn Book then delete Book from database
  const [isbn, setIsbn] = useState<string>("");
  // function click in delete Button
  const handleDelete = () => {
    // to check if the textfile is Null
    if (isbn != "") {
      // if the text filed isn't null we will send the isbn number=>
      //  then if we have this book we will delete it if we don't have we will tell the user
      DeleteBook(Number(isbn));
    } else {
      alert("Dont't Leave The ISBN filed Empty");
    }
  };

  return (
    <div className="container-info-book">
      <div className="form">
        <div>
          <h1 className="title-section">{t("Admin-title")}</h1>
        </div>
        <form action="" ref={formref} onSubmit={handleSubmit}>
          <input name="title" type="text" placeholder={t("title")} required />
          <input name="auth" type="text" placeholder={t("Author")} required />
          <input
            name="cate"
            type="text"
            placeholder={t("categories")}
            required
          />
          <textarea name="desc" id="" placeholder={t("Description")}></textarea>
          <input name="rati" type="text" placeholder={t("rating")} required />
          <div className="isbn-lang">
            <select name="lang" id="">
              <option value="العربية">العربية</option>
              <option value="English">English</option>
            </select>
            <input name="page" type="number" placeholder={t("pages")} />
            <label htmlFor="Upload_img" id="file_label">
              {t("Upload-img")}{" "}
            </label>
            <input name="imag" type="file" id="Upload_img" />
          </div>
          <input
            name="isbn"
            type="text"
            onChange={(e) => {
              setIsbn(e.target.value);
            }}
            placeholder={t("ISBN")}
            required
          />
          <input
            name="Publ"
            type="text"
            placeholder={t("publication_year")}
            required
          />
          <div className="btns-admin">
            <input type="submit" value={t("AddBook")} />
            <button type="button" onClick={handleDelete}>
              {t("Delete")}
            </button>
            <input type="reset" value={t("reset")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
