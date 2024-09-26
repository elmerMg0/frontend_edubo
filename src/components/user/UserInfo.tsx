import { useEffect, useRef, useState } from "react";
import { Header } from "../global/header/Header";
import "./user.css";
import { useParams } from "react-router";
import { APISERVICE } from "../../service/api.service";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { User } from "../../models/User";
import UserInfoAuth from "./UserInfoAuth";
import { Footer } from "../global/footer/Footer";
function UserInfo() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const isAutenticated = useRef(false);

  const { username } = useParams();

  const user = useSelector((state: AppStore) => state.user);
  useEffect(() => {
    getInfoUser();
  }, []);

  const getInfoUser = async () => {
    try {
      const body = {
        token: user.accessToken,
        id: user.id,
      };
      const response = await APISERVICE.post(
        body,
        `usuario/get-user-data?`,
        `username=${username}`
      );

      if (response.success) {
        setUserInfo(response.data);
        isAutenticated.current = true;
      } else {
        setUserInfo(response.data);
        isAutenticated.current = false;
      }
    } catch (error) {}
  };

  return (
    <div className="user-container">
      <Header />
      <div className="user">
        {isAutenticated.current ? <UserInfoAuth userInfo={userInfo} />
        :
          'No estas autenticado'
      }
      </div>
      <Footer />
    </div>
  );
}

export default UserInfo;
