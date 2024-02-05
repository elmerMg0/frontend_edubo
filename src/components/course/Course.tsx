import { useEffect, useState } from "react";
import { Header } from "../global/header/Header";
import './course.css'
import { AxiosService } from "../../service/api.service";
import { CourseServiceName } from "../../service/apiServiceNames";
import { Class, Course, Subject } from "../../models/models";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBarChartLine } from "react-icons/bs";
import { Footer } from "../global/footer/Footer";
import { Classes } from "./Classes";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

export interface ClassWithSubject extends Class{
    subjects: Subject[]
}
interface AppState {
    course: Course | null, 
    classes: ClassWithSubject[]
}

export function Course (){
    const [course, setCourse] = useState<AppState['course']>(null)
    const [classes, setClasses] = useState<AppState['classes']>([])

    const [loading, setLoading] = useState(false)
    const { idCourse } = useParams()

    useEffect(() => {
        getCourseInfo()
        window.scrollTo(0, 0);
    },[])

    const getCourseInfo = async () => {
            try {
              setLoading(true)
              let params = {
                idCourse: idCourse?.split('-')[0],
                isActive: true,
              }
              const response = await AxiosService.get(CourseServiceName.COURSE, params);
              if(response){
                  const { data } = response;
                  setCourse(data.course);
                  setClasses(data.classes)
                }
            } catch (error) {
              
            } finally{
              setLoading(false);
            }
    }

    if(loading){
        return <div className="course">
            <Skeleton height={'300px'}/>
            <div className="course-info">
                <Skeleton height={'30px'} width={'30%'}/>
                <Skeleton height={'50px'}/>
                <br/>
                <Skeleton height={'20px'} width={'50%'}/>
                <Skeleton height={'20px'} width={'30%'}/>
                <Skeleton height={'20px'} width={'50%'}/>
                <Skeleton height={'20px'} width={'40%'}/>
                <Skeleton height={'20px'} width={'50%'}/>
                <Skeleton height={'20px'} width={'50%'}/>
                <br/>
                <Skeleton height={'250px'}/>
                
            </div>
        </div>
    }

    const getMotnth = (date: string | undefined) => {
        if(!date) return 1;
        return date.slice(5,7);
    }
    return (
        <div className="course">
            <Header setIsOpen={() => {}}>
            </Header>

            <div className="course-img">
                    <img src={`${APIURLIMG + course?.url_image}`} alt="" />
            </div>

            <section className="course-info">
             
                <h1 className="course-title">{course?.name}</h1>
                <p className="course-subtitle">{course?.subtitle}</p>

                <div className="course-profit">
                    <p>Que aprenderas?</p>
                    <ul className="test" dangerouslySetInnerHTML={{ __html: course?.you_learn ?? '' }} />
                </div>


                <div className="course-date">
                    <span className="course-feature-item">
                        <FaRegCalendarAlt/>
                        <span>
                            {getMotnth(course?.create_ts)}{" "}
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

            <Classes classes={classes}/>
        
            <article className="course-about">
                <div className="course-about-content">

                <h2 className="course-about-title">Acerca de este curso</h2>
                <div className="course-about-description" dangerouslySetInnerHTML={{ __html: course?.informacion ?? '' }} />
                </div>
            </article>

            <Footer/>
        </div>
    )
}