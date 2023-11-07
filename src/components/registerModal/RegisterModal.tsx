import './registerModal.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Field, Formik } from 'formik'
interface InputValues {
    email: string,
    password: string
}

const handleSend = (values: InputValues) => {

}
export function RegistrerModal(){
    return(
        <section className='bg-modal'>
            <div className='register-modal'>
                <div className='register-modal-top'>

                    <p className='register-modal-title'>Iniciar Sesion</p>
                    <div className='register-modal-social'>
                        <button className='f-btn'>
                            <span>
                                <FcGoogle/>
                                Google                        
                            </span>
                        </button>
                        <button className='f-btn'>
                            <span>
                                <BsFacebook/>
                                Facebook                        
                            </span>
                        </button>
                    </div>

                    <hr />
                    <p>O usa tu correo electronico</p>
                    <Formik initialValues={{email: '', password: ''}} 
                        onSubmit={(values: InputValues) => handleSend(values)}
                        >
                        <form className='register-modal-form'>
                            <label htmlFor="email">Correo Electronico</label>
                            <Field name="email" type="email" placeholder="Correo Electronico"/>
                            <label htmlFor="contrasenia">Contrasenia</label>
                            <Field name="password" type="password" placeholder="Contrasenia"/>
                            <button className='f-btn' type='submit'>Iniciar Sesion</button>
                        </form>
                    </Formik>
                </div>
                <div className='register-modal-signup'>
                    <p className='register-modal-parrafo'>No tienes una cuenta?  <span> Registrate gratis </span>
                    </p>
                </div>
            </div>
        </section>
    )
}