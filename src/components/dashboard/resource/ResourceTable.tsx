import { Table } from "react-bootstrap";
import { ThTable } from "../../global/pagination/ThTable";
import Pagination from "../../global/pagination/Pagination";
import { Resource, PageInfo } from "../../../models/models";
import ResourceTableRow from "./ResourceTableRow";

interface Props {
  resources: Resource[],
  getResources: (page: number, nameFilter: string) => void,
  deleteRoad: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function ResourceTable({
  resources,
  getResources,
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
              <ThTable name='Descripicon' borTopLefRad={10} />
              <ThTable name='Url video' />
              <ThTable name='Estado' />
              <ThTable name='Accion' justifycontent="center" borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {resources?.length > 0 ? (
              resources.map((Resource) => (
                <ResourceTableRow
                  key = {crypto.randomUUID()}
                  resource = {Resource}
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
           {resources?.length > 0 &&
                  <Pagination pageInfo={pageInfo} getData={getResources} />
            }
        </div>
    </>
  );
}
