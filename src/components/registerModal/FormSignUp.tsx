import { ErrorMessage, Field, Form, Formik } from "formik";
import { requiredMessage } from "../../utilities/messagesError";
import * as Yup from 'yup';
import { useState } from "react";
import { APISERVICE, setToken } from "../../service/api.service";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { Spinner } from "react-bootstrap";
import { setCookie } from "../../utilities/cookies";
import { encryptString } from "../../utilities/utilities";
interface InputValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
const APIKEY = import.meta.env.VITE_REACT_KEY

function FormSignUp() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSend = async (values: InputValues) => {
        setError('')
        setLoading(true)
        try {
            /* Register user with API */
            const body = {
                ...values,
                type: 'student'
            }
            const response: any = await APISERVICE.post(body, 'usuario/register', '');
            if(response.success){
              const infoUser = {
                accessToken: response.accessToken,
                id: response.id,
                subscribed: response.subscribed
              }
              const tokenEncrypt = encryptString(JSON.stringify(infoUser), APIKEY);
              setCookie('token', tokenEncrypt, 2) 
              setToken(response.data.accessToken)
              navigate(PrivateRoutes.RUTAS)
            }
        } catch (error) {
            setError('Ocurrio un error, intente de nuevo')            
        } finally{
            setLoading(false)
        }
    }
    
    const yupSchema = Yup.object().shape({
        email: Yup.string().
                required(requiredMessage),
        password: Yup.string().
                required(requiredMessage),
        firstName: Yup.string().required(requiredMessage),
        lastName: Yup.string().required(requiredMessage)
    })

  return (
    <div>
        <p>Crea tu cuenta</p>
      <Formik
        initialValues={{ email: "", password: "" , firstName: "", lastName: ""}}
        onSubmit={(values: InputValues) => handleSend(values)}
        validationSchema={yupSchema}
        enableReinitialize={true}
        >
        <Form className="register-modal-form">

        <div className="d-flex gap-3 align-items-start">
            <div className="mb-3">
              <Field name="firstName" type="text" placeholder="Nombre" className="w-100"/>
              <ErrorMessage name="firstName" component="div" className="f-error" />
            </div>
            <div className="mb-3">
              <Field name="lastName" type="text" placeholder="Apellido" className="w-100" />
              <ErrorMessage name="lastName" component="div" className="f-error" />
            </div>
        </div>
            <div className="mb-3">
                <Field  name="email" type="email" placeholder="Correo Electró nico" className="w-100"/>
                <ErrorMessage name="email" component="div" className="f-error" />
            </div>
          <div className="mb-3">
            <Field className='w-100' name="password" type="password" placeholder="Contraseña" />
             <ErrorMessage name="password" component="div" className="f-error" />
          </div>
          
          <p style={{ fontSize: "13px", textAlign: "center", margin: "0", color: "gray" }}>
            Al registrarte aceptas <a style={{textDecoration: "underline", color: "white"}}>Términos de Servicio y Políticas de privacidad</a>
          </p>

    
          <button className="f-btn" type="submit">
            {
              loading ? <Spinner animation="border" variant="dark" size="sm" /> : "Registrarte ahora"
            }
          </button>
          {error !== "" && (
            <p style={{ textAlign: "center" }} className="f-error">
              {error}
            </p>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default FormSignUp;
