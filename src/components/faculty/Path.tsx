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
          <p className="btn btn--primary">
            Tienes un plan activo.
          </p>
        </>
      ) : (
        <>
          <Link
            to={`/${PrivateRoutes.PLANES}/${typePlans.road}/${road?.id}`}
          >
            <button className="btn btn--primary">
              Ver plan
            </button>
          </Link>
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
          <Skeleton height={30} className="mb-2" />
          <Skeleton height={200} className="mb-1" />
        </div>
      ) : (
        <section className="home-welcome" style={styles}>
          <div className="home-welcome-bg">
           <div className="home-welcome-content">
            <h2 className="home-welcome-title">{road?.nombre}</h2>
            <p>{road?.subtitle}</p>
            <IsEnrollment />
           </div>
          </div>
        </section>
      )}

      <h4 className="container-content our-offer-text ">Nuestra oferta académica incluye</h4>

      {courses?.length > 0 ? (
        <div className=" container-content">
          <ul className="course-list">
            {courses.map((course: Course) => {
              return (
                <PathCourse
                  urlImage={course?.url_image}
                  url={`/${PrivateRoutes.RUTAS}/${path}/${
                    course.id + "-" + course.slug
                  }`}
                  key={course?.id}
                >
                  <h6>{course.name}</h6>
                  <p>{course.subtitle}</p>
                </PathCourse>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="skeleton-paths container-content" style={{ padding: "1rem" }}>
              <Skeleton height={250} count={4} className="mb-2" />
            </div>
          ) : (
            <p className="text-center">
              Estamos en proceso de preparar de nuevos cursos.
            </p>
          )}
        </>
      )}

      <section className="path-info container-content">
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

          <IsEnrollment />
        </div>
      </section>

      <Footer />
    </div>
  );
}
