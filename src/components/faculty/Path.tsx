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
import PathCourse from "./PathCourse";

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


  const styles = {
    backgroundImage: `url(${APIURLIMG}${road?.url_image})`,
  }

  const IsEnrollment = () => {
    return (
      <>
      {isEnrollment ? (
        <>
          <p className="path-welcome-parrafo mb-2 mt-2">
            Tienes un plan activo.
          </p>
        </>
      ) : (
        <>
          <Link
            style={{ maxWidth: "250px"}}
            to={`/${PrivateRoutes.PLANES}/${typePlans.road}/${road?.id}`}
          >
            <button className="f-btn btn-plan">
              Ver plan
            </button>
          </Link>

   {/*        <p className="path-welcome-parrafo mb-4">
            Suscríbete a un plan y accede al curso completo.
          </p>

          <h4 className="path-welcome-parrafo">
            Nuestra oferta académica incluye:
          </h4> */} 
        </>
      )}
      </>
    )
  }
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
        <section className="home-welcome" style={styles}>
          <div className="home-welcome-bg">
           <div className="home-welcome-content">
            <h2 className="home-welcome-title">{road?.nombre}</h2>
            <p className="path-welcome-parrafo">{road?.subtitle}</p>
            <IsEnrollment />
           </div>
          </div>
        </section>
      )}

      <h4 className="text-our-offer content-width">Nuestra oferta académica incluye</h4>

      {courses?.length > 0 ? (
        <div className="path-courses">
          <ul>
            {courses.map((course: Course) => {
              return (
                <PathCourse
                  urlImage={course?.url_image}
                  url={`/${PrivateRoutes.RUTAS}/${path}/${
                    course.id + "-" + course.slug
                  }`}
                >
                  <h4>{course.name}</h4>
                  <p>{course.subtitle}</p>
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

      <section className="path-info content-width mt-3">
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
