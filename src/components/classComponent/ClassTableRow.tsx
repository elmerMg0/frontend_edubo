import { useContext } from "react";
import { Class } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextClass, ContextClassType } from "./ClassComponent";

interface Props{
  classValue: Class
}
export default function ClassTableRow({
  classValue,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext< ContextClassType | null>(ContextClass);
  const {titulo, descripcion, duracion, active, numero_clase} = classValue;
  if(!contextValue)return 
  const { setClassToUpdate, setShowModal } = contextValue
  return (
    <>
      <tr>
        <td className="col-5">{titulo}</td>
        <td className="col-4">{descripcion}</td>
        <td className="col-4">{duracion}</td>
        <td className="col-4">{numero_clase}</td>
        <td className="road-state">
          <button className={`${active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{active? 'Activo': 'Inactivo'}</button>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setClassToUpdate(classValue);
            }}
          >
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
