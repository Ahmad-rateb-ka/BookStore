import { FaStar } from "react-icons/fa";
import type { User } from "../services/interface";
import { useTranslation } from "react-i18next";
import { useGetUsers } from "../repo/BookRepo";
function Testimonials() {
  const { t } = useTranslation();
  const { data: users = [] } = useGetUsers();
  return (
    <>
      <div className="Testimonials section" id="Testimonials">
        <h1 className="title-section">{t("Testimonials")}</h1>
        <div className="container-boxes">
          {users.map((user: User) => (
            <div className="box" key={user.id}>
              <img src={user.avatar} />
              <h3>{user.fullName}</h3>
              <span className="title">{user.Job}</span>
              <div className="rate">
                <FaStar className="star" />
                <FaStar className="star" />
                <FaStar className="star" />
                <FaStar className="star" />
                <FaStar className="star" />
              </div>
              <p>{user.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Testimonials;
