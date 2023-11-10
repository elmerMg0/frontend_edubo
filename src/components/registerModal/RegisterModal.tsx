import './registerModal.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup';

import { requiredMessage } from '../../utilities/messagesError';
import { useGoogleLogin } from '@react-oauth/google';
import { APISERVICE } from '../../service/api.service';
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

    const logIn = async (access_token: string) => {
        const url = 'usuario/login'
        const response = await APISERVICE.post({access_token}, url, '')
        console.log(response)
    }


    const getInfo = async (user) => {
        console.log(user)
        const params = `${user.access_token}`
        const data = await APISERVICE.getInfoUser(params)
        console.log(data)

        if(data){
          //setLoading(true)
          try {
            const url = 'usuario/login';
          const body = {
            username: data.email,
            password: data.email
          }
        /*   const body = {
            username: 'r.manchego@umss.edu',
            password: 'r.manchego@umss.edu'
          } */
          const { success, accessToken, rol, id, message} = await APISERVICE.post(url, '', body)
          if( success ){
           /*  const infoTeacher = {
              teacherInfo: {
                access_token: accessToken,
                rol: rol,
                id: id
              }
            }
            setToken(accessToken);
            dispatch(updateTeacherInfo(infoTeacher))
            dispatch(createUser(infoTeacher['teacherInfo']))
            navigate(`/${PrivateRoutes.HOMETEACHER}`) */
          }else{
            //mensaje de error
            //toast.error(message)
          }
          } catch (error) {
            //toast.error('Ocurrio un error')
          } finally{
            //setLoading(false);
          }
          
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