import { useEffect, useState } from "react"
import { Paths } from "../../components/home/Paths"
import { Header } from "../../components/landing/Header"
import './home.css'
import { APISERVICE, AxiosService } from "../../service/api.service"
import { Footer } from "../../components/global/footer/Footer"
import { Course, Road} from "../../models/models"
import { useParams } from "react-router"

interface AppState {
    roads: Course[],
    pathInfo: Road[]
}

export function Home (){

    const [roads, setRoads] = useState([])
    const [pathInfo, setPathInfo] = useState<AppState['pathInfo']>([])
    const { path } = useParams();

    useEffect(() => {
        getPaths();
    },[])
    
    const getPaths = async () => {
        const url = 'ruta-aprendizaje/get-roads-with-courses/?'
        const params = {
            idRoad: path?.split("-")[0],
            nameRoad: ''
        }
        const  res = await AxiosService.get(url, params);
        if(res.data.success){
            setRoads(res.data.courses) 
            setPathInfo(res.data.pathInfo) 
        }
    }
    console.log(pathInfo)
    return (
        <div className="home">
            <Header>    
            </Header>

            <section className="home-welcome">
                <h2 className="home-welcome-title">Rutas de Aprendizaje</h2>
                <p className="home-welcome-parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                <span>
                    Impedit minus mollitia corrupti distinctio est optio nobis incidunt.
                </span>
                    </p>
                <div className="home-welcome-img">
                    <img src="https://www.umss.edu.bo/wp-content/uploads/2022/03/laboratorios_fcyt.jpg" alt="" />
                </div>
            </section>

            <Paths roads={roads}/>
            <Footer/>
        </div>
    )
}