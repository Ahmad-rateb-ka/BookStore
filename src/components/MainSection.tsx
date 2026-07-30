import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function MainSection() {

  const { t } = useTranslation();

  // For Saving The Text Which Come From SearchBar 
  const [textSearch, setTextSearch] = useState<string>("");

  // To Move To Another Page
  const navigate = useNavigate();

  // For Save The Error Message State Because We Will Show The Appeare Message If The value of Error=true 
  // OtherWise We Will Disappear it
  const [Error, SetError] = useState(false);

  // For Control IN Duration Showing The Error Message
  useEffect(() => {
    if (Error) {
      const timer = setTimeout(() => {
        SetError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [Error]);

  // For Receive The Name Of User From Auth Context and Appear The Name In Main Section
  const { userName } = useAuth();

  // Function For Moving To Resultes Page Then There We Will Search On Book
  const handleSearch = (TextSearch: string) => {
    if (textSearch === "") {
      SetError(true);
    } else {
      navigate("/Resultes", { state: textSearch });
    }
  };
  
  return (
    <section className="main-bannar">
      {Error && (
        <div id="error" className="error">
          {t("Search-Bar-Empty")}
        </div>
      )}
      <div className="bannar">
        <div className="search-box">
          <h1>
            {t("welcome")} <span>{userName}</span>
          </h1>
          <p>{t("the one of Biggest")}</p>
          <div className="textbox">
            <input
              type="text"
              value={textSearch}
              onChange={(e) => {
                setTextSearch(e.target.value);
              }}
              placeholder={t("search on Book")}
            />
            <button
              onClick={() => {
                handleSearch(textSearch);
              }}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
