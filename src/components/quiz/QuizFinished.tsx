import { Answer } from "../../models/models";
import Btns from "./Btns";
import { QuestionWithReponses } from "./Quiz";

interface Props {
  questions: QuestionWithReponses[];
  resultsRef: {
    id: number;
    answer: Answer | null;
    correct: boolean;
  }[];
  handleRestart: () => void
  nextClass: () => void,
  error: string,
  children: React.ReactNode
}



const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
function QuizFinished({ questions, resultsRef, handleRestart, nextClass, error, children }: Props) {
  return (
    <div className="mt-3 quiz-finished">
      <h4 className="mb-3">Teminaste!</h4>
     {children}
      <ul className="quiz-finished-list">
        {questions?.length > 0 ? (
          questions.map((question) => {
            return (
              <li key={question.id}>
                <h4 className="mb-2" style={{paddingLeft: '1rem'}}>{question.descripcion}</h4>
                {question.url_image && (
                  <div className="quiz-content-img mt-2">
                    <img src={`${APIURLIMG + question.url_image}`} alt="" />
                  </div>
                )}

                {question.subtitle && question.subtitle?.length > 0 && (
                  <p className="mb-2">{question.subtitle}</p>
                )}

                {
                  resultsRef?.length > 0 ? resultsRef.map((result) => {
                      if(result.id === question.id){
                        return (
                          <div key={result.id} className={`d-flex gap-2 message ${ result.correct ? "success": "error"}`}>
                            {
                              result.answer? <>
                              <p>{`${result.answer?.slug})`}</p>
                            <div className="response-card-content">
                              <p>{result.answer?.description}</p>
                              {result.answer?.url_image &&
                                result.answer.url_image.length > 0 && (
                                  <img
                                    src={`${APIURLIMG + result.answer.url_image}`}
                                    alt=""
                                  />
                                )}
                            </div>
                            </>:
                            'Tu no has responsido a esta pregunta.'
                            }
                          </div>
                        );
                      }
                  })
                  :""
                }
              </li>
            );
          })
        ) : (
          <p>No hay preguntas</p>
        )}
      </ul>

      {error && <p className="error">{error}</p>}

      <Btns
        handleSkip={() => handleRestart()}
        changeView={() => nextClass()}
        classname1=""
        classname2=""
        txtBtn1="Repetir"
        txtBtn2="Continuar"
        juscont="right"
      />
    </div>
  );
}

export default QuizFinished;
