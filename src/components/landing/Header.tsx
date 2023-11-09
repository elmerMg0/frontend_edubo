import { colors } from "../../utilities/constans";
import { MenuBar } from "../global/icons/Icons";
import { UserMenu } from "../home/UserMenu";

interface Props {
    children: React.ReactNode
}
const autenticated = false;
const menu = () => {
    return (
        <div className="header-landing__menu">
        <a>
        <button className="f-btn btn--white">
            <MenuBar color={colors.COLOR_WHITE}/>                
        </button>
        </a>
    </div>
    )
}
export function Header({ children }:Props) {
  return (
    <header className="header-landing">
        <div className="header-landing__content">
            <div className="header-landing__logo">
            <h5>Edubo</h5>
            </div>
            {
                children
            }
        </div>
       {
           autenticated ? 
             menu():
             <UserMenu/>
            }
    </header>
  )
}