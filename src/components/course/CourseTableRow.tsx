import { useContext } from "react";
import { Course, Road } from "../../models/models";
import { EditIconGlobal, TrashIconGlobal } from "../global/icons/IconsGloba";
import { ContextCourse, ContextCourseType } from "./CourseContext";

interface Props{
  course: Course
}
export default function CourseTableRow({
  course,
  /* deleteUser, */
}: Props) {

  const contextValue = useContext< ContextCourseType | null>(ContextCourse);

  if(!contextValue)return 

  const { setCourseToUpdate, setShowModal } = contextValue
  return (
    <>
      <tr>
        <td className="col-5">{course.titulo}</td>
        <td className="col-4">{course.descripcion}</td>
        <td className="road-state">
          <button className={`${course.active ? "f-btn btn--minwidth btn--main": 'f-btn btn--minwidth btn--red'}`}>{course.active? 'Activo': 'Inactivo'}</button>
        </td>
        <td className="col-2 text-center">
          <button
            className="f-btn btn--main"
            onClick={() => {
              setShowModal(true);
              setCourseToUpdate(course);
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
