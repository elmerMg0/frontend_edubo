import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import { AxiosService } from "../../service/api.service";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../models/models";
import { Footer } from "../global/footer/Footer";
import Skeleton from "react-loading-skeleton";

function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      setLoading(true);
      const params = {
        id: id,
        type: "course",
      };
      const response: any = await AxiosService.get("api/quizzes", params);
      if (response.success) {
        setQuizzes(response.data.quizzes);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quizzes">
      <Header />
      <div className="container-content">
        <h2>Simulaciones</h2>
        <ul className="quizzes-list">
          {quizzes?.length > 0 ? (
            quizzes.map((quiz: Quiz) => {
              return (
                <li key={quiz.id} className="quizzes-item">
                  <p className="">{quiz.descripcion}</p>
                  <button
                    className="btn btn--primary"
                    onClick={() => navigate(`${quiz.id}`)}
                  >
                    Empezar
                  </button>
                </li>
              );
            })
          ) : (
            <>
              {loading ? (
                <>
                  <li>
                    <Skeleton height={40} />
                  </li>
                  <li>
                    <Skeleton height={40} />
                  </li>
                  <li>
                    <Skeleton height={40} />
                  </li>
                  <li>
                    <Skeleton height={40} />
                  </li>
                </>
              ) : (
                <li className="quizzes-item">
                  <p className="">No hay preguntas disponibles</p>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Quizzes;
