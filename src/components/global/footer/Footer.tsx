import './footer.css'
import { BsFacebook, BsInstagram, BsTiktok, BsTwitter, BsYoutube } from 'react-icons/bs'
export function Footer(){
    return(
        <footer>
            <div className='footer-logo'>
                <p>Edubo</p>
            </div>

            <div className='footer-icons'>
                <BsFacebook size={22}/>
                <BsInstagram size={22}/>
                <BsTwitter size={22}/>
                <BsYoutube size={22}/>
                <BsTiktok size={22}/>
            </div>
            <p>Edubo - Todos los derechos reservados</p>
        </footer>
    )
}