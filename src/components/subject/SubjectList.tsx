import { AiOutlineLock } from "react-icons/ai"
import { Subject } from "../../models/models"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes";
import { FaRegCirclePlay } from "react-icons/fa6";

interface Props {
    subjects: Subject[],
    isOpen: boolean,
    progress: String[],
    nroClass: number
}
export function SubjectList({ subjects, isOpen, progress, nroClass}: Props) {
    const {path, idCourse, idSubject, idClass } = useParams();
    const navigate = useNavigate()
    const basePath = `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/`;

    const openClass = ( type: string, slug: string) => {
        console.log(type)

        if(type === 'video'){
            navigate(`${basePath}${nroClass}/${slug}`)
        }else{
            navigate(`${basePath}${nroClass}/quiz/${slug}`)
        }
    }

    return (
        <div className={`class-card-subjects ${isOpen ? 'active' : ''}`}>
            <ul>
                {
                    subjects?.length > 0 ? subjects?.map((subject) => {
                        return (
                            <li key={subject.id} className={`subject-list-item ${progress.some((item: any) => item.subject_id === subject.id) ? 'active' : ''}`}>
                               {/*  <Link className="w-100" style={{ textDecoration: 'none' }} to={`${basePath}${nroClass}/${subject.slug}`}> */}
                                    <button className={`f-btn subject-btn ${(subject.slug === idSubject && nroClass === Number(idClass)) ? 'active' : ''}`} onClick={() => openClass(subject.type, subject.slug)}>
                                        <span className="class-card-title">
                                            {
                                                subject.is_public ? 
                                                <FaRegCirclePlay />
                                                :
                                                <AiOutlineLock />
                                            }
                                            <span>{subject.title}</span>
                                        </span>
                                        <span>{subject.duration.slice(3, 8)}</span>
                                    </button>
                               {/*  </Link> */}
                            </li>
                        )
                    })
                        :
                        ''
                }
            </ul>
        </div>
    )
}