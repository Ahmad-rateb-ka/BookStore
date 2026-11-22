import { useTranslation } from "react-i18next";
import About from "../../public/images/AboutUs3.png";
import { getImageUrl } from "../utils/imags";

function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      <div className="About-Us section" id="About-Us">
        <div className="info">
          <h1>{t("about-us-title")}</h1>
          <p>{t("about-us-des")}</p>
          <a href="mailto:ahmad@gmail.com">{t("about-us-link")}</a>
        </div>
        <div className="img">
          <img src={About} alt="" />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
