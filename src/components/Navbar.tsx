import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../public/images/logo.png";
import { getImageUrl } from "../utils/imags";

function Navbar() {
  //navbar Section
  // For Save the NavBar Status If The NavBar Open Or Close
  // If The Value of IsNavView = true We Will Watch The NavBar
  const [isNavView, setIsNavView] = useState(false);
  const handleShow = () => {
    isNavView ? setIsNavView(false) : setIsNavView(true);
  };

  // tranlation Section
  // For Save The Languge Chosen
  const [Language, setLanguage] = useState<string>("");
  // We use the "t" for Switching the Language &
  // We use the  "i18n" for Changing Language And Check if We Have The Language Chose previously
  const { t, i18n } = useTranslation();

  // We Store The Language In LocalStorage For The User To Prevent The Language From Changing =>
  // if  the User Does Refresh For Page
  // Also We Here We Have The Procdure OF Changing Language & Check The General Status for it
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.body.lang = i18n.language;
    i18n.changeLanguage(Language);
    localStorage.setItem("Lang", Language);
  }, [i18n.language, Language]);

  const navigate = useNavigate();

  return (
    <nav className="main-nav">
      <div className="logoDiv">
        <img src={getImageUrl(LogoImg)} alt="" />
        {t("Book-store")}
      </div>
      <div className="eles-nav">
        <div className="spans-nav" onClick={handleShow}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${isNavView ? "show" : ""}`}>
          <li
            onClick={() => {
              navigate("/BorrowedBooks");
            }}
          >
            {t("BorroedBooks")}
          </li>
          <li>
            <a href="#LatestBooks">{t("LatestBooks")}</a>
          </li>
          <li>
            <a href="#About-Us">{t("aboutUs")}</a>
          </li>
          <li>
            <a href="#Testimonials">{t("Testimonials")}</a>
          </li>
          <li onClick={() => setLanguage("en")}>English</li>
          <li onClick={() => setLanguage("ar")}>عربي</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
