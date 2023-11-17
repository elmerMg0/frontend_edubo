import { useEffect, useState } from "react"
import { Header } from "../../components/landing/Header"
import './path.css'
import { APISERVICE, AxiosService } from "../../service/api.service"
import { Footer } from "../../components/global/footer/Footer"
import { useParams } from "react-router"
import { Course, Road } from "../../models/models"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"
import SkeletonGlobal from "../../components/global/skeleton/SkeletonGlobal"

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface AppState {
    road: Road | null,
    courses: Course[]
}
export function Path() {

    const [road, setRoad] = useState<AppState['road']>(null)
    const [courses, setCourses] = useState<AppState['courses']>([])
    const { path } = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getPaths();
    }, [])

    const getPaths = async () => {
        setLoading(true)
        const url = 'ruta-aprendizaje/get-roads-with-courses/?'
        const params = {
            idRoad: path?.split('-')[0],
        }
        const res = await AxiosService.get(url, params);
        if (res.success) {
            console.log(res)
            setRoad(res.data.pathInfo)
            setCourses(res.data.courses)
        }
        setLoading(false)
    }

    return (
        <div className="home">
            <Header>
            </Header>

            <section className="home-welcome">
                <h2 className="home-welcome-title">{road?.nombre || <SkeletonGlobal width="100%" height="20px" borderRadius="0px" cards={1}/>}</h2>
                <p className="path-welcome-parrafo">{road?.subtitle || <SkeletonGlobal width="100%" height="20px" borderRadius="0px" cards={1}/>}</p>
                {
                    loading ? <SkeletonGlobal width="100%" height="200px" borderRadius="10px" cards={1}/> :
                    <div className="path-welcome-img">
                        <img src={APIURLIMG + road?.url_image} alt="" />
                    </div>
                }
                <p className="path-welcome-parrafo">
                  Estos cursos son solo el comienzo de tu viaje hacia una educación superior que te preparará para enfrentar los desafíos del mundo tecnológico moderno
                </p>
                <h4 className="path-welcome-parrafo">
                   Nuestra oferta académica incluye:
                </h4>

            </section>


            <div className="path-courses">
                <ul>
                    {
                        courses?.length > 0 ? courses.map((course: Course) => {
                            return (
                                <Link to={`/${PrivateRoutes.RUTAS}/${path}/${course.id + '-' + course.slug}`} key={course.id}>
                                    <li className="card-course">
                                        <div className="card-course-img">
                                           {/*  <img src={`${APIURLIMG + course?.url_image}`} alt="" /> */}
                                            <img src={`${APIURLIMG}${course?.url_image}`} alt="" />
                                        </div>
                                        <div className="card-course-info">
                                            <h4>{course.name}</h4>
                                            <p>{course.subtitle}</p>
                                        </div>
                                    {/*    <button className="f-btn">Ver mas</button> */}
                                    </li>
                                </Link>
                            )
                        })
                            :
                        <>
                            {
                                loading ? 
                                <>
                                <SkeletonGlobal width="100%" height="30px" borderRadius="0px" cards={3}/>
                                <SkeletonGlobal width="100%" height="300px" borderRadius="10px" cards={1}/>
                                </>
                                : 
                                <p>No hay cursos disponibles</p>
                            }
                            
                        </>

                    }
                </ul>
            </div>
                        
            <Footer />
        </div>
    )
}