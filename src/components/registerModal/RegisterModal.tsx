import './registerModal.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup';

import { requiredMessage } from '../../utilities/messagesError';
import { useGoogleLogin } from '@react-oauth/google';
import { APISERVICE } from '../../service/api.service';
import { useNavigate } from 'react-router';
import { PrivateRoutes } from '../../models/routes';
import { useState } from 'react';
import { encryptString } from '../../utilities/utilities';
import { setCookie } from '../../utilities/cookies';
interface InputValues {
    email: string,
    password: string
}

interface Props{
    isOpen: boolean,
    toggleModal: () => void
}


export function RegistrerModal({isOpen, toggleModal }:Props){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const navigate = useNavigate();
    const handleSend = async (values: InputValues) => {
        setError('')
        setLoading(true)
        const url = 'usuario/login-user'
        const response = await APISERVICE.post(values, url, '')
        if(response.success){
            navigate(`${PrivateRoutes.RUTAS}`)
        }else{  
            setError(response.message);
        }
        setLoading(false)
        loading;
    }


    const logIn = async (access_token: string) => {
        const url = 'usuario/login'
        const response = await APISERVICE.post({access_token}, url, '')
        if(response ){
          /* get credencialt para el user */
          /* Encrypt token */
          const tokenEncrypt = encryptString(response.data.accessToken, 'a')
          setCookie('token', tokenEncrypt, 2)
          setCookie('userId', response.data.id, 2)
          //document.cookie = 'token=' + tokenEncrypt;
          navigate(`${PrivateRoutes.RUTAS}`)
          console.group(response)
        }
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            logIn(codeResponse.access_token)
        },
        onError: (error) => {
            console.log('Login Failed', error);
        }
    })

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
                        <button className='f-btn' onClick={() => loginGoogle()}>
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
                            {error !== '' && <p style={{textAlign: 'center'}} className='f-error'>{error}</p>}
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