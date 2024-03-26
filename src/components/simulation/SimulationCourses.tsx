import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { AxiosService } from "../../service/api.service";
import { Course, Road } from "../../models/models";
import PathCourse from "../faculty/PathCourse";
import Skeleton from "react-loading-skeleton";
import { Header } from "../global/header/Header";
import { Footer } from "../global/footer/Footer";

interface AppState {
  road: Road | null;
  courses: Course[];
}
function SimulationCourses() {
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [courses, setCourses] = useState<AppState["courses"]>([]);
  const { path } = useParams();
  const [loading, setLoading] = useState(false);
  const [, setIsEnrollment] = useState(false);
  useEffect(() => {
    getPaths();
    window.scrollTo(0, 0);
  }, []);

  const getPaths = async () => {
    setLoading(true);
    const url = "api/road-courses-questions/?";
    const params = {
      idRoad: path?.split("-")[0],
      isActive: true,
    };
    const res = await AxiosService.get(url, params);
    if (res) {
      setRoad(res.data.pathInfo);
      setCourses(res.data.courses);
      setIsEnrollment(res.data.enrollment);
    }
    setLoading(false);
  };
  return (
    <div className="pathCourse">
      <Header />
      <h4 className="text-center mt-3">Facultad de {road?.nombre}</h4>
      <p className="text-center mb-4">Simulacros de los diferentes cursos</p>
      {courses?.length > 0 ? (
        <div className="path-courses">
          <ul>
            {courses.map((course: Course) => {
              return (
                <PathCourse
                  key={course.id}
                  urlImage={course?.url_image}
                  url={`${course.id}`}
                >
                  <div className="">
                    <h4>Simulacros de {course.name}</h4>
                    <p>Simulacros: {course.num_quizzes}</p>
                  </div>
                </PathCourse>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="skeleton-paths" style={{ padding: "1rem" }}>
              <Skeleton height={250} count={4} className="mb-2" />
            </div>
          ) : (
            <p className="path-welcome-parrafo text-center">
              Estamos en proceso de preparar de nuevos cursos.
            </p>
          )}
        </>
      )}
      <Footer/>
    </div>
  );
}

export default SimulationCourses;
