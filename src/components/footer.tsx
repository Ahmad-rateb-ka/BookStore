import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaMapMarkedAlt,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";
import { getImageUrl } from "../utils/imags";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer">
        <div className="container-footer">
          <div className="box">
            <h3>{t("Book-store")}</h3>
            <ul className="social">
              <li>
                <a href="#" className="facebook">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="twitter">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="youtube">
                  <FaYoutube />
                </a>
              </li>
            </ul>
            <p className="text">{t("Footer")}</p>
          </div>
          <div className="box">
            <div className="line">
              <FaMapMarkedAlt className="icons-line" />
              <div className="info">{t("location")}</div>
            </div>
            <div className="line">
              <FaClock className="icons-line" />
              <div className="info">{t("workHours")}</div>
            </div>
            <div className="line">
              <FaPhoneAlt className="icons-line" />
              <div className="info">
                <span> 9630912345678 , 9630912345679 </span>
              </div>
            </div>
          </div>
          <div className="box footer-gallery">
            <img src={getImageUrl("/images/footer1.jpg")} alt="" />
            <img src={getImageUrl("/images/footer2.jpg")} alt="" />
            <img src={getImageUrl("/images/footer3.jpg")} alt="" />
            <img src={getImageUrl("/images/footer4.jpg")} alt="" />
            <img src={getImageUrl("/images/footer5.jpg")} alt="" />
            <img src={getImageUrl("/images/footer6.jpg")} alt="" />
          </div>
        </div>
        <p className="copyright">Made With &copy; Eng.Ahmad Rateb Kassoumeh</p>
      </div>
    </>
  );
}
export default Footer;
