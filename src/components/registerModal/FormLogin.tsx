import { useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { requiredMessage } from "../../utilities/messagesError";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { APISERVICE, setToken } from "../../service/api.service";
import { Spinner } from "react-bootstrap";
import { encryptString } from "../../utilities/utilities";
import { setCookie } from "../../utilities/cookies";
const APIKEY = import.meta.env.VITE_REACT_KEY
interface InputValues {
  email: string;
  password: string;
}
function FormLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const yupSchema = Yup.object().shape({
    email: Yup.string().required(requiredMessage),
    password: Yup.string().required(requiredMessage),
  });
  const handleSend = async (values: InputValues) => {
    if(loading) return

    try {
      setError("");
      setLoading(true);
      const url = "usuario/login-user";
      const response = await APISERVICE.post(values, url, "");
      if (response.success) {

        const infoUser = {
          accessToken: response.accessToken,
          id: response.id,
          subscribed: response.subscribed,
          image: response.image,
          name: response.name
        }
        const tokenEncrypt = encryptString(JSON.stringify(infoUser), APIKEY);
        setCookie("token", tokenEncrypt, 2);
        setToken(response.accessToken)
        navigate(`/${PrivateRoutes.RUTAS}`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
 
  };

  return (
    <div>
      <p>O usa tu correo electronico</p>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: InputValues) => handleSend(values)}
        validationSchema={yupSchema}
      >
        <Form className="register-modal-form">
          <label htmlFor="email">Correo Electronico</label>
          <Field name="email" type="email" placeholder="Correo Electronico" />
          <ErrorMessage name="email" component="div" className="f-error" />
          <label htmlFor="contrasenia">Contraseña</label>
          <Field name="password" type="password" placeholder="Contraseña" />
          <ErrorMessage name="password" component="div" className="f-error" />
          <button className="f-btn" type="submit">
            {
              loading ? <Spinner animation="border" variant="dark" size="sm" /> : "Iniciar Sesion"
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

export default FormLogin;
