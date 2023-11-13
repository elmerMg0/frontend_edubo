import { useEffect, useState } from "react"
import { Road } from "../../models/models"
import { AxiosService } from "../../service/api.service"
import { ArrowRight } from "../global/icons/Icons"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"

interface AppState {
    roads: Road[]
}
export function Carousel(){
    const [roads, setRoads] = useState<AppState['roads']>([])

    useEffect(() => {
        getRoads()
    },[])

    const getRoads = async () => {
        const url = 'ruta-aprendizaje/index/?'
        const params = {
            name: ''
        }
        const  res = await AxiosService.get(url, params);
        console.log(res)
        if(res.success){
            setRoads(res.roads) 
        }
    }
    console.log(roads)

    return(
        <section className="section-carousel">
            <h2 className="section-carousel-title">Potencia lo que ya sabes</h2>
            <p className="section-carousel-parrafo">Elige una ruta de aprendizaje y sigue un orden de cursos sobre temas o áreas específicas, de forma ágil y guiada.</p>
            <div className="carousel-container">
                <div className="carousel">

                {   
                    roads?.length > 0 ? roads?.map((road, index) => (
                        <Link key={road.id} to={`${PrivateRoutes.RUTAS}/${road.id}-${road.slug}`}>
                            <div className="carousel-card" key={index}>
                            
                            <div>
                                <div className="carousel-card-info">
                                    <span>Ruta</span>
                                    <span>{road.numero_cursos} Cursos</span>
                                </div>
                                <h3 className="carousel-card-title">{road.nombre}</h3>
                                <p className="carousel-card-parrafo"> {road.descripcion} </p>
                            </div>
                            
                            <span   className="carousel-card-link">Ir a ruta
                            <ArrowRight/>
                            </span>
                            </div>
                        </Link>
                    )): "No hay rutas de aprendizaje"
                }
                </div>
            </div>
        </section>
    )
}