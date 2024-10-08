import { useEffect, useRef, useState } from "react";
import { Header } from "../global/header/Header";
import "./course.css";
import { AxiosService } from "../../service/api.service";
import { CourseServiceName } from "../../service/apiServiceNames";
import { Class, Course, Subject } from "../../models/models";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBarChartLine } from "react-icons/bs";
import { Footer } from "../global/footer/Footer";
import { Classes } from "./Classes";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { bussinesName, typePlans } from "../../utilities/constans";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

export interface ClassWithSubject extends Class {
  subjects: Subject[];
}
interface AppState {
  course: Course | null;
  classes: ClassWithSubject[];
}

export default function CourseComponent() {
  const [course, setCourse] = useState<AppState["course"]>(null);
  const [classes, setClasses] = useState<AppState["classes"]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { idCourse } = useParams();
  const user = useSelector((store: AppStore) => store.user);
  const progressTotal = useRef(0);

  useEffect(() => {
    getCourseInfo();
    window.scrollTo(0, 0);
  }, []);

  const getCourseInfo = async () => {
    try {
      setLoading(true);
      let params = {
        idCourse: idCourse?.split("-")[0],
        idStudent: user.id,
      };
      const response = await AxiosService.get(CourseServiceName.COURSE, params);
      if (response) {
        const { data } = response;
        setCourse(data.course);
        setClasses(data.classes);
        setSubscribed(data.subscribed);
        progressTotal.current = data.progress.toFixed(3);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="course" style={{height: '100vh'}}>
        <div className="container-content">
            <Skeleton height={"300px"} />
        </div>
        <div className="course-info container-content" >
          <Skeleton height={"30px"} width={"30%"} />
          <Skeleton height={"50px"} />
          <br />
          <Skeleton height={"20px"} width={"50%"} />
          <Skeleton height={"20px"} width={"30%"} />
          <Skeleton height={"20px"} width={"50%"} />
          <Skeleton height={"20px"} width={"40%"} />
          <Skeleton height={"20px"} width={"50%"} />
          <Skeleton height={"20px"} width={"50%"} />
          <br />
          <Skeleton height={"250px"} />
        </div>
      </div>
    );
  }

  const getMotnth = (date: string | undefined) => {
    if (!date) return 1;
    return date.slice(5, 7);
  };
  return (
    <div className="course">
      <Header />

      <div className="course-header container-content">
        <div className="course-img">
          <img src={`${APIURLIMG + course?.url_image}`} alt="" />
        </div>

        <section className="course-info">
          <h2 className="course-title">{course?.name}</h2>
          <p className="course-subtitle">{course?.subtitle}</p>

          <div className="course-profit">
            <p>Que aprenderas?</p>
            <ul
              className=""
              dangerouslySetInnerHTML={{ __html: course?.you_learn ?? "" }}
            />
          </div>

          <div className="course-date">
            <span className="course-feature-item">
              <FaRegCalendarAlt />
              <span>
                {getMotnth(course?.create_ts)}
                {" - "}
                {course?.create_ts.slice(8, 10)}
              </span>
            </span>
            <span>
              <BsBarChartLine />
              {course?.nivel}
            </span>
          </div>

          {subscribed ? (
            <p className="">
              Bienvenido a tu viaje educativo personalizado!
            </p>
          ) : (
            <>
              <Link to={`/precios/${typePlans.course}/${course?.id}`}>
                <button className="btn btn--primary">Subscribirme</button>
              </Link>
              <p className="course-b-btn">
                *Prueba la experiencia {bussinesName}
              </p>
            </>
          )}
        </section>
      </div>

      <Classes
        classes={classes}
        subscribed={subscribed}
        progress={progressTotal.current}
      />

      <article className="course-about container-content">
        <h3>Acerca de este curso</h3>
        <div
          className="course-about-description"
          dangerouslySetInnerHTML={{ __html: course?.informacion ?? "" }}
        />
      </article>

      <Footer />
    </div>
  );
}
