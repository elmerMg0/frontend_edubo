import { Link } from "react-router-dom"
import { AppStore } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { APISERVICE,  } from "../../../service/api.service";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;


interface RecentClassses{
  courseId: number,
  create_ts: string,
  learningPathSlug: string,
  name: string,
  numero_clase: number,
  slug: string,
  subjectSlug: string,
  thumbnailurl: string,
  title: string,
  url_image: string,
  id: number
}
interface AppState {
  recentClasses: RecentClassses[]
}
function RecentClass() {
  const user = useSelector((store: AppStore) => store.user);


  const [recentClasses, setRecentClasses] = useState<AppState['recentClasses']>([]); 
  useEffect(() => {
    getInfo()
  },[])

  const getInfo = async () => {
    try {
      const url = "api/recent-class";
      const body = {
        idStudent: user.id
      }
      const response = await APISERVICE.post(body, url, '');
      if(response.success){
          setRecentClasses(response.data.recentClasses)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  return (
    <section className="recent-classes container-content">
        <h6>{user.name}, continua aprendiendo </h6>
        <div className="carousel-lp-container">
          <ul className="carousel-lp">
            {recentClasses?.length > 0
              ? recentClasses?.map((road) => (
                <Link
                to={`/rutas/${road.learningPathSlug}/${road.courseId}-${road.slug}/${road.numero_clase}/${road.subjectSlug}`}
                key={road.id}
              >
                <li className="card-recent-class">
                  <div className="card-recent-class-img">
                    <img src={`${road?.thumbnailurl}`} alt="" />
                  </div>
                  <div className="card-recent-class-info">
                    <div className="card-recent-class-info-img">
                        <img src={`${APIURLIMG}${road?.url_image}`} />
                    </div>
                      <div className="w-100">
                        <h6>{road.title}</h6>
                        <p>Curso de {road.name}</p>
                    </div>
                  </div>
                </li>
              </Link>
                ))
              : 'Rutas de aprendizaje personalizadas'}
          </ul>
        </div>
    </section>
  )
}

export default RecentClass