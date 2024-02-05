import { useNavigate } from "react-router"
import { Course, Road } from "../../models/models"
import { PrivateRoutes } from "../../models/routes"
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG
interface RoadWithCourses extends Road{
    cursos: Course[]
}
interface Props{
    roads: RoadWithCourses[]
}

export function Paths({roads}: Props){
    const navigate = useNavigate()

    const handleGetCourse = (road: RoadWithCourses) => {
        navigate(`/${PrivateRoutes.RUTAS}/${road.id}-${road.slug}`)
    }

    return (
        <div className="roads">
            {roads?.map((road: RoadWithCourses) => (
                <article className="road-card" key={road.id}>
                    <div className="road-card-info">
                        <span>Ruta</span>
                    </div>

                    <h3 className="road-card-title">{road.nombre}</h3>

                    <div className="road-card-courses">
                      {
                        road.cursos?.length > 0 ? road.cursos.slice(0,2).map((course: Course) => {
                            return(
                                <div className="course-card" key={course.id}>
                                    <img src={APIURLIMG + course.url_image} alt="" />
                                    <p className="roads-card-parrafo">{course.name}</p>
                                </div>
                            )
                        }): <p>No existen cursos disponibles</p>
                      }
                    </div>
                    {
                        road.cursos?.length > 0 &&
                        <section className="course-card course-card-nro">
                            <img src="https://picsum.photos/1" alt="" />
                            <p className="road-card-nrocouses">+{road.numero_cursos - 2} cursos mas</p>
                        </section>
                    }
                
                    <button className="f-btn btn-road-start" onClick={() => handleGetCourse(road)}>Iniciar Ruta</button>
                </article>
            ))}
        </div>
    )
}