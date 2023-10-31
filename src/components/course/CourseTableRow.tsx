import { useContext } from "react";
import { Course } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextCourse, ContextCourseType } from "./Course";
import { useDispatch } from "react-redux";
import { PrivateRoutes } from "../../models/routes";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../redux/states/course.state";

interface Props{
  course: Course
}
export default function CourseTableRow({
  course,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext< ContextCourseType | null>(ContextCourse);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!contextValue)return 
  const { setCourseToUpdate, setShowModal } = contextValue

  const handleShowClases = () => {
    dispatch(createCourse(course));
    navigate(`/${PrivateRoutes.CLASS}`)
  }
  return (
    <>
      <tr>
        <td className="col-2">
          <button className="f-btn btn--minwidth btn--main" onClick={handleShowClases}>Ver clases</button>
        </td>
        <td>{course.titulo}</td>
        <td className="col-3">{course.descripcion}</td>
        <td >{course.duracion}</td>
        <td >{course.nivel}</td>
        <td >
          <button className={`${course.active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{course.active? 'Activo': 'Inactivo'}</button>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setCourseToUpdate(course);
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
