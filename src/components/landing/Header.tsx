import { colors } from "../../utilities/constans";
import { MenuBar } from "../global/icons/Icons";

export function Header() {
  return (
    <header className="header-landing">
        <div className="header-landing__content">
            <div className="header-landing__logo">
            <h5>Edubo</h5>
            </div>
            <div className="header-landing__sign">
                <button className="f-btn btn--padding btn--l-white">Registrarse</button>
            </div>
        </div>
        <div className="header-landing__menu">
            <a>
            <button className="f-btn btn--white">
                <MenuBar color={colors.COLOR_WHITE}/>                
            </button>
            </a>
        </div>
    </header>
  )
}