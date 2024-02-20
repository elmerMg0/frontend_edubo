import { ClassWithSubject } from "./Course";
import { ClassCard } from "./ClassCard";
interface Props {
  classes: ClassWithSubject[];
}
export function Classes({ classes }: Props) {
  return (
    <section className="course-classes">
      <div className="course-classes-content">
        <h2 className="course-classes-title">Temario del curso</h2>
        <div className="course-classes-container">
          {classes?.length > 0
            ? classes.map((clase: ClassWithSubject) => (
                <ClassCard clase={clase} key={clase.id} />
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}
