import axios from "axios";
import { FaStar } from "react-icons/fa";
import { API_URL } from "../services/global";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../services/interface";
import { useTranslation } from "react-i18next";
function Testimonials() {
  const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["Users"],
    queryFn: fetchUsers,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
  const { t } = useTranslation();
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
