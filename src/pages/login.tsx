import "../style/master.css";
import LogoImg from "../../public/images/logo.png";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useGetUsersLogin } from "../repo/BookRepo";
import type { User } from "../services/interface";

function Login() {
  const navigate = useNavigate();
  // to store the username from username textfiled
  const [E_mail, setE_mail] = useState("");
  // to store the password from password textfiled
  const [Password, setPassword] = useState("");
  // to show the error message if the username or password is wrong
  const [Error, SetError] = useState(false);
  // to fetch Users and start searching if we have this user
  const { data: users = [] } = useGetUsersLogin();
  // to set values user name , user id and make them available in every place
  const { setUser } = useAuth();

  // to control in duration error mesage
  useEffect(() => {
    if (Error) {
      const timer = setTimeout(() => {
        SetError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [Error]);

  //  function button login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    // we create the constant Found User to get final result
    const FoundUser = users.find(
      (user: User) =>
        // compare between our info from our database with inputs from user
        user.email.trim() === E_mail.trim() &&
        String(user.password).trim() === Password.trim(),
    );

    //if the found user value  was with info so the final value is true
    if (FoundUser) {
      const NameUser = FoundUser.userName.split(" ");
      setUser(String(FoundUser.id), NameUser[0]);
      navigate("/Home", { state: { id: FoundUser.id, userName: NameUser } });
    } else {
      if (E_mail.trim() === "ahmad@gmail.com" && Password === "123") {
        navigate("/Admin");
      } else {
        // else his value is false then we will appear for user search message
        SetError(true);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div className="container">
        <div className="form">
          <img src={LogoImg} alt="" />
          <h1>{t("Book-store")}</h1>
          <form action="" onSubmit={handleLogin}>
            <label htmlFor="userName">{t("userName")}</label>
            <input
              type="text"
              id="userName"
              placeholder={t("pleaseEnterEmail")}
              value={E_mail}
              onChange={(e) => setE_mail(e.target.value)}
              required
            />
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              placeholder={t("pleaseEnterPassword")}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value={t("login")} id="btnSub" />
          </form>
          <div className="icons-list">
            <ul className="social" data-name={t("LoginVia")}>
              <a href="https://facebook.com" target="blank">
                <li className="facebook">
                  <FaFacebook />
                </li>
              </a>
              <a href="https://google.com" target="blank">
                <li className="google">
                  <FaGoogle />
                </li>
              </a>
              <a href="https://instagram.com" target="blank">
                <li className="instagram">
                  <FaInstagram />
                </li>
              </a>
            </ul>
          </div>
        </div>
        {Error && (
          <div id="error" className="error">
            {t("errorMessage")}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
