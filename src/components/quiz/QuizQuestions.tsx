import React, { useRef, useState } from 'react'
import { AnswerState, QuestionWithReponses } from './Quiz';
import { Response } from '../../models/models';
import Btns from './Btns';
import { AxiosService } from '../../service/api.service';

interface Props {
    questions: QuestionWithReponses[],
    changeView: () => void,
    resultsRef: React.MutableRefObject<AppState['results']>,
    setQuestions: React.Dispatch<React.SetStateAction<QuestionWithReponses[]>>
}

interface AppState {
    questions: QuestionWithReponses[];
    answerState: AnswerState; 
    results: {
      id: number;
      correct: boolean;
    }[]
    setNroQuiz: React.Dispatch<React.SetStateAction<number>>
} 
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
function QuizQuestions({questions, changeView, resultsRef, setQuestions}: Props) {
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [answerState, setAnswerState] = useState<AppState["answerState"]>(null);
    const [answer, setAnswer] = useState("");
    const [nroQuiz, setNroQuiz] = useState(0);
    const [answerSelect, setAnswerSelected] = useState(0);
    const checkClicked = useRef(false);


    const handleSelectAnswer = (id: number | undefined) => {
        if (id === undefined) return;
        setIsAnswerSelected(true);
        setAnswerSelected(id);
      };

      
    const handleSkip = ()=>{
      const cloneQuestions = [...questions];
      cloneQuestions.unshift(cloneQuestions.pop() as QuestionWithReponses);
      setQuestions(cloneQuestions);
    }

    const handleCheck = async () => {
      if(nroQuiz === questions.length - 1 && checkClicked.current){
        changeView();  
        return 
      }

      if (checkClicked.current) {
        //next question
        checkClicked.current = false;
        setAnswerState(null)
        setNroQuiz(nroQuiz + 1);
        setAnswerSelected(0);
        setAnswer("");
        return;
      }
      checkClicked.current = true;
      const params = {
        idResponse: answerSelect,
      };
      const response = await AxiosService.get("response/check", params);
      if (response) {
        const { is_correct, answer } = response.data;
        setAnswerState(is_correct);
        resultsRef.current = [...resultsRef.current, { id: answerSelect, correct: is_correct }];
        if (!is_correct) setAnswer(answer);
      }
    }
    let progressValue = (nroQuiz + 1) / questions?.length;
  
  
    return (
    <div className="">
        <p className='mb-1'>Pregunta {nroQuiz + 1} de {questions?.length}</p>
        <progress
          className="progressBar"
          id="progressBar"
          value={progressValue * 100}
          max="100"
        ></progress>

        <section className="quiz-questions mb-3">
          {questions?.length > 0 ? (
            questions
              .slice(nroQuiz, nroQuiz + 1)
              .map((question: QuestionWithReponses) => {
                return (
                  <div key={question.id} className="quiz-card">
                    <h4 className="mb-2">{question.descripcion}</h4>
                    {
                      question.url_image &&  <div className="quiz-content-img">
                      <img src={`${APIURLIMG + question.url_image}`} alt="" />
                    </div>
                    }
                   
                    {question.subtitle && question.subtitle?.length > 0 && (
                      <p className="mb-2">{question.subtitle}</p>
                    )}

                    <div className="response-cards">
                      {question.responses?.length > 0 ? (
                        question.responses.map((response: Response) => {
                          return (
                            <button
                              key={response.id}
                              className={`response-card ${
                                answerSelect === response.id ? "selected" : ""
                              }`}
                              onClick={() => handleSelectAnswer(response.id)}
                              disabled={checkClicked.current}
                              style={{
                                cursor: checkClicked.current
                                  ? "no-drop"
                                  : "pointer",
                              }}
                            >
                              <p style={{ backgroundColor:  answerSelect === response.id  ? "#3f7f35" : ""}}>{response.slug}</p>
                              <div className="response-card-content">
                                <p>{response.description}</p>
                                {response?.url_image &&
                                  response.url_image.length > 0 && (
                                    <img
                                      src={`${APIURLIMG + response.url_image}`}
                                      alt=""
                                    />
                                  )}
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <p>No hay respuestas</p>
                      )}
                    </div>
                  </div>
                );
              })
          ) : (
            <p>No hay preguntas</p>
          )}
        </section>

        <div className={`message ${answerState === true ? "success": answerState === false ? "error" : ""}`}>
          {answerState !== null && answerState ? (
            "¡Correcto!"
          ) : (
            <>
              <span>
                La respuesta correcta es: {answer}
              </span>
            </>
          )}
        </div>

        <Btns 
            juscont="space-between"
            handleSkip={handleSkip}
            txtBtn1="Saltar"
            classname1=''
            classname2={`${isAnswerSelected ? "" : "disabled"}`}
            changeView={handleCheck}
            txtBtn2={checkClicked.current ? "Siguiente" : "Comprobar"}
        />
      </div>
  )
}

export default QuizQuestions