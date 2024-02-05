import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import "./path.css";
import { AxiosService } from "../../service/api.service";
import { Footer } from "../../components/global/footer/Footer";
import { useParams } from "react-router";
import { Course, Road } from "../../models/models";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import SkeletonGlobal from "../../components/global/skeleton/SkeletonGlobal";
import Skeleton from "react-loading-skeleton";

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface AppState {
  road: Road | null;
  courses: Course[];
}
export function Faculty() {
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [courses, setCourses] = useState<AppState["courses"]>([]);
  const { path } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPaths();
    window.scrollTo(0, 0);
  }, []);

  const getPaths = async () => {
    setLoading(true);
    const url = "ruta-aprendizaje/get-roads-with-courses/?";
    const params = {
      idRoad: path?.split("-")[0],
      isActive: true,
    };
    const res = await AxiosService.get(url, params);
    if (res) {
      setRoad(res.data.pathInfo);
      setCourses(res.data.courses);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <Header setIsOpen={() => {}}></Header>

      <section className="home-welcome">
        <h2 className="home-welcome-title">{road?.nombre || <Skeleton />}</h2>
        <p className="path-welcome-parrafo">{road?.subtitle || <Skeleton />}</p>
        {loading ? (
          <SkeletonGlobal
            width="100%"
            height="200px"
            borderRadius="10px"
            cards={1}
          />
        ) : (
          <div className="path-welcome-img">
            <img src={APIURLIMG + road?.url_image} alt="" />
          </div>
        )}
        <p className="path-welcome-parrafo">
          Estos cursos son solo el comienzo de tu viaje hacia una educación
          superior que te preparará para enfrentar los desafíos del mundo
          tecnológico moderno
        </p>
        <h4 className="path-welcome-parrafo">
          Nuestra oferta académica incluye:
        </h4>
      </section>

      <div className="path-courses">
        <ul>
          {courses?.length > 0 ? (
            courses.map((course: Course) => {
              return (
                <Link
                  to={`/${PrivateRoutes.RUTAS}/${path}/${
                    course.id + "-" + course.slug
                  }`}
                  key={course.id}
                >
                  <li className="card-course">
                    <div className="card-course-img">
                      <img src={`${APIURLIMG}${course?.url_image}`} alt="" />
                    </div>
                    <div className="card-course-info">
                      <h4>{course.name}</h4>
                      <p>{course.subtitle}</p>
                    </div>
                  </li>
                </Link>
              );
            })
          ) : (
            <>
              {loading ? (
                <>
                  <Skeleton height={250} count={4} />
                </>
              ) : (
                <p>No hay cursos disponibles</p>
              )}
            </>
          )}
        </ul>
      </div>

      <section className="path-info">
        {road?.carrers && (
          <>
            <h4>Carreras: </h4>
            <ul>
              <div dangerouslySetInnerHTML={{ __html: road?.carrers }}></div>
            </ul>
          </>
        )}

        <h4>Duración de las carreras</h4>
        <p>{road?.duration}</p>
        <h4>Modalidad de admisión</h4>
        <p>{road?.admission_mode}</p>
        <h4>Carrera</h4>
        <p>{road?.period}</p>
      </section>

      <Footer />
    </div>
  );
}
