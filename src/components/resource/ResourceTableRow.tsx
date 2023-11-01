import { useContext } from "react";
import { Resource } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextResource, ContextResourceType } from "./Resource";

interface Props{
  resource: Resource
}
export default function ResourceTableRow({
  resource,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext< ContextResourceType | null>(ContextResource);

  if(!contextValue)return 
  const { setResourceToUpdate, setShowModal } = contextValue

  return (
    <>
      <tr>
        <td>{resource.descripcion}</td>
        <td >{resource.url_video}</td>
        <td >
          <button className={`${resource.active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{resource.active? 'Activo': 'Inactivo'}</button>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setResourceToUpdate(resource);
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
