import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import type { Book } from "../services/interface";
import { useAddBook, useDeleteBook } from "../services/userRepo";
import { numberOfBook } from "../services/userRepo";

const Admin = () => {
  const { t } = useTranslation();
  const formref = useRef<HTMLFormElement>(null);
  const { BookAdd } = useAddBook();
  const { DeleteBook } = useDeleteBook();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!formref.current) return;
    const formData = new FormData(formref.current);
    const fileInput = formref.current.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    let base64Image = "";
    if (file) {
      base64Image = await new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
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

    const a = async () => {
      return await numberOfBook();
    };
    const bookData: Book = {
      id: String(a),
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
    BookAdd(bookData);
  }
  const [isbn, setIsbn] = useState<string>("");
  const handleDelete = () => {
    if(isbn !=  "")
    {
      DeleteBook(Number(isbn));
    }
    else
    {
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
