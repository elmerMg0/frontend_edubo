import { Table } from "react-bootstrap";
import UserTableRow from "./RoadTableRow";
import { ThTable } from "../global/pagination/ThTable";
import Pagination from "../global/pagination/Pagination";
import { PageInfo, Road } from "../../models/models";

interface Props {
  roads: Road[],
  getRoads: (page: number, nameFilter: string) => void,
  deleteRoad: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function UserTable({
  roads,
  getRoads,
  deleteRoad,
  pageInfo,
  /*setUserUpdate,
  setModalShow,
  loading */
}: Props) {
  return (
    <>
        <Table responsive>
          <thead >
            <tr>
              <ThTable name='Cursos' borTopLefRad={10} />
              <ThTable name='Nombre' />
              <ThTable name='Descripcion' />
              <ThTable name='Estado' />
              <ThTable name='Accion' justifycontent="center" borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {roads?.length > 0 ? (
              roads.map((road) => (
                <UserTableRow
                  key = {crypto.randomUUID()}
                  road = {road}
                 /*  deleteRoad = {deleteRoad}
                  setUserUpdate = {setUserUpdate}
                  setModalShow = {setModalShow} */
                />
              ))
            ) : (
              <tr>
               {/*  <td colSpan={5}>{
                  !loading && "No existen usuarios aun!"
                  }
                  </td> */}
              </tr>
            )}
          </tbody>
        </Table>
        <div className="mt-2">
           {roads?.length > 0 &&
                  <Pagination pageInfo={pageInfo} getData={getRoads} />
            }
        </div>
    </>
  );
}