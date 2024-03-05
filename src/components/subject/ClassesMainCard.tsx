import { useEffect, useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { ClassWithSubject } from "../../components/course/Course"
import { SubjectList } from "./SubjectList"
import { useParams } from "react-router"

interface Props {
    clase: ClassWithSubject,
    progress: String[]
    subscribed: boolean
}
export function ClassMainCard({ clase, progress, subscribed }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const { idClass } = useParams();

    useEffect(() => {
        if( Number(idClass) === clase.numero_clase){
            toggleSubjects();
        }else{
            setIsOpen(false)
        }
    },[idClass])

    const toggleSubjects = () => {
        setIsOpen(!isOpen)
    }
   
    return (
        <div className={`class-card ${Number(idClass) === clase.numero_clase ? 'active' : ''}`} key={clase.id}>
            <button className="f-btn" onClick={toggleSubjects}>
                <span className="class-card-header">
                    <span className="class-card-title">{clase.numero_clase + ". " + clase.titulo}</span>
                    <span className="class-card-icon">
                        {
                            isOpen ? <BsChevronDown /> : <BsChevronUp />
                        }
                    </span>
                </span>
                <span className="class-card-description">{clase.descripcion}</span>
            </button>

            <SubjectList subjects={clase.subjects} isOpen={isOpen} nroClass={clase.numero_clase} progress={progress} subscribed={subscribed}/>
        </div>
    )
}