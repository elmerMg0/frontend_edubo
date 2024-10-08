import "./registerModal.css";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { APISERVICE, setToken } from "../../service/api.service";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import { useState } from "react";
import { encryptString } from "../../utilities/utilities";
import { setCookie } from "../../utilities/cookies";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/states/user.state";
import toast from "react-hot-toast";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logIn = async (access_token: string) => {
    const url = "usuario/login";
    const idToast = toast.loading("Iniciando sesión");
    const response = await APISERVICE.post(
      { access_token, type: "student" },
      url,
      ""
    );
    if (response.success) {
      const infoUser = {
        accessToken: response.data.accessToken,
        id: response.data.id,
        subscribed: response.data.subscribed,
        image: response.data.image,
        name: response.data.name,
      };
      toast.success("Login exitoso", { id: idToast });
      const tokenEncrypt = encryptString(JSON.stringify(infoUser), APIKEY);
      setCookie("token", tokenEncrypt, 2);
      setToken(response.data.accessToken);
      navigate(`/${PrivateRoutes.RUTAS}`);
      dispatch(updateUser(response.data));
    } else {
      toast.error("Error al iniciar sesión", { id: idToast });
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
        <div className="register-modal-main">
          <h5>{view === views.login ? "Iniciar Sesión" : "Registrate gratis"}</h5>
          <div className="register-modal-social">
            <button className="btn" onClick={() => loginGoogle()}>
              <FcGoogle />
              Google
            </button>

            {/*   <button className="f-btn w-100" >
             <BsFacebook />
              Facebook
            </button> */}
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
                onClick={() => {
                  setView(views.login);
                }}
              >
                {" "}
                Inicia sesión
              </span>
            </p>
          ) : (
            <p className="register-modal-parrafo">
              ¿No tienes una cuenta?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView(views.signup);
                }}
              >
                {" "}
                Registrate gratis
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
