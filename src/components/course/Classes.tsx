import { ClassWithSubject } from "./Course";
import { ClassCard } from "./ClassCard";
interface Props {
  classes: ClassWithSubject[];
  subscribed: boolean;
}
export function Classes({ classes, subscribed }: Props) {
  return (
    <section className="course-classes">
      <div className="course-classes-content">
        <h2 className="course-classes-title">Temario del curso</h2>
        <div className="course-classes-container">
          {classes?.length > 0
            ? classes.map((clase: ClassWithSubject) => (
                <ClassCard clase={clase} key={clase.id} subscribed={subscribed} />
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}
