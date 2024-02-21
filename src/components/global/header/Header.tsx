import { colors } from "../../../utilities/constans";
import { MenuBar } from "../icons/Icons";
import image from '../../../assets/img/logoedubo1.png' 
import './header.css'
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { getCookie } from "../../../utilities/cookies";
interface Props {
    children?: React.ReactNode
    setIsOpen: () => void | undefined
}
const Menu = ({setShowNavbar}: {setShowNavbar: () => void}) => {
  return (
    <div className="header-landing__menu" style={{zIndex: '10'}}>
        <a>
        <button className="f-btn btn--white" onClick={setShowNavbar}>
            <MenuBar color={colors.COLOR_WHITE}/>                
        </button>
        </a>
    </div>
    )
  }
export function Header({ children, setIsOpen}:Props) {
  const [showNavbar, setShowNavbar] = useState(false);
  //const [showModal, setShowModal] = useState(true);

  let autenticated = false; 
  if(getCookie('token'))autenticated = true;
  const handleLogin = () => {
    setIsOpen()
    setShowNavbar(false);
  }
  return (
    <header className="header">
        <div className="header-logo">
            <div className="header__img">
              <img src={image} alt="" />
            </div>
            <h5>Edubo</h5>
        </div>
       <div className="header-sign">

        <Navbar showNavbar={showNavbar} handleLogin={handleLogin} closeNav={() => setShowNavbar(false)}/>
       
       {
         !autenticated ? 
         <>
             {children}
           </>
           : <img style={{width: '24px', height: '24px', borderRadius: '50%'}} src="https://picsum.photos/200" alt=""/> 
          }
        <Menu setShowNavbar={() => setShowNavbar(!showNavbar)}/>
        </div>

    </header>
  )
}