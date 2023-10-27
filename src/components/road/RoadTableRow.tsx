import { Road } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";

interface Props{
  road: Road
}
export default function UserTableRow({
  road,
  /* deleteUser, */
 /*  setUserUpdate */
 /*  setModalShow, */
}: Props) {
  return (
    <>
      <tr>
        <td className="col-5">{road.nombre}</td>
        <td className="col-4">{road.descripcion}</td>
        <td className="road-state">
          <button className={`${road.active ? "btn-main-green": 'btn-main-red'}`}>{road.active}</button>
        </td>
        <td className="col-2 text-center">
          <button
            className="btn btn-main"
            onClick={() => {
              /* setModalShow(true);
              setroadUpdate(road); */
            }}
          >
            {/* <img src={edit} alt="icon-edit" />{" "} */}
            <EditIconGlobal />
          </button>{" "}
          <button /* onClick={() => deleteroad(road.id)} */ className="btn-red">
            <TrashIconGlobal/>
          </button>
        </td>
      </tr>
    </>
  );
}
