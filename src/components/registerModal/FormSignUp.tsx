import { requiredMessage } from "../../utilities/messagesError";
import { useState } from "react";
import { APISERVICE, setToken } from "../../service/api.service";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { Spinner } from "react-bootstrap";
import { setCookie } from "../../utilities/cookies";
import { encryptString } from "../../utilities/utilities";
import { FormField } from "../FormField/FormField";
import { useForm } from "react-hook-form";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const APIKEY = import.meta.env.VITE_REACT_KEY;

function FormSignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSend = handleSubmit(async (values) => {
    setError("");
    setLoading(true);
    try {
      /* Register user with API */
      const body = {
        ...values,
        type: "student",
      };
      const response: any = await APISERVICE.post(body, "usuario/register", "");
      if (response.success) {
        const infoUser = {
          accessToken: response.accessToken,
          id: response.id,
          subscribed: response.subscribed,
          image: response.image,
          name: response.name,
        };
        const tokenEncrypt = encryptString(JSON.stringify(infoUser), APIKEY);
        setCookie("token", tokenEncrypt, 2);
        setToken(response.accessToken);
        navigate(`/${PrivateRoutes.RUTAS}`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Ocurrio un error, intente de nuevo");
    } finally {
      setLoading(false);
    }
  });

  return (
    <section>
      <h5>Crea tu cuenta</h5>
      <form className="register-modal-form" onSubmit={handleSend}>
        <div className="register-modal-form-fields">
          <div>
            <FormField
              label="Nombre"
              name="firstName"
              type="text"
              placeholder="Nombre"
              register={register}
              errors={errors}
              validations={{ required: requiredMessage }}
            />
          </div>
          <div>
            <FormField
              label="Apellido"
              register={register}
              errors={errors}
              name="lastName"
              type="text"
              placeholder="Apellido"
              className="w-100"
              validations={{ required: requiredMessage }}
            />
          </div>
        </div>
        <div>
          <FormField
            label="Correo Electrónico"
            register={register}
            errors={errors}
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            className="w-100"
            validations={{ required: requiredMessage }}
          />
        </div>
        <div>
          <FormField
            label="Contraseña"
            register={register}
            errors={errors}
            validations={{ required: requiredMessage }}
            className="w-100"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
        </div>

        <span className="terms-text text-center">
          Al registrarte aceptas{" "}
          <a style={{ textDecoration: "underline", color: "white" }}>
            Términos de Servicio y Políticas de privacidad
          </a>
        </span>

        <button className="btn btn--white btn-login" type="submit">
          {loading ? (
            <Spinner animation="border" variant="dark" size="sm" />
          ) : (
            "Registrarte ahora"
          )}
        </button>
        {error !== "" && <p className="f-error">{error}</p>}
      </form>
    </section>
  );
}

export default FormSignUp;
