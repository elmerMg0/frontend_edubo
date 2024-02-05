import Btns from "./Btns";
import { QuestionWithReponses } from "./Quiz";

interface Props {
  questions: QuestionWithReponses[];
  resultsRef: {
    id: number;
    correct: boolean;
  }[];
  handleRestart: () => void
  nextClass: () => void
}



const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
function QuizFinished({ questions, resultsRef, handleRestart, nextClass }: Props) {
  return (
    <div className="mt-3">
      <h4 className="mb-3">Teminaste!</h4>
      <ul className="quiz-intro-list">
        <li>
          Has llegado al final del cuestionario, ¡buen trabajo! Ahora podrás recibir retroalimentación valiosa sobre tus respuestas y desempeño
        </li>
        <li>Siéntete libre de revisar el contenido del curso y abordar cualquier concepto que desees reforzar. ¡Estamos aquí para apoyarte en tu camino de aprendizaje!</li>
      </ul>
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

                {question?.responses && question?.responses?.map((response) => {
                      if (
                        resultsRef.some((result) => result.id === response.id)
                      ) {
                        return (
                          <div key={response.id} className={`d-flex gap-2 message ${ resultsRef.find((result) => result.id === response.id)?.correct ? "success": "error"}`}>
                            <p>{response.slug})</p>
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
                          </div>
                        );
                      }
                    })}
              </li>
            );
          })
        ) : (
          <p>No hay preguntas</p>
        )}
      </ul>

      <Btns
        handleSkip={() => handleRestart()}
        changeView={() => nextClass()}
        classname1=""
        classname2=""
        txtBtn1="Repetir"
        txtBtn2="Siguiente clase"
        juscont="right"
      />
    </div>
  );
}

export default QuizFinished;
