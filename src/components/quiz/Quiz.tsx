import { useEffect, useRef, useState } from "react";
import { Header } from "../global/header/Header";
import { useNavigate, useParams } from "react-router";
import { AxiosService } from "../../service/api.service";
import { Answer, Class, Course, Question, Response } from "../../models/models";
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
    answer: Answer | null;
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
  const [error, setError] = useState('');

  useEffect(() => {
    getInfo();
    loading
  }, []);
  const getInfo = async () => {
    const url1 = "api/course/?";
    const url2 = "api/quiz/?";
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
        const questionsApi = res[1].data.questions;
        resultsRef.current = questionsApi.map((question: QuestionWithReponses) => {
          return {
            id: question.id,
            answer: null
          }
        })
        setQuestions(questionsApi);

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
    setError('')
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

    if(lastValue.numero_clase > Number(idClass)){
      navigate(`${basePath}${Number(idClass) + 1}/1`)
    }else{
      /* Terminado el curso */
      /* Validar que hay respondido mas del 80% correcto */
      const asnwerSuccess = resultsRef.current.reduce((acc: number, val: { id: number; correct: boolean }) => {
        if (val.correct) {
          return acc + 1
        }
        return acc
      }, 0) 
    
      const percent = ((asnwerSuccess / questions.length)*100);
      if(percent >= 80){
        navigate(`${basePath}finish`)
      }else{
        setError('Debes superar el 80% de respuestas correctas para terminar el curso');
      }
    }
  
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
        error={error}
        > 
        f
        </QuizFinished>,
  };

  return (
    <div className="quiz-container">
      <Header/>
      <main className="quiz">
        <div className="quiz-header-container">
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
        </div>

        {Views[view]}
      </main>
      <Footer />
    </div>
  );
}

export default Quiz;
