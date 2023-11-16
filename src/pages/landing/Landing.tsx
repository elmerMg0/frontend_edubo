import { Header } from '../../components/landing/Header'
import './landing.css'
import { Carousel } from '../../components/landing/Carousel'
import { Footer } from '../../components/global/footer/Footer'
import { RegistrerModal } from '../../components/registerModal/RegisterModal'
import { FcFlowChart, FcGlobe, FcIcons8Cup, FcPositiveDynamic } from 'react-icons/fc'
import { useState } from 'react'
import { bussinesName } from '../../utilities/constans'
export function Landing() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className='landing'>
            <Header>
                <div className="header-landing__sign">
                    <button className="f-btn btn--padding btn--l-white" onClick={()=>toggleModal()}>Registrarse</button>
                </div>
            </Header>
            <section className='hero-content'>
                {/*  <h1>"Tu Éxito Académico Comienza con Nosotros</h1> */}
                <h1 className='hero-content-title'>Tu viaje hacia la universidad comienza aquí.<span>
                    Aprende con Nosotros
                </span>
                </h1>
                <p className='hero-content-parrafo'>
                Prepárate para la universidad con cursos en línea especializados y recursos interactivos de calidad.
                </p>

                <button className='f-btn btn--get-start' onClick={()=>toggleModal()}>Iniciar ahora</button>
            </section>

            <section className='goals'>
                <p className='goals-title'>¿Porque funciona edubo ?</p>
                <div className='goals-card'>
                    <div className='goals-card-icon'>
                        <FcFlowChart size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Flexibilidad de Aprendizaje</h4>
                    <p className='goals-card-parrafo'>La educación en línea permite a los estudiantes aprender a su propio ritmo, adaptándose a velocidades individuales y estilos de aprendizaje</p>
                </div>

                <div className='goals-card'>
                   <div className='goals-card-icon'>
                      <FcGlobe size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Acceso Continuo y Ubicuo</h4>
                    <p className='goals-card-parrafo'>Disponible las 24 horas, los 7 días de la semana, la educación en línea elimina barreras geográficas y de tiempo, brindando acceso constante y flexible desde cualquier ubicación.</p>
                </div>

                <div className='goals-card'>
                    <div className='goals-card-icon'>
                        <FcPositiveDynamic size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Aprendizaje Interactivo y Personalizado</h4>
                    <p className='goals-card-parrafo'>Recursos interactivos en línea catapultan la participación activa. Multimedia y simulaciones no solo hacen el aprendizaje atractivo, sino que se adaptan a diversos estilos de aprendizaje de manera personalizada.</p>
                </div>

            </section>

            <Carousel/>

            <section className='start-now'>
                <h2 className='start-now-title'>No postergues más tu educación, ¡tu futuro te está esperando!</h2>
                <p className='start-now-parrafo'>Dedicados a proporcionar contenido educativo de calidad, preparando a los estudiantes para la universidad.</p>
                <div>
                    <button className='f-btn btn--get-start mb-2' onClick={()=>toggleModal()}>Comienza a estudiar gratis</button>
                    <span className='start-now-parrafo'>*solo necesitas un correo electronico</span>
                </div>
            </section>

            <RegistrerModal isOpen={isOpen} toggleModal={toggleModal}/>
            
            <Footer/>
        </div>
    )

}