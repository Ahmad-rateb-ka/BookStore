import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../public/images/logo.png";

function Navbar() {
  //navbar Section
  const [isVisNav, setIsVisNav] = useState(false);
  const handleShow = () => {
    isVisNav ? setIsVisNav(false) : setIsVisNav(true);
  };

  // tranlation Section
  const [Language, setLanguage] = useState<string>("");
  const { t, i18n } = useTranslation();
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
        <img src={LogoImg} alt="" />
        {t("Book-store")}
      </div>
      <div className="eles-nav">
        <div className="spans-nav" onClick={handleShow}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`${isVisNav ? "show" : ""}`}>
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
