import defaultPhoto from "../../../assets/img/fotoDeault.webp";
import { colors } from "../../../utilities/constans";
import { EditIconGlobal, TrashIconGlobal } from "../../global/icons/IconsGlobal";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
export default function UserTableRow({
  user,
  deleteUser,
  setUserUpdate,
  setModalShow,
}) {
  return (
    <>
      <tr>
        <td className="col-5">{user.nombres}</td>
        <td className="col-4">{user.tipo}</td>
        <td className="img-user-row">
          <div style={{ width: "55px" }}>
            {user.url_image ? (
              <img src={`${APIURLIMG}${user.url_image}`} alt="foto user" />
            ) : (
              <img src={defaultPhoto} alt="foto default"/>
            )}
          </div>
        </td>
        <td className="user-state">
          {user.estado === "Activo" ? (
            <button className="btn-main-green">{user.estado}</button>
          ) : (
            <button className="btn-main-red">{user.estado}</button>
          )}
        </td>
        <td className="col-2 text-center">
          <button
            className="btn-main btn-main-icon"
            onClick={() => {
              setModalShow(true);
              setUserUpdate(user);
            }}
          >
            {/* <img src={edit} alt="icon-edit" />{" "} */}
            <EditIconGlobal/>
          </button>{" "}
          <button onClick={() => deleteUser(user.id)} className="btn-main-red btn-main-red-icon">
            <TrashIconGlobal/>
          </button>
        </td>
      </tr>
    </>
  );
}
