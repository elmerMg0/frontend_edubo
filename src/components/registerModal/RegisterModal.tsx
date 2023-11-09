import './registerModal.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup';
import { requiredMessage } from '../../utilities/messagesError';
interface InputValues {
    email: string,
    password: string
}

interface Props{
    isOpen: boolean,
    toggleModal: () => void
}


export function RegistrerModal({isOpen, toggleModal }:Props){

    const handleSend = (values: InputValues) => {
        console.log(values);
    }

    const yupSchema = Yup.object().shape({
        email: Yup.string().
                required(requiredMessage),
        password: Yup.string().
                required(requiredMessage),
    })

    return(
        <section className={`bg-modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-backdrop2" onClick={()=>{toggleModal()}}/>
            <div className='register-modal'>    
                <div className='register-modal-top'>

                    <p className='register-modal-title'>Iniciar Sesion</p>
                    <div className='register-modal-social'>
                        <button className='f-btn' >
                                <FcGoogle/>
                                Google                        
                        </button>
                        <button className='f-btn'>
                                <BsFacebook/>
                                Facebook                        
                        </button>
                    </div>

                    <hr />
                    <p>O usa tu correo electronico</p>
                    <Formik 
                        initialValues={{email: '', password: ''}} 
                        onSubmit={(values: InputValues) => handleSend(values)}
                        validationSchema={yupSchema}
                        >
                        <Form className='register-modal-form'>
                            <label htmlFor="email">Correo Electronico</label>
                            <Field name="email" type="email" placeholder="Correo Electronico"/>
                            <ErrorMessage name="email" component="div" className='f-error' />
                            <label htmlFor="contrasenia">Contrasenia</label>
                            <Field name="password" type="password" placeholder="Contrasenia"/>
                            <ErrorMessage name="password" component="div" className='f-error' />
                            <button className='f-btn' type='submit'>Iniciar Sesion</button>
                        </Form>
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