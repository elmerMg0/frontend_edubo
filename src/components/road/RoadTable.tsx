import { Table } from "react-bootstrap";
import UserTableRow from "./RoadTableRow";
import { ThTable } from "../global/pagination/ThTable";
import Pagination from "../global/pagination/Pagination";
import { PageInfo, Road } from "../../models/models";

interface Props {
  roads: Road[],
  getUsers: (page: number, nameFilter: string) => void,
  deleteRoad: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function UserTable({
  roads,
  getUsers,
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
              <ThTable name='Nombre' borTopLefRad={10} />
              <ThTable name='Tipo' />
              <ThTable name='Estado' />
              <ThTable name='Accion' borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {roads?.length > 0 ? (
              roads.map((road) => (
                <UserTableRow
                  key = {road.id}
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
                  <Pagination pageInfo={pageInfo} getData={getUsers} />
            }
        </div>
    </>
  );
}
