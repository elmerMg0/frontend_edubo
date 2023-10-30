import { useContext } from "react";
import { Road } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextRoad, CreateContextType } from "./RoadContext";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { useDispatch } from "react-redux";
import { createRoad } from "../../redux/states/road.state";

interface Props{
  road: Road
}
export default function UserTableRow({
  road,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext<CreateContextType | null>(ContextRoad);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(!contextValue)return 

  const { setRoadToUpdate, setShowModal } = contextValue
  
  const handleCourses = () => {
    dispatch(createRoad(road));
    navigate(`/${PrivateRoutes.COURSE}`)
    }
  
  return (
    <>
      <tr>
        <td className="">
          <button className="f-btn btn--minwidth btn--main" style={{whiteSpace: 'nowrap'}} onClick={handleCourses}>Ver Cursos</button>
        </td>
        <td className="">{road.nombre}</td>
        <td className="">{road.descripcion}</td>
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
