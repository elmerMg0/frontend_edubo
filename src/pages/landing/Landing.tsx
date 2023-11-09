import { Header } from '../../components/landing/Header'
import './landing.css'
import { Carousel } from '../../components/landing/Carousel'
import { Footer } from '../../components/global/footer/Footer'
import { RegistrerModal } from '../../components/registerModal/RegisterModal'
import { FcIcons8Cup } from 'react-icons/fc'
import { useState } from 'react'
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
                <h1 className='hero-content-title'>Tu Puerta a la Universidad: <span>
                    Aprende e Ingresa con Nosotros
                </span>
                </h1>
                <p className='hero-content-parrafo'>
                Prepárate para la universidad con cursos en línea especializados y recursos interactivos de calidad.
                </p>

                <button className='f-btn btn--get-start'>Iniciar ahora</button>
            </section>

            <section className='goals'>
                <p className='goals-title'>¿Porque funciona edubo ?</p>
                <div className='goals-card'>
                    <div className='goals-card-icon'>
                        <FcIcons8Cup size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Personalized learning</h4>
                    <p className='goals-card-parrafo'>Students practice at their own pace, first filling in gaps in their understanding and then accelerating their learning.</p>
                </div>

                <div className='goals-card'>
                   <div className='goals-card-icon'>
                        <FcIcons8Cup size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Trusted content</h4>
                    <p className='goals-card-parrafo'>Created by experts, Khan Academy’s library of trusted practice and lessons covers math, science, and more. Always free for learners and teachers. </p>
                </div>

                <div className='goals-card'>
                    <div className='goals-card-icon'>
                        <FcIcons8Cup size={50}/>
                    </div>
                    <h4 className='goals-card-title'>Tools to emppover teachers</h4>
                    <p className='goals-card-parrafo'>With Khan Academy, teachers can identify gaps in their students’ understanding, tailor instruction, and meet the needs of every student.</p>
                </div>

            </section>

            <Carousel/>

            <section className='start-now'>
                <h2 className='start-now-title'>No postergues más tu educación, ¡tu futuro te está esperando!</h2>
                <p className='start-now-parrafo'>Un nuevo empleo, mejor salario, mayor calidad de vida, ¡todo lo puedes conseguir con educación! Es el momento de lograr lo que siempre has querido.</p>
                <div>
                    <button className='f-btn btn--get-start mb-2'>Comienza a estudiar gratis</button>
                    <span className='start-now-parrafo'>*solo necesitas un correo electronico</span>
                </div>
            </section>

            <RegistrerModal isOpen={isOpen} toggleModal={toggleModal}/>
            
            <Footer/>
        </div>
    )

}