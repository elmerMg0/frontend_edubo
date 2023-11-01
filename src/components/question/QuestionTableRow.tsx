import { useContext } from "react";
import { Question } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ContextQuestion, CreateQuestionType } from "./Question";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props{
  question: Question
}
export default function QuestionTableRow({
  question,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext<CreateQuestionType | null>(ContextQuestion);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(!contextValue)return 

  const { setQuestionToUpdate, setShowModal } = contextValue
  
  return (
    <>
      <tr>
        <td className="">{question.descripcion}</td>
        <td className="">{question.respuesta}</td>
        <td className="question-state">
          <button className={`${question.active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{question.active? 'Activo': 'Inactivo'}</button>
        </td>
        {/* <td><img src={`${APIURLIMG + question.url_image}`} alt="imagen" /></td> */}
        <td>
          <button disabled={!question.url_image} className={`f-btn btn--minwidth ${question.url_image ? 'btn--main': "btn-disabled"}`} onClick={() => window.open(APIURLIMG + question.url_image, '_blank')}>Ver Image</button>
        </td>
        <td className="col-2 text-center">
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setQuestionToUpdate(question);
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
