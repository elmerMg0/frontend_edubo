import { useContext } from "react";
import { Road } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextRoad, CreateContextType } from "./RoadContext";

interface Props{
  road: Road
}
export default function UserTableRow({
  road,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext<CreateContextType | null>(ContextRoad);

  if(!contextValue)return 

  const { setRoadToUpdate, setShowModal } = contextValue
  return (
    <>
      <tr>
        <td className="col-5">{road.nombre}</td>
        <td className="col-4">{road.descripcion}</td>
        <td className="road-state">
          <button className={`${road.active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{road.active? 'Activo': 'Inactivo'}</button>
        </td>
        <td className="col-2 text-center">
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setRoadToUpdate(road);
            }}
          >
            {/* <img src={edit} alt="icon-edit" />{" "} */}
            <EditIconGlobal />
          </button>{" "}
          <button /* onClick={() => deleteroad(road.id)} */ className="f-btn btn--red">
            <TrashIconGlobal/>
          </button>
        </td>
      </tr>
    </>
  );
}
