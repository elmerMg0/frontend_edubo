import { useNavigate } from 'react-router';
import { deleteCookie } from '../../../utilities/cookies';
import './navbar.css'
function Navbar({showNavbar, handleLogin}: {showNavbar: boolean, handleLogin: () => void}) {
    const autenticated = document.cookie.length > 0;
    const navigate = useNavigate();
    const handleLogOut = () => {
        deleteCookie('token');
        navigate('/')
    }


    return (
        <nav className={`navigation ${showNavbar ? 'active' : ''}`}>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/rutas">Cursos</a>
                </li>
                <li>
                    <a href="/">Contacto</a>
                </li>
                <li>
                    {
                        autenticated ? <button className='f-btn' onClick={handleLogOut}>Logout</button> : 
                        <button className='f-btn' onClick={handleLogin}>Login</button>
                    }
                </li>
            </ul>
        </nav>
  )
}

export default Navbar