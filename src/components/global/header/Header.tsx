import { colors } from "../../../utilities/constans";
import { MenuBar } from "../icons/Icons";
import "./header.css";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { getCookie } from "../../../utilities/cookies";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { Link } from "react-router-dom";
import image from "../../../assets/img/logo.png";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
import defaultuser from '../../../assets/img/defaultuser.png'
interface Props {
  children?: React.ReactNode;
}
const Menu = ({ setShowNavbar }: { setShowNavbar: () => void }) => {
  return (
    <div className="header-landing__menu" style={{ zIndex: "10" }}>
      <button onClick={setShowNavbar} className="btn--sample">
          <MenuBar color={colors.COLOR_WHITE} />
      </button>
    </div>
  );
};
export function Header({ children }: Props) {
  const [showNavbar, setShowNavbar] = useState(false);
  const user = useSelector((store: AppStore) => store.user);

  let autenticated = false;
  if (getCookie("token")) autenticated = true;

  return (
    <div>
      <header className="header container-content">
        <Link to={"/"} className="header-logo">
          <div className="header__img">
            <img src={image} alt="" />
          </div>
        </Link>
        <div className="header-sign">
          <Navbar
            showNavbar={showNavbar}
            closeNav={() => setShowNavbar(false)}
          />

          {!autenticated ? (
            <>{children}</>
          ) : (
            <img
              style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              src={
                user.image?.includes("google")
                  ? user.image
                  : user.image ? 
                    `${APIURLIMG}${user.image}`
                  :
                  defaultuser
              }
              alt=""
            />
          )}
          <Menu setShowNavbar={() => setShowNavbar(!showNavbar)} />
        </div>
      </header>
    </div>
  );
}
