import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import "./simulation.css";
import { AxiosService } from "../../service/api.service";
import { Road } from "../../models/models";
import { useNavigate } from "react-router-dom";
import { Footer } from "../global/footer/Footer";
import Skeleton from "react-loading-skeleton";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface AppState {
  roads: Road[];
}
function Simulation() {
  const [roads, setRoads] = useState<AppState["roads"]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getRoads();
  }, []);

  const getRoads = async () => {
    setLoading(true);
    try {
      const url = "api/learning-paths/";
      const res = await AxiosService.get(url, "");
      if (res) {
        setRoads(res.data.roads);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulation">
      <Header />
      <h4 className="text-center mt-3">Simuladores actualizados 2024</h4>
      <p className="text-center mb-4">Descubre los mejores simuladores</p>
      <ul className="simulation-roads mb-5">
        {roads?.length > 0
          ? roads.map((road: Road) => {
              return (
                <li key={road.id} className="simulation-road">
                  <div className="simulation-road-img">
                    <img src={APIURLIMG + road.url_image} />
                  </div>
                  <div className="simulation-road-info">
                    <h4>{road.nombre}</h4>
                    <p className="mb-2">{road.descripcion}</p>
                    <button className="simulation-road-btn" onClick={() => {navigate(`/simulacros/${road.id}`)}}>Ver mas</button>
                  </div>
                </li>
              );
            })
          : 
          <>
            { loading ? <Skeleton count={5} height={300}/> : <p>Se esta trabajando en esta seccion</p> }
          </>
          }
      </ul>
      <Footer/>
    </div>
  );
}

export default Simulation;
