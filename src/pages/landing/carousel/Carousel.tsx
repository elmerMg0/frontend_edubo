import { useEffect, useState } from "react";
import { Road } from "../../../models/models";
import { AxiosService } from "../../../service/api.service";
import { ArrowRight } from "../../../components/global/icons/Icons";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Skeleton from "react-loading-skeleton";

interface AppState {
  roads: Road[];
}
export function Carousel() {
  const [roads, setRoads] = useState<AppState["roads"]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getRoads();
  }, []);

  const getRoads = async () => {
    setLoading(true);
    const url = "api/learning-paths/";
    const res = await AxiosService.get(url, "");
    if (res) {
      setRoads(res.data.roads);
    }
    setLoading(false);
  };

  const LearningPaths = () => {
    return (
      <section className="carousel-container">
        <ul className="carousel">
          {roads?.length > 0
            ? roads?.map((road, index) => (
                <li key={road.id}>
                  <div className="carousel-card" key={index}>
                    <div>
                      <div className="carousel-card-info">
                        <span>Ruta</span>
                        <span>{road.numero_cursos} Cursos</span>
                      </div>
                      <h5>{road.nombre}</h5>
                      <p>{road.descripcion}</p>
                    </div>

                    <Link
                      to={`${PrivateRoutes.RUTAS}/${road.id}-${road.slug}`}
                      className="carousel-card-link"
                    >
                      Ver cursos
                      <ArrowRight />
                    </Link>
                  </div>
                </li>
              ))
            : 
            <li>
              <h4>Estamos desarrollando nuevas rutas de aprendizaje para ti</h4>
            </li>
            }
        </ul>
      </section>
    );
  };
  return (
    <div className="section-carousel container-content">
      <h3>Potencia lo que ya sabes</h3>
      <p>
        Preparate paraingresar a la facultad de tus sueños, explora nuestras
        rutas de aprendizaje diseñadas para cada área.
      </p>
      {loading ? <Skeleton height="300px" /> : <LearningPaths />}
    </div>
  );
}
