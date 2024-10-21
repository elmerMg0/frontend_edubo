import { useForm } from "react-hook-form";
import { FormField } from "../FormField/FormField";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { APISERVICE, setToken } from "../../service/api.service";
import { encryptString } from "../../utilities/utilities";
import { setCookie } from "../../utilities/cookies";
import { useNavigate } from "react-router";
const APIKEY = import.meta.env.VITE_REACT_KEY;
interface FormData {
  username: string;
  nombre: string;
  apellidos: string;
  phone: string;
  email: string;
}
interface Props {
  userInfo: User | null;
}

function UserInfoAuth({ userInfo }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const user = useSelector((state: AppStore) => state.user);
  const [image, setImage] = useState< File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const { username, email, image, name, apellido, telefono } = userInfo;
      setImagePreview(
        image ||
          "https://g-57xus4pgoef.vusercontent.net/placeholder.svg?height=200&width=200"
      );
      setValue("username", username);
      setValue("email", email);
      setValue("nombre", name);
      setValue("apellidos", apellido);
      setValue("phone", telefono);
    }
  }, [userInfo]);

  const onSubmit = handleSubmit(async (data: FormData) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      ...data,
      token: user.accessToken,
    }));
    if (imagePreview) {
      formData.append("image", image as File);
    }
    const response: any = await APISERVICE.posWithImage(formData, "usuario/update",'');
    if (response.success) {
      const tokenEncrypt = encryptString(JSON.stringify(response.data), APIKEY);
      setCookie("token", tokenEncrypt, 7);  
      setToken(response.accessToken);
      navigate(`/${response.data.username}`);
    }
  });

  return (
    <main className="user-info">
      <aside className="user-img-content">
        <div className="user-info-img">
          <img src={imagePreview} alt="" />
          <label className="edit-user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              data-id="7"
            >
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                data-id="8"
              ></path>
              <polyline points="17 8 12 3 7 8" data-id="9"></polyline>
              <line x1="12" x2="12" y1="3" y2="15" data-id="10"></line>
            </svg>
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <p>Haz clic en el icono para cambiar tu foto de perfil</p>
      </aside>

      <div className="user-info-form">
        <h5>Tus datos</h5>
        <form onSubmit={onSubmit}>
          <FormField
            label="Username"
            name="username"
            type="text"
            register={register}
            errors={errors}
            validations={{}}
          />

          <FormField
            type="text"
            label="Nombre"
            name="nombre"
            register={register}
            errors={errors}
          />

          <FormField
            type="text"
            name="apellido"
            label="Apellidos"
            register={register}
            errors={errors}
          />

          <FormField
            type="text"
            name="telefono"
            label="Telefono"
            register={register}
            errors={errors}
          />

          <FormField
            type="email"
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />

          <button type="submit" className="f-btn btn-user-save btn--padding">
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
}

export default UserInfoAuth;
