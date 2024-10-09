import React, { useRef, useState } from 'react'
import { AnswerState, QuestionWithReponses } from './Quiz';
import { Answer, Response } from '../../models/models';
import Btns from './Btns';
import { AxiosService } from '../../service/api.service';
import { Spinner } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

interface Props {
    questions: QuestionWithReponses[],
    changeView: () => void,
    resultsRef: React.MutableRefObject<AppState['results']>,
    setQuestions: React.Dispatch<React.SetStateAction<QuestionWithReponses[]>>,
    isLoading: boolean
}

interface AppState {
    questions: QuestionWithReponses[];
    answerState: AnswerState; 
    results: {
      id: number;
      answer: Answer | null;
      correct: boolean;
    }[]
    setNroQuiz: React.Dispatch<React.SetStateAction<number>>,
    answer: Answer | null,
} 
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
function QuizQuestions({questions, changeView, resultsRef, setQuestions, isLoading}: Props) {
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [answerState, setAnswerState] = useState<AppState["answerState"]>(null);
    const [answer, setAnswer] = useState("");
    const [nroQuiz, setNroQuiz] = useState(0);
    const [answerSelect, setAnswerSelected] = useState<AppState['answer']>(null);
    const [loading, setLoading] = useState(false);
    const checkClicked = useRef(false);
    const questionSelected = useRef(-1);

    const handleSelectAnswer = (answer: Answer | undefined, idQuestion: number | undefined) => {
        if (!answer) return;
        setIsAnswerSelected(true);
        setAnswerSelected(answer);
        questionSelected.current = idQuestion ?? -1;
      };

      
    const handleSkip = ()=>{
      if(answerSelect)return;
      const cloneQuestions = [...questions];
      const numberQuestionsAnswered = resultsRef.current.filter((question: { answer: Answer | null, id: number}) => question.answer !== null).length;
      const questionResults = [...cloneQuestions].slice(numberQuestionsAnswered, questions.length );
      questionResults.unshift(questionResults.pop() as QuestionWithReponses);
      cloneQuestions.splice(numberQuestionsAnswered, questions.length, ...questionResults);
      setQuestions(Object.values(cloneQuestions));  
    }

    const handleCheck = async () => {
      if(!answerSelect)return;

      if(nroQuiz === questions.length - 1 && checkClicked.current){
        changeView();  
        return 
      }

      if (checkClicked.current) {
        //next question
        checkClicked.current = false;
        setAnswerState(null)
        setNroQuiz(nroQuiz + 1);
        setIsAnswerSelected(false);
        setAnswerSelected(null);
        setAnswer("");
        return;
      }
      checkClicked.current = true;
      
      try {
        setLoading(true);
        const params = {
          idResponse: answerSelect?.id,
        };
        const response = await AxiosService.get("api/check", params);
        if (response) {
          const { is_correct, answer } = response.data;
          setAnswerState(is_correct);
  
          resultsRef.current = resultsRef.current.map((q) => {
            if(q.id === questionSelected.current){
              return {
                ...q, answer: {...answerSelect}, correct: is_correct
              }
            }
            return q;
          })
          if (!is_correct) setAnswer(answer);
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }
    let progressValue = (nroQuiz + 1) / questions?.length;
  
    return (
    <div className="quiz-questions-container">
        <p className='mb-1'>Pregunta {nroQuiz + 1} de {questions?.length}</p>
        <progress
          className="progressBar"
          id="progressBar"
          value={progressValue * 100}
          max="100"
        ></progress>

        {/*Preguntas y respuestas  */}
        <section className="quiz-questions mb-3">
          {questions?.length > 0 ? (
            questions
              .slice(nroQuiz, nroQuiz + 1)
              .map((question: QuestionWithReponses) => {
                return (
                  <div key={question.id} className="quiz-card">
                    <h4 className="mb-2">{question.descripcion}</h4>
                    {
                      question.url_image &&  
                      <div className="quiz-content-img">
                        <img style={{aspectRatio: "16/9"}} src={`${APIURLIMG + question.url_image}`} alt="" />
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
                                answerSelect?.id === response.id ? "selected" : ""
                              }`}
                              onClick={() => handleSelectAnswer(response, question?.id)}
                              disabled={checkClicked.current}
                              style={{
                                cursor: checkClicked.current
                                  ? "no-drop"
                                  : "pointer",
                              }}
                            >
                              <p style={{ backgroundColor:  answerSelect?.id === response.id  ? "#02487d" : ""}}>{response.slug}</p>
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
            <>
              {
                isLoading ? <Skeleton count={5} height={40} /> : <p>No hay preguntas</p>
              }
            </>
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
            txtBtn2={loading ? <Spinner size='sm' />  :  checkClicked.current ? "Siguiente" : "Comprobar"}
        />
      </div>
  )
}

export default QuizQuestions