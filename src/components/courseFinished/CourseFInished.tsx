
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
  const [path, setPath] = useState<AppState["path"]>();
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
        <h2>Felicidades</h2>
        <h2>Has finalizado el curso</h2>
        <p>Que aprendiste:</p>
        <main className='course-finished-content'>
            <div className='course-finished-you_learn' dangerouslySetInnerHTML={{ __html: course?.you_learn ?? '' }} />
            <div>
              <img src={APIURLIMG + course?.url_image} />
            </div>
        </main>

        <p>Gracias por tu apoyo</p>
        <Link to={"/rutas"}>
          <button className='f-btn btn--padding btn--l-white' >Ir al inicio</button>
        </Link>
        </div>
     </div>
    </div>
  )
}

export default CourseFInished