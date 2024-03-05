import { useEffect, useState } from "react";
import { Road } from "../../models/models";
import { AxiosService } from "../../service/api.service";
import { ArrowRight } from "../global/icons/Icons";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
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

  return (
    <section className="section-carousel">
      <h2 className="section-carousel-title">Potencia lo que ya sabes</h2>
      <p className="section-carousel-parrafo">
        Elige una ruta de aprendizaje y sigue un orden de cursos sobre temas o
        áreas específicas, de forma ágil y guiada.
      </p>

      {!loading ? (
        <div className="carousel-container">
          <div className="carousel">
            {roads?.length > 0
              ? roads?.map((road, index) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    key={road.id}
                    to={`${PrivateRoutes.RUTAS}/${road.id}-${road.slug}`}
                  >
                    <div className="carousel-card" key={index}>
                      <div>
                        <div className="carousel-card-info">
                          <span>Ruta</span>
                          <span>{road.numero_cursos} Cursos</span>
                        </div>
                        <h3 className="carousel-card-title">{road.nombre}</h3>
                        <p className="carousel-card-parrafo">
                          {" "}
                          {road.descripcion}{" "}
                        </p>
                      </div>

                      <span className="carousel-card-link">
                        Ver cursos
                        <ArrowRight />
                      </span>
                    </div>
                  </Link>
                ))
              : "Estamos desarrollando nuevas rutas de aprendizaje para ti"}
          </div>
        </div>
      ) : (
        <Skeleton height="300px" />
      )}
    </section>
  );
}
