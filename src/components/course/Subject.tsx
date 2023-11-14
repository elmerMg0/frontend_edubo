import { AiOutlineLock } from "react-icons/ai"
import { Subject } from "../../models/models"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"

interface Props{
    subjects: Subject[],
    isOpen: boolean,
    nroClase: number | undefined
}
export function Subject({subjects, isOpen, nroClase}:Props){
    return(
        <div className={`class-card-subjects ${isOpen ? 'active': ''}`}>
            <ul>
            {
                subjects?.length > 0 ? subjects?.map((subject) => {
                    return(
                        <li key={subject.id}>
                            <Link style={{textDecoration: 'none'}} to={`${nroClase}/${subject.slug}`}>
                                <button className="f-btn">
                                    <span className="class-card-title">
                                        <AiOutlineLock/>
                                        <span>{subject.title}</span>
                                    </span>
                                    <span>{subject.duration.slice(3,8)}</span>
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