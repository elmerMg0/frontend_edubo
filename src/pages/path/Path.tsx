import { useEffect, useState } from "react"
import { Paths } from "../../components/home/Paths"
import { Header } from "../../components/landing/Header"
import './path.css'
import { APISERVICE, AxiosService } from "../../service/api.service"
import { Footer } from "../../components/global/footer/Footer"
import { useParams } from "react-router"
import { Course, Road } from "../../models/models"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface AppState {
    road: Road | null,
    courses: Course[]
}
export function Path() {

    const [road, setRoad] = useState<AppState['road']>(null)
    const [courses, setCourses] = useState<AppState['courses']>([])
    const { path } = useParams()

    useEffect(() => {
        getPaths();
    }, [])

    const getPaths = async () => {
        const url = 'ruta-aprendizaje/get-roads-with-courses/?'
        const params = {
            idRoad: path?.split('-')[0],
        }
        const res = await AxiosService.get(url, params);
        if (res.success) {
            setRoad(res.courses[0])
            setCourses(res.courses[0].cursos)
        }
    }

    return (
        <div className="home">
            <Header>
            </Header>

            <section className="home-welcome">
                <h2 className="home-welcome-title">{road?.nombre}</h2>
                <p className="home-welcome-parrafo">{road?.descripcion}</p>
                <div className="home-welcome-img">
                    <img src="https://edteam-media.s3.amazonaws.com/campaigns/conversion/course-minibanner-picture.webp" alt="" />
                </div>
            </section>

            <div className="path-courses">
                <ul>
                    {
                        courses?.length > 0 ? courses.map((course: Course) => {
                            return (
                                <Link to={`/${PrivateRoutes.RUTAS}/${path}/${course.id + '-' + course.slug}`} key={course.id}>
                                    <li className="card-course">
                                        <div className="card-course-img">
                                            <img src={`${APIURLIMG + course?.url_image}`} alt="" />
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
                            'No hay cursos'
                    }
                </ul>
            </div>
            <Footer />
        </div>
    )
}