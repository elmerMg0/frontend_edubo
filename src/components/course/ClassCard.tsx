import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useState } from "react"
import { Subject } from "./Subject"
import { ClassWithSubject } from "./Course"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

interface Props {
    clase: ClassWithSubject,
}
export function ClassCard({ clase }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSubjects = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="class-card" key={clase.id}>
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

            <Subject subjects={clase.subjects} isOpen={isOpen} classId={clase.id} />
        </div>
    )
}