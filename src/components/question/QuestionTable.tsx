import { Table } from "react-bootstrap";
import { ThTable } from "../global/pagination/ThTable";
import Pagination from "../global/pagination/Pagination";
import { PageInfo, Question } from "../../models/models";
import QuestionTableRow from "./QuestionTableRow";

interface Props {
  questions: Question[],
  getQuestions: (page: number, nameFilter: string) => void,
  deleteQuestion: (id: number) => void,
  pageInfo: PageInfo | null
}

export default function QuestionTable({
  questions,
  getQuestions,
  deleteQuestion,
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
            {questions?.length > 0 ? (
              questions.map((question) => (
                <QuestionTableRow
                  key = {crypto.randomUUID()}
                  question = {question}
                 /*  deleteQuestion = {deleteQuestion}
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
           {questions?.length > 0 &&
                  <Pagination pageInfo={pageInfo} getData={getQuestions} />
            }
        </div>
    </>
  );
}
