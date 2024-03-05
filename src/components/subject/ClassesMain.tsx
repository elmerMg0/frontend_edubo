import { ClassWithSubject } from "../../components/course/Course"
import { ClassMainCard } from "./ClassesMainCard"

interface Props {
    classes: ClassWithSubject[],
    progress: String[]
    suscribed: boolean
}
export function ClassesMain({ classes, progress, suscribed }: Props) {
    return (
        <section className="course-classes">
            <h2 className="course-classes-title">Temario del curso</h2>
            <div className="course-classesmain-container">
                {
                    classes?.length > 0 ? classes.map((clase: ClassWithSubject) => (
                        <ClassMainCard clase={clase} key={clase.id} progress={progress} subscribed={suscribed}/>
                    ))
                    :
                    ''
                }
            </div>
        </section>
    )
}