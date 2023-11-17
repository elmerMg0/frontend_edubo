import { AiOutlineLock } from "react-icons/ai"
import { Subject } from "../../models/models"
import { Link, useParams } from "react-router-dom"
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

    const basePath = `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/`;

    return (
        <div className={`class-card-subjects ${isOpen ? 'active' : ''}`}>
            <ul>
                {
                    subjects?.length > 0 ? subjects?.map((subject) => {
                        return (
                            <li key={subject.id} className={`subject-list-item ${progress.some((item: any) => item.subject_id === subject.id) ? 'active' : ''}`}>
                                <Link className="w-100" style={{ textDecoration: 'none' }} to={`${basePath}${nroClass}/${subject.slug}`}>
                                    <button className={`f-btn subject-btn ${(subject.slug === idSubject && nroClass === Number(idClass)) ? 'active' : ''}`}>
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
                                </Link>
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