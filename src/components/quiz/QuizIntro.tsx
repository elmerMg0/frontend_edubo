import Btns from "./Btns";
import image from '../../assets/img/quizImage.png'
interface Props {
  changeView: () => void;
  questionsNumber: number;
}
function QuizIntro({ changeView, questionsNumber }: Props) {
  const handleSkip = () => {};
  return (
    <div className="quiz-intro">
      <div className="quiz-intro-img">
        <img style={{ width: "100%" }} src={image} alt="quiz image" />
      </div>
      <div>

      <h4 className="mb-3">Por favor completa el Quiz</h4>
      <ul className="quiz-intro-list">
        <li>
          Siéntete libre de realizar el quiz tantas veces como lo necesites para
          consolidar tus conocimientos.
        </li>
        <li>El cuestionario consta de {questionsNumber} preguntas.</li>
        <li>
          No hay límite de tiempo, así que tómate el espacio que requieras para
          responder con tranquilidad y confianza.
        </li>
        <li>
          Al finalizar el quiz, recibirás valiosos comentarios que te ayudarán a
          identificar las áreas en las que puedes reforzar tus conocimientos.
        </li>
      </ul>

      <Btns
        handleSkip={handleSkip}
        changeView={changeView}
        classname1=""
        classname2=''
        txtBtn1="Saltar"
        txtBtn2="Comenzar"
        juscont="left"
        />
      </div>
    </div>
  );
}

export default QuizIntro;
