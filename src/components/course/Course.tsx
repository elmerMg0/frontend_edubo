import { useEffect, useState } from "react";
import { Header } from "../landing/Header";
import './course.css'
import { AxiosService } from "../../service/api.service";
import { CourseServiceName } from "../../service/apiServiceNames";
import { Class, Course } from "../../models/models";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBarChartLine } from "react-icons/bs";
import { Footer } from "../global/footer/Footer";

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const idCOurse = 1;

interface AppState {
    course: Course | null, 
    class: Class []
}

const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

export function Course (){
    const [course, setCourse] = useState<AppState['course']>(null)
    const [classes, setClasses] = useState<AppState['class']>([])

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getCourseInfo()
    },[])

    const getCourseInfo = async () => {
            try {
              setLoading(true)
              let params = {
                  idCourse: idCOurse
              }
              //const response = 
              //const { success, courses , pageInfo } = await APISERVICE.get(courseserviceName.GET, params);
              const response = await AxiosService.get(CourseServiceName.COURSE, params);
              if(response){
                  const { data} = response;
                  setCourse(data.course);
                  setClasses(data.classes)
                  //setPageInfo(pageInfo);
                }
            } catch (error) {
              
            } finally{
              setLoading(false);
            }
    }
    return (
        <div className="course">
            <Header>
                <p>lo</p>
            </Header>

            <div className="course-img">
                    <img src={`${APIURLIMG + course?.url_image}`} alt="" />
            </div>

            <section className="course-info">
             
                <h1 className="course-title">{course?.name}</h1>
                <p className="course-subtitle">{course?.subtitle}</p>

                <div className="course-profit">
                    <p>Que aprenderas?</p>
                    <ul className="test" dangerouslySetInnerHTML={{ __html: course?.you_learn }} />
                </div>


                <div className="course-date">
                    <span className="course-feature-item">
                        <FaRegCalendarAlt/>
                        <span>
                            {monthNames[course?.create_ts?.slice(5,7)-1]}{" "}
                            {course?.create_ts.slice(8,10)}
                        </span>
                    </span>
                    <span>
                        <BsBarChartLine/>
                        {course?.nivel}
                    </span>
                    {/* Btn comprar */}
                        
                </div>
                <button className="f-btn course-btn">Proximamente</button>
                <p className="course-b-btn">*Prueba la experiencia Edubo</p>
            </section>

            <section className="course-classes">
                <h2 className="course-classes-title">Temario del curso</h2>
                <div className="course-classes-container">
                {
                    classes?.length > 0 ? classes.map((clase: Class) => (
                        <div className="class-card" key={clase.id}>
                            <button className="f-btn">
                                <span className="class-card-title">{clase.numero_clase + ". " + clase.titulo}</span>
                                <span className="class-card-description">{clase.descripcion}</span>
                            </button>
                        </div>  
                    ))
                    :
                    ''
                }
                </div>
            </section>

            <article className="course-about">
                <div className="course-about-content">

                <h2 className="course-about-title">Acerca de este curso</h2>
                <div className="course-about-description" dangerouslySetInnerHTML={{ __html: course?.informacion }} />
                </div>
            </article>

            <Footer/>
        </div>
    )
}