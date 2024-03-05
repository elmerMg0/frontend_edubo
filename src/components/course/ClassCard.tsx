import { useState } from "react"
import { Subject } from "./Subject"
import { ClassWithSubject } from "./Course"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

interface Props {
    clase: ClassWithSubject,
    subscribed: boolean
}
export function ClassCard({ clase, subscribed }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSubjects = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={`class-card ${clase.numero_clase === 1 ? 'active' : ''}`} key={clase.id}>
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

            <Subject subjects={clase.subjects} isOpen={isOpen} nroClase={clase.numero_clase}  subscribed={subscribed}/>
        </div>
    )
}