import { Facebook, Icon0CircleFill, Instagram, Tiktok, Twitter, Youtube } from 'react-bootstrap-icons'
import './footer.css'
export function Footer(){
    return(
        <footer>
            <div className='footer-logo'>
                <p>Edubo</p>
            </div>

            <div className='footer-icons'>
                <Facebook size={22}/>
                <Instagram size={22}/>
                <Twitter size={22}/>
                <Youtube size={22}/>
                <Tiktok size={22}/>
            </div>
            <p>Edubo - Todos los derechos reservados</p>
        </footer>
    )
}