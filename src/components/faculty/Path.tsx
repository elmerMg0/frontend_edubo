import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import "./path.css";
import { AxiosService } from "../../service/api.service";
import { Footer } from "../../components/global/footer/Footer";
import { useParams } from "react-router";
import { Course, Road } from "../../models/models";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import Skeleton from "react-loading-skeleton";
import { typePlans } from "../../utilities/constans";

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface AppState {
  road: Road | null;
  courses: Course[];
}
export default function Faculty() {
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [courses, setCourses] = useState<AppState["courses"]>([]);
  const { path } = useParams();
  const [loading, setLoading] = useState(false);
  const [isEnrollment, setIsEnrollment] = useState(false);
  useEffect(() => {
    getPaths();
    window.scrollTo(0, 0);
  }, []);

  const getPaths = async () => {
    setLoading(true);
    const url = "api/get-roads-with-courses/?";
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
    <div className="home">
      <Header />
      {loading ? (
        <div className="p-3 skeleton-header-path">
          <Skeleton height={40} className="mb-3" />
          <Skeleton height={20} className="mb-2" />
          <Skeleton height={150} className="mb-1" />
        </div>
      ) : (
        <section className="home-welcome">
          <h2 className="home-welcome-title">{road?.nombre}</h2>
          <p className="path-welcome-parrafo">{road?.subtitle}</p>
          <div className="path-welcome-img">
            <img
              style={{ aspectRatio: "16/9" }}
              src={APIURLIMG + road?.url_image}
              alt=""
            />
          </div>

          {isEnrollment ? (
            <>
              <p className="path-welcome-parrafo mb-2 mt-2">
                Tienes un plan activo.
              </p>
              <h4 className="path-welcome-parrafo">Cursos incluidos:</h4>
            </>
          ) : (
            <>
              <Link
                style={{ width: "250px", marginTop: "1rem" }}
                to={`/${PrivateRoutes.PLANES}/${typePlans.road}/${road?.id}`}
              >
                <button className="f-btn btn--get-start mb-2 mt-1">
                  Ver plan
                </button>
              </Link>

              <p className="path-welcome-parrafo mb-4">
                Suscríbete a un plan y accede al curso completo.
              </p>

              <h4 className="path-welcome-parrafo">
                Nuestra oferta académica incluye:
              </h4>
            </>
          )}
        </section>
      )}

      {courses?.length > 0 ? (
        <div className="path-courses">
          <ul>
            {courses.map((course: Course) => {
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

      <section className="path-info">
        {road?.carrers && (
          <div>
            <h4>Carreras: </h4>
            <ul>
              <div dangerouslySetInnerHTML={{ __html: road?.carrers }}></div>
            </ul>
          </div>
        )}
        <div>
          <h4>Duración de las carreras</h4>
          <p>{road?.duration}</p>
          <h4>Modalidad de admisión</h4>
          <p>{road?.admission_mode}</p>
          <h4>Carrera</h4>
          <p>{road?.period}</p>

          <Link to={`/${PrivateRoutes.PLANES}/${typePlans.road}/${road?.id}`}>
            <button
              style={{ width: "230px" }}
              className="f-btn btn--get-start mb-2 mt-3"
            >
              Ver plan
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
