import { Course, Road } from "../../models/models"

interface RoadWithCourses extends Road{
    cursos: Course[]
}
interface Props{
    roads: RoadWithCourses[]
}

export function Paths({roads}: Props){
    

    const handleGetCourse = () => {}

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
                                <section className="course-card" key={course.id}>
                                    <img src="https://static.platzi.com/media/achievements/1393-88e062fc-31f2-4e1e-9cd9-d9bd96e6a319.png" alt="" />
                                    <p className="roads-card-parrafo">{course.titulo}</p>

                                </section>
                            )
                        }): 'No hay cursos'
                      }
                    </div>

                    <section className="course-card course-card-nro">
                        <img src="https://static.platzi.com/media/achievements/1393-88e062fc-31f2-4e1e-9cd9-d9bd96e6a319.png" alt="" />

                        <p className="road-card-nrocouses">+{road.numero_cursos - 2} cursos mas</p>
                    </section>
                
                    <button className="f-btn btn-road-start" onClick={handleGetCourse}>Iniciar Ruta</button>
                </article>
            ))}
        </div>
    )
}