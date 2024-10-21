import { useEffect, useRef, useState } from "react";
import QuizQuestions from "../quiz/QuizQuestions";
import { useNavigate, useParams } from "react-router";
import { QuestionWithReponses } from "../quiz/Quiz";
import { Answer, Class, Course } from "../../models/models";
import { PrivateRoutes } from "../../models/routes";
import { AxiosService } from "../../service/api.service";
import { Header } from "../global/header/Header";
import { Footer } from "../global/footer/Footer";
import { MdOutlineTimer } from "react-icons/md";
import QuizFinished from "../quiz/QuizFinished";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
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
  resultsSummarize: {
    numAnswerCorrect: number;
    numQuestions: number;
  } 
}
export type AnswerState = true | false | null;
function SimulationQuestions() {
  const {path, id, idQuiz } = useParams();
  const [questions, setQuestions] = useState<AppState["questions"]>([]);
  const [course, setCourse] = useState<AppState["course"]>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const navigate = useNavigate();
  const resultsRef = useRef<AppState["results"]>([]);
  const [time, setTime] = useState('20:00');
  const resultSummarize = useRef<AppState["resultsSummarize"]>({ numAnswerCorrect: 0, numQuestions: 0 }); 

  let interval: number;
  useEffect(() => {
    getInfo();
    loading;
  }, []);
  const getInfo = async () => {
    const url = "api/quiz-course?";
    const params = {
      idCourse: id,
      idQuiz: idQuiz
    };

    try {
      setLoading(true);
      const promiss1 = AxiosService.get(url, params);
      Promise.all([promiss1]).then((res) => {
        setCourse(res[0].data.course);
        const questionsApi = res[0].data.questions;
        setQuestions(questionsApi);
        resultsRef.current = questionsApi.map((question: QuestionWithReponses) => {
          return {
            id: question.id,
            answer: null
          }
        })
        setLoading(false);
      });
    } catch (error) {
    } finally {
      //setLoading(false)
    }
  };

  useEffect(() => {
    interval = setInterval(() => {
      updateWaitingTime();
    }, 1000);
    return () => clearInterval(interval);
  },[time])

  const updateWaitingTime = () => {
    if (time === "00:00") {
        /*  */
        const numAnswerCorrect = resultsRef.current.filter((result) => result.correct === true).length;
        resultSummarize.current = {...resultSummarize.current, numAnswerCorrect: numAnswerCorrect, numQuestions: questions.length};
        setView(1);
        clearInterval(interval);
    } else {
      let second = Number(time.slice(3, 5));
      let minute = Number(time.slice(0, 2));
      if (second === 0) {
        second = 59;
        minute = minute - 1;
        if (minute === 0) {
          minute = 0;
        }
      } else {
        second--;
      }
      const formatDigit = (digit: number) => (digit < 10 ? `0${digit}` : digit);
      const timeRemaning = `${formatDigit(minute)}:${formatDigit(second)}`;
      setTime(timeRemaning);
    }
  };

  const handleRestart = () => {
    setView(0)
    setTime('20:00')
  }

  const handleNextClass = () => {
    /* filter questions with an answer */ 
    navigate(`/${PrivateRoutes.SIMULATION}/${path}/${id}`);
  }

  const handleShowResutld = () => {
    const numAnswerCorrect = resultsRef.current.filter((result) => result.correct === true).length;
    resultSummarize.current = {...resultSummarize.current, numAnswerCorrect: numAnswerCorrect, numQuestions: questions.length};
    clearInterval(interval)
    setView(1)
  }
  const views: Record<number, JSX.Element> = {
    0: <QuizQuestions questions={questions} changeView={handleShowResutld} resultsRef={resultsRef} setQuestions={setQuestions} isLoading={loading}/>,
    1: <QuizFinished questions={questions} resultsRef={resultsRef.current} handleRestart={handleRestart} nextClass={handleNextClass} error={''} >
         <ul className="quiz-intro-list">
          <li>
            Has llegado al final del cuestionario, ¡buen trabajo! Ahora podrás recibir retroalimentación valiosa sobre tus respuestas y desempeño.
          </li>
          <li>Resultado: {resultSummarize.current?.numAnswerCorrect}/{resultSummarize.current?.numQuestions}</li>
        </ul>
      </QuizFinished>
  }

/*   const failed = () => {
    return (
      <div>
        <h4>Ups</h4>
        <p>¡No has SUPERADO EL 90% en el Simulador!
¡Inténtalo otra vez!</p>
        <p>Resultado: 2/20</p>

        <div>
          <button onClick={handleRestart}>Contactanos</button>
          <button onClick={handleNextClass}>Mas info</button>
        </div>
        <button onClick={handleNextClass}>Reiniciar</button>
      </div>
    )
  } */

  return (
    <div>
    <Header />
      <div className="quiz-simulation container-content">
        <main className="quiz">
          <div className="quiz-header-container">
            <div className="quiz-header">
              <img
                className="img-icon"
                src={`${APIURLIMG + course?.url_image}`}
                alt=""
              />
              <h4>Simulacion de {course?.name}</h4>
            </div>
          </div>
          <span>
            <MdOutlineTimer />
            {time}
          </span>
          {
            views[view]
          }

        </main>
      </div>
    <Footer />
    </div>
  );
}

export default SimulationQuestions;
