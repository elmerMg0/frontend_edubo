import { useNavigate } from 'react-router';
import { deleteCookie } from '../../../utilities/cookies';
import './navbar.css'
import { Link } from 'react-router-dom';
//import { useSelector } from 'react-redux';
//import { AppStore } from '../../../redux/store';
function Navbar({showNavbar, closeNav}: {showNavbar: boolean, closeNav: () => void}) {
    const autenticated = document.cookie.length > 0;
    const navigate = useNavigate();
    //const user = useSelector((state: AppStore) => state.user)
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
               {/*  <li>
                    <a href={`${user.username}`}>Mi cuenta</a>
                </li> */}
                <li>
                    <Link to={autenticated ? '/rutas' : '/login'}>Cursos</Link>
                </li>
                <li>
                    <Link to={'/simulacros'}>Simulacros</Link>
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