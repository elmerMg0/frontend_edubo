import { AiOutlineLock } from "react-icons/ai";
import { Subject } from "../../models/models";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { FaRegCirclePlay } from "react-icons/fa6";

interface Props {
  subjects: Subject[];
  isOpen: boolean;
  progress: String[];
  nroClass: number;
  subscribed: boolean;
}
export function SubjectList({
  subjects,
  isOpen,
  progress,
  nroClass,
  subscribed,
}: Props) {
  const { path, idCourse, idSubject, idClass } = useParams();
  const navigate = useNavigate();
  const basePath = `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/`;

  const openClass = (type: string, slug: string) => {
    if (type === "video") {
      navigate(`${basePath}${nroClass}/${slug}`);
    } else {
      navigate(`${basePath}${nroClass}/quiz/${slug}`);
    }
  };

  return (
    <div className={`class-card-subjects ${isOpen ? "active" : ""}`}>
      <ul>
        {subjects?.length > 0
          ? subjects?.map((subject) => {
              return (
                <li
                  key={subject.id}
                  className={`subject-list-item ${
                    progress.some((item: any) => item.subject_id === subject.id)
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className={`f-btn subject-btn ${
                      subject.slug === idSubject && nroClass === Number(idClass)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => openClass(subject.type, subject.slug)}
                  >
                    <span className="class-card-title">
                      <div style={{ minWidth: "14px" }}>
                        {subject.is_public || subscribed ? (
                          <FaRegCirclePlay />
                        ) : (
                          <AiOutlineLock />
                        )}
                      </div>
                      <span>{subject.title}</span>
                    </span>
                    <span>{subject.duration.slice(3, 8)}</span>
                  </button>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
