import { useEffect, useRef, useState } from "react";
import { Header } from "../global/header/Header";
import { useNavigate, useParams } from "react-router";
import { AxiosService } from "../../service/api.service";
import { Class, Course, Question, Response } from "../../models/models";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
import "./quiz.css";
import { Footer } from "../global/footer/Footer";
import QuizIntro from "./QuizIntro";
import QuizFinished from "./QuizFinished";
import QuizQuestions from "./QuizQuestions";
import { PrivateRoutes } from "../../models/routes";
export interface QuestionWithReponses extends Question {
  responses: Response[];
}
interface AppState {
  class: Class | null;
  course: Course | null;
  questions: QuestionWithReponses[];
  answerState: AnswerState;
  results: {
    id: number;
    correct: boolean;
  }[];
}
export type AnswerState = true | false | null;

function Quiz() {
  const { idCourse, idClass, path } = useParams();
  const [clase, setClase] = useState<AppState["class"]>(null);
  const [questions, setQuestions] = useState<AppState["questions"]>([]);
  const [course, setCourse] = useState<AppState["course"]>(null);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [view, setView] = useState(0);
  const navigate = useNavigate();
  const resultsRef = useRef<AppState["results"]>([]);
  const basePath = `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/`;

  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = async () => {
    const url1 = "curso/course/?";
    const url2 = "subject/quiz/?";
    const params = {
      idCourse: idCourse?.split("-")[0],
    };
    /* Enviar el id del curso */
    const params1 = {
      idCourse: idCourse?.split("-")[0],
      nroClass: idClass,
    };

    try {
      setLoading(true);
      const promiss1 = AxiosService.get(url1, params);
      const promiss2 = AxiosService.get(url2, params1);
      Promise.all([promiss1, promiss2]).then((res) => {
        setCourse(res[0].data.course);
        setClasses(res[0].data.classes);

        setClase(res[1].data.classe);
        setQuestions(res[1].data.questions);

        setLoading(false);
      });
    } catch (error) {
    } finally {
      //setLoading(false)
    }
  };

  const changeView = (nro: number) => {
    setView(nro);
  };

  const restartQuiz = () => {
    resultsRef.current = [];
    setView(0);
  }

  const nextClass = () => {
    
    const lastValue: Class = classes.reduce((arr: Class, val: Class) => {
      if (val.numero_clase > arr.numero_clase) {
        return val;
      }
      return arr;
    }, classes[0]);
    console.log(classes, idClass, lastValue)

    if(lastValue.numero_clase > Number(idClass)){
      navigate(`${basePath}${Number(idClass) + 1}/1`)
    }
    /* if(){

    } */
  }

  const Views: any = {
    0: (
      <QuizIntro
        changeView={() => changeView(1)}
        questionsNumber={questions.length}
      />
    ),
    1: (
      <QuizQuestions
        setQuestions={setQuestions}
        questions={questions}
        changeView={() => changeView(2)}
        resultsRef={resultsRef}
      />
    ),
    2: <QuizFinished 
        questions={questions} 
        resultsRef={resultsRef.current}
        handleRestart={restartQuiz}
        nextClass={nextClass}
        />,
  };

  return (
    <>
      <Header setIsOpen={() => {}}></Header>
      <main className="quiz">
        <div className="quiz-header">
          <img
            className="img-icon"
            src={`${APIURLIMG + course?.url_image}`}
            alt=""
          />
          <h4>Curso {course?.name}</h4>
        </div>
        <p>Clase</p>
        <div className="quiz-class mb-1">
          <h4> {clase?.titulo}</h4>
        </div>

        {Views[view]}
      </main>
      <Footer />
    </>
  );
}

export default Quiz;
