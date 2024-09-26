import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import "./learningPaths.css";
import { AxiosService } from "../../service/api.service";
import { Footer } from "../global/footer/Footer";
import { useParams } from "react-router";
import { Paths } from "./Paths";
import img from "../../assets/img/umssLight.jpg";
import Skeleton from "react-loading-skeleton";
import RecentClass from "./RecentClass/RecentClass";

export function LearningPaths() {
  const [roads, setRoads] = useState([]);
  const { path } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPaths();
    window.scrollTo(0, 0);
  }, []);

  const getPaths = async () => {
    try {
      setLoading(true);
      const url = "api/get-roads/?";
      const params = {
        idRoad: path?.split("-")[0] ? path?.split("-")[0] : "",
        nameRoad: "",
      };
      const res = await AxiosService.get(url, params);
      if (res) {
        setRoads(res.data.courses);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleScrollSmooth = () => {
    const element = document.getElementById("paths");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="home">
      <Header />
      <section className="home-welcome-ld">
        <div>
          <h2 className="home-welcome-title">
            Explora Nuestras Facultades y Cursos Disponibles
          </h2>
          <p className="home-welcome-parrafo">
            Explora tu camino hacia el éxito académico con rutas de aprendizaje
            personalizadas. Prepárate para ingresar a la universidad,
            <span>¡Inicia tu viaje educativo hoy mismo!</span>
          </p>

          <button className="f-btn btn--l-white px-3 py-2 btn-watch-fac" onClick={handleScrollSmooth}>
            Ver facultades
          </button>
        </div>
        <div className="home-welcome-img" style={{ aspectRatio: "16/9" }}>
          <img src={img} alt="" />
        </div>
      </section>
      <RecentClass />

      {loading ? (
        <div className="p-3 skeleton-lp">
          <Skeleton height={150} className="mb-2" />
          <Skeleton height={150} className="mb-2" />
          <Skeleton height={150} className="mb-2" />
        </div>
      ) : (
        <Paths roads={roads} />
      )}
      <Footer />
    </div>
  );
}
