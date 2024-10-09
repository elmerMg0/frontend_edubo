import { ClassWithSubject } from "./Course";
import { ClassCard } from "./ClassCard";
interface Props {
  classes: ClassWithSubject[];
  subscribed: boolean;
  progress: number;
}
export function Classes({ classes, subscribed, progress }: Props) {
  return (
    <section className="course-classes container-content">
      <div className="course-classes-content">
        <h4 className="course-classes-title">Temario del curso</h4>
        <div className="d-flex align-items-center gap-3">
          <progress
            className="progressBar progressBar-course"
            id="progressBar"
            value={progress * 100}
            max="100"
          ></progress>
          <p style={{whiteSpace: 'nowrap', color: 'var(--colorGris)', fontSize: '0.8rem'}}>{progress * 100}% Completado</p>
        </div>
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
