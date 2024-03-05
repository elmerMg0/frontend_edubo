import { useNavigate } from 'react-router';
import { deleteCookie } from '../../../utilities/cookies';
import './navbar.css'
import { Link } from 'react-router-dom';
function Navbar({showNavbar, closeNav}: {showNavbar: boolean, closeNav: () => void}) {
    const autenticated = document.cookie.length > 0;
    const navigate = useNavigate();
    const handleLogOut = () => {
        deleteCookie('token');
        closeNav()
        navigate('/')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <nav className={`navigation ${showNavbar ? 'active' : ''}`}>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <Link to={autenticated ? 'rutas' : '/login'}>Cursos</Link>
                </li>
                <li>
                    <a href="/">Contacto</a>
                </li>
                <li>
                    {
                        autenticated ? <button className='f-btn' onClick={handleLogOut}>Logout</button> : 
                        <button className='f-btn' onClick={() => handleLogin()}>Login</button>
                    }
                </li>
            </ul>
        </nav>
  )
}

export default Navbar