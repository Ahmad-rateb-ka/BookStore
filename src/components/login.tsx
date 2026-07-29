import "../services/master.css";
import LogoImg from "../../public/images/logo.png";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/global";
import type { User } from "../services/interface";
import { useAuth } from "../services/AuthContext";
import { useTranslation } from "react-i18next";

function Login() {
  const navigate = useNavigate();

  const [E_mail, setE_mail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, SetError] = useState(false);

  const { setUser } = useAuth();
  useEffect(() => {
    if (Error) {
      const timer = setTimeout(() => {
        SetError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [Error]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const response = await axios.get(API_URL);
    const users = response.data;
    const FoundUser = users.find(
      (user: User) =>
        user.email.trim() === E_mail.trim() &&
        String(user.password).trim() === Password.trim(),
    );

    if (FoundUser) {
      const NameUser = FoundUser.userName.split(" ");
      setUser(FoundUser.id, NameUser[0]);
      navigate("/Home",{state:{id:FoundUser.id,userName:NameUser}});
    } else {
      if (E_mail.trim() === "ahmad@gmail.com" && Password === "123") {
        navigate("/Admin");
      } else {
        SetError(true);
      }
    }
  };
  const { t} = useTranslation();
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
              <a href="https://m.facebook.com/" target="blank">
                <li className="facebook">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://accounts.google.com/v3/signin/identifier?dsh=S-148365925%3A1784817116278752&hl=ar&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=Ac50bxvR7MCG2dGFscx6ZQaSomB96LH4zEAidrwZHk2mPbz4Eg6jYIbU6dJ7rZvdTUBwmUjeKQos"
                target="blank"
              >
                <li className="google">
                  <FaGoogle />
                </li>
              </a>
              <a
                href="https://www.instagram.com/accounts/login/?hl=en"
                target="blank"
              >
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
