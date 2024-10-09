import { Header } from "../../components/global/header/Header";
import "./landing.css";
import { Carousel } from "./carousel/Carousel";
import { Footer } from "../../components/global/footer/Footer";
import { RegistrerModal } from "../../components/registerModal/RegisterModal";
import {
  FcFlowChart,
  FcGlobe,
  FcOnlineSupport,
  FcPositiveDynamic,
  FcSurvey,
  FcVideoCall,
} from "react-icons/fc";
import { useState } from "react";
import { bussinesName } from "../../utilities/constans";
export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="landing-container">
      <Header>
        <div className="header-landing__sign">
          <button
            className="btn btn--white btn--small"
            onClick={() => toggleModal()}
          >
            Registrarse
          </button>
        </div>
      </Header>
      <div className="landing">
        <section className="hero-content container-content">
          <h1>
            Tu viaje hacia la universidad comienza aquí.
            <span className="hero-title-span">Aprende con Nosotros</span>
          </h1>
          <p>
            Prepárate para la universidad con cursos en línea especializados y
            recursos interactivos de calidad.
          </p>

          <button className="btn btn--white" onClick={() => toggleModal()}>
            Iniciar ahora
          </button>
        </section>

        <section className="goals">
          <ul className="container-content">
            <h3>¿Porque funciona {bussinesName} ?</h3>
            <li className="goals-card">
              <div className="goals-card-icon">
                <FcFlowChart size={50} />
              </div>
              <h4>Aprende a tu ritmo</h4>
              <p>
                Con acceso 24/7 a nuestros cursos y recursos, puedes organizar
                tu tiempo de estudio según tus necesidades. ¡Tú decides cuándo y
                cómo aprender!
              </p>
            </li>

            <li className="goals-card">
              <div className="goals-card-icon">
                <FcGlobe size={50} />
              </div>
              <h4>Acceso ilimitado</h4>
              <p>
                Tendrás acceso constante a clases grabadas, guías de estudio,
                ejercicios, y mucho más. Todo lo que necesitas estará a tu
                disposición en cualquier momento.
              </p>
            </li>

            <li className="goals-card">
              <div className="goals-card-icon">
                <FcOnlineSupport size={50} />
              </div>
              <h4>Repasos y consultas ilimitadas</h4>
              <p>
                ¿Tienes dudas? Nuestros profesores estarán disponibles para
                responder a todas tus preguntas, con consultas ilimitadas para
                que no te quedes con ninguna duda.
              </p>
            </li>

            <li className="goals-card">
              <div className="goals-card-icon">
                <FcSurvey size={50} />
              </div>
              <h4>Ejercitación constante</h4>
              <p>
                {bussinesName} te ofrece ejercicios y simulacros de examen para
                que pongas a prueba tus conocimientos y refuerces lo que has
                aprendido. La práctica te hará sentir más seguro y preparado.
              </p>
            </li>

            <li className="goals-card">
              <div className="goals-card-icon">
                <FcVideoCall size={50} />
              </div>
              <h4>Clases en vivo complementarias</h4>
              <p>
                Además de las capsulas grabadas, ofrecemos clases en vivo con
                nuestros profesores, donde puedes participar, hacer preguntas en
                tiempo real y reforzar los temas más importantes.
              </p>
            </li>
          </ul>
        </section>

        <Carousel />

        <div className="start-now-bg">
          <section className="start-now container-content">
            <h3 className="start-now-title">¡Comienza tu preparación hoy!</h3>
            <span className="text-center">
              <FcPositiveDynamic size={50} />
            </span>
            <p className="start-now-parrafo">
              Dedicados a proporcionar contenido educativo de calidad,
              preparando a los estudiantes para la universidad.
            </p>
            <button className="btn btn--secondary" onClick={() => toggleModal()}>
              Comienza a estudiar gratis
            </button>
            <span className="start-now-parrafo">
              *solo necesitas un correo electronico
            </span>
          </section>
        </div>
      </div>
      <RegistrerModal isOpen={isOpen} toggleModal={toggleModal} />
      <Footer />
    </div>
  );
}
