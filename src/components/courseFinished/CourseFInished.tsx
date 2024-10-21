
import { useParams } from 'react-router'
import './courseFinished.css'
import { useEffect, useState } from 'react';
import { AxiosService } from '../../service/api.service';
import { Course, Road } from '../..//models/models'
import { Header } from '../global/header/Header';
import { Link } from 'react-router-dom';
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface AppState {
    course: Course,
    path: Road
}
function CourseFInished() {
  const {idCourse } = useParams();

  const [course, setCourse] = useState<AppState["course"]>();
  const [, setPath] = useState<AppState["path"]>();
  useEffect(() => {
    getInfo()
  },[])

  const getInfo = async () => {
    try {
      const url = "api/course-sample";
      const params = {
        idCourse: idCourse?.split("-")[0],
      }
      const response: any = await AxiosService.get(url, params);
      if(response.success){
          setCourse(response.data.course)
          setPath(response.data.path)
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='course-finished-container'>
    <Header/>
    <div className='course-finished'>
      <div>
        <h2 className='course-finished-title'>Felicidades</h2>
        <h2>Has finalizado el curso</h2>
        <h5>Que aprendiste:</h5>
        <main className='course-finished-content'>
            <div className='course-finished-you_learn' dangerouslySetInnerHTML={{ __html: course?.you_learn ?? '' }} />
            <div>
              <img src={APIURLIMG + course?.url_image} />
            </div>
        </main>

        <p className='mt-2'>Gracias por tu apoyo</p>
        <Link to={"/rutas"}>
          <button className='btn btn--primary' >Ir al inicio</button>
        </Link>
        </div>
     </div>
    </div>
  )
}

export default CourseFInished