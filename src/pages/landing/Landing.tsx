import { Header } from "../../components/global/header/Header";
import "./landing.css";
import { Carousel } from "../../components/landing/Carousel";
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
            className="f-btn btn--padding btn--l-white"
            onClick={() => toggleModal()}
          >
            Registrarse
          </button>
        </div>
      </Header>
      <div className="landing">
        <section className="hero-content">
          {/*  <h1>"Tu Éxito Académico Comienza con Nosotros</h1> */}
          <h1 className="hero-content-title">
            Tu viaje hacia la universidad comienza aquí.
            <span>Aprende con Nosotros</span>
          </h1>
          <p className="hero-content-parrafo">
            Prepárate para la universidad con cursos en línea especializados y
            recursos interactivos de calidad.
          </p>

          <button
            style={{ maxWidth: "250px" }}
            className="f-btn btn--get-start"
            onClick={() => toggleModal()}
          >
            Iniciar ahora
          </button>
        </section>

        <section className="goals">
          <div className="goals-container">
            <p className="goals-title">¿Porque funciona {bussinesName} ?</p>
            <div className="goals-card">
              <div className="goals-card-icon">
                <FcFlowChart size={50} />
              </div>
              <h4 className="goals-card-title">Aprende a tu ritmo</h4>
              <p className="goals-card-parrafo">
                Con acceso 24/7 a nuestros cursos y recursos, puedes organizar
                tu tiempo de estudio según tus necesidades. ¡Tú decides cuándo y
                cómo aprender!
              </p>
            </div>

            <div className="goals-card">
              <div className="goals-card-icon">
                <FcGlobe size={50} />
              </div>
              <h4 className="goals-card-title">Acceso ilimitado</h4>
              <p className="goals-card-parrafo">
                Tendrás acceso constante a clases grabadas, guías de estudio,
                ejercicios, y mucho más. Todo lo que necesitas estará a tu
                disposición en cualquier momento.
              </p>
            </div>

            <div className="goals-card">
              <div className="goals-card-icon">
                <FcOnlineSupport size={50} />
              </div>
              <h4 className="goals-card-title">
                Repasos y consultas ilimitadas
              </h4>
              <p className="goals-card-parrafo">
                ¿Tienes dudas? Nuestros profesores estarán disponibles para
                responder a todas tus preguntas, con consultas ilimitadas para
                que no te quedes con ninguna duda.
              </p>
            </div>

            <div className="goals-card">
              <div className="goals-card-icon">
                <FcSurvey size={50} />
              </div>
              <h4 className="goals-card-title">Ejercitación constante</h4>
              <p className="goals-card-parrafo">
                {bussinesName} te ofrece ejercicios y simulacros de examen para
                que pongas a prueba tus conocimientos y refuerces lo que has
                aprendido. La práctica te hará sentir más seguro y preparado.
              </p>
            </div>

            <div className="goals-card">
              <div className="goals-card-icon">
                <FcVideoCall size={50} />
              </div>
              <h4 className="goals-card-title">
                Clases en vivo complementarias
              </h4>
              <p className="goals-card-parrafo">
                Además de las capsulas grabadas, ofrecemos clases en vivo con
                nuestros profesores, donde puedes participar, hacer preguntas en
                tiempo real y reforzar los temas más importantes.
              </p>
            </div>
          </div>
        </section>

        <div className="section-carousel-lg-container">
          <Carousel />
        </div>
        <div className="start-now-container">
          <section className="start-now">
            <h2 className="start-now-title">¡Comienza tu preparación hoy!</h2>
            <span className="text-center">
                <FcPositiveDynamic size={50}/>
            </span>
            <p className="start-now-parrafo">
              Dedicados a proporcionar contenido educativo de calidad,
              preparando a los estudiantes para la universidad.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                style={{ maxWidth: "300px" }}
                className="f-btn btn--get-start-wt mb-2"
                onClick={() => toggleModal()}
              >
                Comienza a estudiar gratis
              </button>
              <span className="start-now-parrafo">
                *solo necesitas un correo electronico
              </span>
            </div>
          </section>
        </div>
      </div>
      <RegistrerModal isOpen={isOpen} toggleModal={toggleModal} />
      <Footer />
    </div>
  );
}
