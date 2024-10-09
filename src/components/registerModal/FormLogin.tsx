import { useState } from "react";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { APISERVICE, setToken } from "../../service/api.service";
import { Spinner } from "react-bootstrap";
import { encryptString } from "../../utilities/utilities";
import { setCookie } from "../../utilities/cookies";
import { FormField } from "../FormField/FormField";
import { useForm } from "react-hook-form";
const APIKEY = import.meta.env.VITE_REACT_KEY;
interface FormData {
  email: string;
  password: string;
}
function FormLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const handleSend = handleSubmit(async (values) => {
    if (loading) return;

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
      setError("Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <p>O usa tu correo electronico</p>

      <form className="register-modal-form" onSubmit={handleSend}>
        <FormField
          name="email"
          type="email"
          placeholder="Correo Electronico"
          register={register}
          errors={errors}
          label="Email"
        />
        <FormField
          name="password"
          type="password"
          placeholder="Contraseña"
          register={register}
          errors={errors}
          label="Contraseña"
        />
        <button className="btn btn--white btn-login" type="submit">
          {loading ? (
            <Spinner animation="border" variant="dark" size="sm" />
          ) : (
            "Iniciar Sesion"
          )}
        </button>
        {error !== "" && (
          <p className="f-error text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default FormLogin;
