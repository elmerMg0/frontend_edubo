import { Table } from "react-bootstrap";
import { ThTable } from "../global/pagination/ThTable";
import Pagination from "../global/pagination/Pagination";
import { Class, PageInfo } from "../../models/models";
import ClassTableRow from "./ClassTableRow";

interface Props {
classes: Class[],
  getCourses: (page: number, nameFilter: string) => void,
  deleteRoad: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function ClassTable({
  classes,
  getCourses,
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
              <ThTable name='Titulo' borTopLefRad={10} />
              <ThTable name='Descripcion' />
              <ThTable name='Duracion' />
              <ThTable name='Nivel' />
              <ThTable name='Estado' />
              <ThTable name='Accion' justifycontent="center" borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {classes?.length > 0 ? (
              classes.map((classValue) => (
                <ClassTableRow
                  key = {crypto.randomUUID()}
                  classValue = {classValue}
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
           {classes?.length > 0 &&
                  <Pagination pageInfo={pageInfo} getData={getCourses} />
            }
        </div>
    </>
  );
}
