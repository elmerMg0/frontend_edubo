import { useEffect, useState } from "react"
import { Paths } from "../../components/home/Paths"
import { Header } from "../../components/landing/Header"
import './home.css'
import { APISERVICE, AxiosService } from "../../service/api.service"
import { Footer } from "../../components/global/footer/Footer"
export function Home (){

    const [roads, setRoads] = useState([])

    useEffect(() => {
        getPaths();
    },[])
    
    const getPaths = async () => {
        const url = 'ruta-aprendizaje/get-roads-with-courses/?'
        const params = {
            idRoad: '',
            nameRoad: ''
        }
        const  res = await AxiosService.get(url, params);
        if(res.success){
            setRoads(res.courses) 
        }
    }
    
    return (
        <div className="home">
            <Header>    
            </Header>

            <section className="home-welcome">
                <h2 className="home-welcome-title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                <p className="home-welcome-parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                <span>
                    Impedit minus mollitia corrupti distinctio est optio nobis incidunt.
                </span>
                    </p>
                <div className="home-welcome-img">
                    <img src="https://edteam-media.s3.amazonaws.com/campaigns/conversion/course-minibanner-picture.webp" alt="" />
                </div>
            </section>

            <Paths roads={roads}/>
            <Footer/>
        </div>
    )
}