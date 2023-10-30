import { Table } from "react-bootstrap";
import { ThTable } from "../global/pagination/ThTable";
import Pagination from "../global/pagination/Pagination";
import { Course, PageInfo, Road } from "../../models/models";
import CourseTableRow from "./CourseTableRow";

interface Props {
  courses: Course[],
  getCourses: (page: number, nameFilter: string) => void,
  deleteRoad: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function CourseTable({
  courses,
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
              <ThTable name='Nombre' borTopLefRad={10} />
              <ThTable name='Descripcion' />
              <ThTable name='Estado' />
              <ThTable name='Accion' justifycontent="center" borTopRigRad={10}/>
            </tr>
          </thead>
          <tbody>
            {courses?.length > 0 ? (
              courses.map((course) => (
                <CourseTableRow
                  key = {crypto.randomUUID()}
                  course = {course}
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
           {courses?.length > 0 &&
                  <Pagination pageInfo={pageInfo} getData={getCourses} />
            }
        </div>
    </>
  );
}
