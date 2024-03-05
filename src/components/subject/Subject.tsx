import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AxiosService } from "../../service/api.service";
import ReactPlayer from "react-player";
import {
  Comment,
  Course,
  Professsor,
  Resource,
  Subject,
} from "../../models/models";
import "./subject.css";
import { BsEye, BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { ResourceComponent } from "./Resource";
import { ClassesMain } from "./ClassesMain";
import { PrivateRoutes } from "../../models/routes";
import { ClassWithSubject } from "../../components/course/Course";
import { Link } from "react-router-dom";
import { Footer } from "../../components/global/footer/Footer";
import { Header } from "../global/header/Header";
import Contribution from "./Contributions/Contribution";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import Suscribe from "./Suscribe";
import { updateSettings } from "../../redux/states/settings.state";
import { useDispatch } from "react-redux";
import { BiSolidSkipNextCircle, BiSolidSkipPreviousCircle } from "react-icons/bi";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
export interface CommentsFull extends Comment {
  name: string;
  lastName: string;
  avatar: string;
}
interface AppState {
  infoSubject: Subject | null;
  infoCourse: Course | null;
  btnline: TypeBtns;
  progress: string[];
  classes: ClassWithSubject[];
  professor: Professsor | null;
  resources: Resource[];
  contribution: CommentsFull[];
}
export enum TypeBtns {
  SYLLABUS = "syllabus",
  RESOURCE = "resource",
  CONTRIBUTION = "contribution",
}

interface TypesBtns {
  resource: React.ReactNode;
  syllabus: React.ReactNode;
  contribution: React.ReactNode;
}

export function Subject() {
  const { idSubject, idClass, idCourse, path } = useParams();

  const [infoCourse, setinfoCourse] = useState<AppState["infoCourse"]>(null);
  const [infoSubject, setInfoSubject] = useState<AppState["infoSubject"]>(null);
  const [classes, setClasses] = useState<AppState["classes"]>([]);
  const [btnSelected, setBtnSelected] = useState<AppState["btnline"]>(
    TypeBtns.SYLLABUS
  );
  const [progress, setProgress] = useState<AppState["progress"]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const resourceRef = useRef<AppState["resources"]>([]);

  const viewRef = useRef(0);
  const likesRef = useRef(0);
  const professorRef = useRef<AppState["professor"]>(null);
  const [subscribed, setSubscribed] = useState(false); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: AppStore) => store.user);
  const settings = useSelector((store: AppStore) => store.settings);  

  const views: TypesBtns = {
    resource: <ResourceComponent resources={resourceRef.current} />,
    syllabus: <ClassesMain classes={classes} progress={progress} suscribed={subscribed}/>,
    contribution: <Contribution btnSelected={btnSelected} />,
  };

  useEffect(() => {
    getInfo();

    return () => {
      window.scrollTo(0, 0);
    };
  }, [idSubject, idClass]);

  const updateProgres = async (id: any) => {
    const url = "api/update-progress";
    const params = {
      idSubject: id,
      idStudent: user.id,
    };
    AxiosService.get(url, params);
  };

  const getInfo = async () => {
    const url1 = "api/course/?";
    const url2 = "subject/get-subject/?";
    const url3 = "api/get-class-progress";
    const params = {
      idCourse: idCourse?.split("-")[0],
    };
    /* Enviar el id del curso */
    const params1 = {
      idCourse: idCourse?.split("-")[0],
      nroClass: idClass,
      slugSubject: idSubject,
    };
    const params2 = {
      slugSubject: idSubject,
      idCourse: idCourse?.split("-")[0],
      idStudent: user.id,
      nroClase: idClass,
    };
    try {
      setLoading(true);
      const promiss1 = AxiosService.get(url1, params);
      const promiss2 = AxiosService.get(url2, params1);
      const promise3 = AxiosService.get(url3, params2);
      Promise.all([promiss1, promiss2, promise3]).then((res) => {
        setinfoCourse(res[0].data.course);
        setClasses(res[0].data.classes);
        professorRef.current = res[0].data.professor;
        setSubscribed(res[0].data.subscribed);
        
        setInfoSubject(res[1].data.subject);
        viewRef.current = res[1].data.views;
        likesRef.current = res[1].data.likes;
        resourceRef.current = res[1].data.resources;
        if(res[1].data.subject?.video_url !== null) updateProgres(res[1].data.subject.id);

        setProgress(res[2].data.progress);
        setIsLiked(res[2].data.isLiked);
        setLoading(false);
      });
    } catch (error) {
    } finally {
      //setLoading(false)
    }
  };

  const handlePrevius = () => {
    //1/2 -> 1/10 /1/1
    const valueCurrently = classes.filter(
      (value) => value.numero_clase === Number(idClass)
    );

    if (Number(idSubject) > 1) {
      navigate(
        `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${idClass}/${
          Number(idSubject) - 1
        }`
      );
      return;
    }

    //2/1 -> 1/n   3/1 -> 2/n
    const lastValue = classes.filter(
      (value) => value.numero_clase === valueCurrently[0].numero_clase - 1
    );
    if (Number(idSubject) === 1 && Number(idClass) > 1) {
      navigate(
        `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${Number(idClass) - 1}/${
          lastValue[0].subjects.length
        }`
      );
      return;
    }
  };
  const handleNext = () => {
    const classCurrently = classes.filter(
      (value) => value.numero_clase === Number(idClass)
    );
    const lastValue = classes.reduce((arr, val) => {
      if (val.numero_clase > arr.numero_clase) {
        return val;
      }
      return arr;
    }, classes[0]);

    if (Number(idSubject) < classCurrently[0].subjects.length) {
      const nextClase = classCurrently[0].subjects[Number(idSubject)];
      console.log(nextClase, idSubject)
      if (nextClase.type === "quiz") {
        handleNavigate(Number(idClass) + "/quiz", Number(idSubject) + 1);
      } else {
        handleNavigate(Number(idClass), Number(idSubject) + 1);
      }
      return;
    }
    if (lastValue.numero_clase > Number(idClass)) {
      const nextClase =
        classCurrently[0].subjects[classCurrently[0].subjects.length - 1];
      if (nextClase.type === "quiz") {
        handleNavigate(Number(idClass) + 1 + "/quiz", Number(idSubject));
      } else {
        handleNavigate(Number(idClass) + 1, 1);
      }
      return;
    }
  };

  const handleNavigate = (nroClass: number | string, slugSubject: number) => {
    navigate(
      `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${nroClass}/${slugSubject}`
    );
  };

  const handleLike = () => {
    if (user?.id) {
      likesRef.current = isLiked ? likesRef.current - 1 : likesRef.current + 1;
      setIsLiked(!isLiked);
      const url = "api/update-likes-sub";
      const params = {
        idSubject: infoSubject?.id,
        idStudent: user.id,
      };
      AxiosService.get(url, params);
    }
  };

  const CurrentView: React.ReactNode = views[btnSelected];

  if (loading) {
    return (
      <section className="subject subject-loading">
        <div className="subject-info">
          <Skeleton height={"250px"} />

          <Skeleton height={"28px"} width={"70%"} />
          <Skeleton height={"20px"} width={"33%"} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "24px 1fr",
              gap: "0.2rem",
            }}
          >
            <Skeleton circle={true} height={"24px"} width={"24px"} />
            <Skeleton height={"20px"} width={"33%"} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.2rem",
            }}
          >
            <Skeleton height={"30px"} />
            <Skeleton height={"30px"} />
            <Skeleton height={"30px"} />
          </div>
          <Skeleton height={200} />
         {/*  <Skeleton height={200} /> */}
        </div>
      </section>
    );
  }

  const width = window.innerWidth;
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSettings({ repAutomatic: e.target.checked }));
  };
  return (
    <>
      <Header/>
      <div className="subject">
        <section className="xlp1">
          {
            infoSubject?.video_url ? 
            <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={infoSubject?.video_url}
              width="100%"
              height="100%"
              playing={settings.repAutomatic}
              onEnded={handleNext}
              controls={true}
            />
          </div>
            :
            <div className="player-wrapper">
               <Suscribe/>
            </div>
          }
      

          <div className="controls-player">
            <button className="f-btn" onClick={handleLike}>
              {isLiked ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />}
              <span>{likesRef.current}</span>
            </button>
            <button className="f-btn">
              <div className="wrap-toggle">
                <input type="checkbox" id='toggle' className="offscreen" onChange={handleToggle} checked={settings.repAutomatic}/>
                <label htmlFor="toggle" className="switch"></label>
              </div>
              <span>Rep. Automatica</span>
            </button>
            <button className="f-btn" onClick={handlePrevius}>
            <BiSolidSkipPreviousCircle size={19} />
              <span>Anterior</span>
            </button>
            <button className="f-btn" onClick={handleNext}>
            <BiSolidSkipNextCircle size={19} />
              Siguiente
            </button>
          </div>

          <div className="subject-info">
            <h2>{infoSubject?.title}</h2>
            <div className="subject-info-sub">
              <BsEye style={{ width: "0.8rem", height: "0.8rem" }} />
              <p>{viewRef.current} Vistas</p>
              <Link
                to={`/${PrivateRoutes.RUTAS}/${path}/${idCourse}`}
                style={{ textDecoration: "none" }}
              >
                <p>{infoCourse?.name}</p>
              </Link>
            </div>
            <div className="subject-info-teacher">
              <div className="subject-info-teacher-content">
               {
                professorRef.current?.url_image ?
                <img
                className=""
                src={`${APIURLIMG + professorRef.current?.url_image}` }
                alt=""
                />
                :
                <img
                className=""
                src={`https://picsum.photos/200` }
                alt=""
              />
               }
                <p className="my-0 mr-2">
                  {professorRef.current?.firstname}{" "}
                  {professorRef.current?.lastname}
                </p>
              </div>
              <FaRegFlag />
            </div>
          </div>


        <div className="xlp2">
          <div className="subject-btns-line">
            <button
              className={` ${btnSelected === TypeBtns.RESOURCE ? "flag" : ""} `}
              onClick={() => setBtnSelected(TypeBtns.RESOURCE)}
            >
              Recursos
            </button>
            <button
              className={` ${btnSelected == TypeBtns.SYLLABUS ? "flag" : ""}`}
              onClick={() => setBtnSelected(TypeBtns.SYLLABUS)}
            >
              <p style={{ paddingBottom: "0.2rem", margin: "0" }}> Temario </p>
            </button>
            <button
              className={` ${
                btnSelected === TypeBtns.CONTRIBUTION ? "flag" : ""
              }`}
              onClick={() => setBtnSelected(TypeBtns.CONTRIBUTION)}
              style={{ display: width > 1028 ? "none" : "block" }}
            >
              Aportes
            </button>
          </div>
          {CurrentView}
        </div>

        </section>



        <div style={{ display: width > 1028 ? "block" : "none"}} className={`${width > 1028 ? "siderbar-comments" : "none" }`}>
          <Contribution btnSelected={btnSelected} />
        </div>

      </div>
      {
        width < 1028 ? <Footer /> : null
      }
    </>
  );
}
