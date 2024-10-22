import "./footer.css";
import { BiHome } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTiktok, BsYoutube } from "react-icons/bs";
export function Footer() {
  return (
    <footer className="footer">
      <section className="footer-social my-3">
        <a href="https://www.facebook.com/profile.php?id=61567754424794&mibextid=ZbWKwL" target="_blank">
         <BsFacebook size={22} />
        </a>
        <a href="https://www.instagram.com/esniun?igsh=MTQxYWVhZDkyZjlrZA==" target="_blank">
          <BsInstagram size={22} />
        </a>
          <BsYoutube size={22} />
        <a href="https://www.tiktok.com/@esniun_preu?_t=8qlPgh7HqqL&_r=1" target="_blank">
          <BsTiktok size={22} />
        </a>
      </section>

      <div className="footer-container">
        <section className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <Link to={"/rutas"}>Facultades</Link>
            </li>
            <li>
              <Link to={"https://wa.me/59163021573?text=Mas%20informacion%20por%20favor"} target="_blank">Contacto</Link>
            </li>

            <li>
              <Link to="#">Términos y Condiciones</Link>
            </li>
          </ul>
        </section>
        <section className="footer-contact">
          <h4>Contacto</h4>
          <div>
            <MdEmail />
            <p>esniun@gmail.com</p>
          </div>
          <div>
            <PiPhone />
            <p>+591 63021573</p>
          </div>
        </section>
      </div>
      <section className="footer-copyright mt-3">
        <p>© 2024. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}
