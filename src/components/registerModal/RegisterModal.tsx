import "./registerModal.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useGoogleLogin } from "@react-oauth/google";
import { APISERVICE } from "../../service/api.service";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { useState } from "react";
import { encryptString } from "../../utilities/utilities";
import { setCookie } from "../../utilities/cookies";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";

const APIKEY = import.meta.env.VITE_REACT_KEY;

  
interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}
const views = {
  login: "login",
  signup: "signup",
};

export function RegistrerModal({ isOpen, toggleModal }: Props) {
  const [view, setView] = useState(views.login);

  const navigate = useNavigate();

  const logIn = async (access_token: string) => {
    const url = "usuario/login";
    const response = await APISERVICE.post({ access_token }, url, "");
    if (response) {
      /* get credencialt para el user */
      /* Encrypt token */
      const tokenEncrypt = encryptString(response.data.accessToken, APIKEY);
      setCookie("token", tokenEncrypt, 2);
      setCookie("userId", response.data.id, 2);
      navigate(`${PrivateRoutes.RUTAS}`);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      logIn(codeResponse.access_token);
    },
    onError: (error) => {
      console.log("Login Failed", error);
    },
  });

  const forms: Record<string, React.ReactNode> = {
    login: <FormLogin />,
    signup: <FormSignUp />,
  };

  const CurrentView: React.ReactNode = forms[view];
  return (
    <section className={`bg-modal ${isOpen ? "active" : ""}`}>
      <div
        className="modal-backdrop2"
        onClick={() => {
          toggleModal();
        }}
      />
      <div className="register-modal">
        <div className="register-modal-top">
          <p className="register-modal-title">
            {view === views.login ? "Iniciar Sesión" : "Registrate gratis"}
          </p>
          <div className="register-modal-social">
            <button className="f-btn" onClick={() => loginGoogle()}>
              <FcGoogle />
              Google
            </button>
      
       
            <button className="f-btn w-100" style={{display: 'none'}}>
             <BsFacebook />
              Facebook
            </button>
            
          </div>

          <hr />

          {CurrentView}
        </div>

        <div className="register-modal-signup">
          {view === views.signup ? (
            <p className="register-modal-parrafo">
               ¿Ya tienes una cuenta?{" "}
               <span
                 style={{ cursor: "pointer" }}
                 onClick={() => {setView(views.login)}}
               > Inicia sesión
               </span>
             </p>
          ) : (
            <p className="register-modal-parrafo">
              ¿No tienes una cuenta?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {setView(views.signup)}}
              > Registrate gratis
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
