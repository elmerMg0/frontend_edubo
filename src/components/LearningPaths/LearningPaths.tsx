import { useEffect, useState } from "react"
import { Header } from "../global/header/Header"
import './learningPaths.css'
import { AxiosService } from "../../service/api.service"
import { Footer } from "../global/footer/Footer"
import { useParams } from "react-router"
import { Paths } from "./Paths"
import img from '../../assets/img/umssLight.jpg'

export function LearningPaths (){

    const [roads, setRoads] = useState([])
    const { path } = useParams();

    useEffect(() => {
        getPaths();
        window.scrollTo(0, 0);
    },[])
    
    const getPaths = async () => {
        const url = 'ruta-aprendizaje/get-roads/?'
        const params = {
            idRoad: path?.split("-")[0] ? path?.split("-")[0] : '',
            nameRoad: ''
        }
        const  res = await AxiosService.get(url, params);
        if(res){
            setRoads(res.data.courses) 
        }
    }
    return (
        <div className="home">
            <Header setIsOpen={() => {}}>    
            </Header>

            <section className="home-welcome">
                <h2 className="home-welcome-title">Rutas de Aprendizaje</h2>
                <p className="home-welcome-parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                <span>
                    Impedit minus mollitia corrupti distinctio est optio nobis incidunt.
                </span>
                    </p>
                <div className="home-welcome-img">
                    <img src={img} alt="" />
                </div>
            </section>

            <Paths roads={roads}/>
            <Footer/>
        </div>
    )
}