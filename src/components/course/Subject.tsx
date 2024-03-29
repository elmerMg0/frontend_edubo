import { AiOutlineLock } from "react-icons/ai";
import { Subject } from "../../models/models";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { FaRegCirclePlay } from "react-icons/fa6";

interface Props {
  subjects: Subject[];
  isOpen: boolean;
  nroClase: number | undefined;
  subscribed: boolean;
}
export function Subject({ subjects, isOpen, nroClase, subscribed }: Props) {
  const { path, idCourse } = useParams();
  const navigate = useNavigate();
  const basePath = `/${PrivateRoutes.RUTAS}/${path}/${idCourse}/`;
  const openClass = (type: string, slug: string) => {
    if (type === "video") {
      navigate(`${basePath}${nroClase}/${slug}`);
    } else {
      navigate(`${basePath}${nroClase}/quiz/${slug}`);
    }
  };

  return (
    <div className={`class-card-subjects ${isOpen ? "active" : ""}`}>
      <ul>
        {subjects?.length > 0
          ? subjects?.map((subject) => {
              return (
                <li key={subject.id}>
                  <button
                    className="f-btn"
                    onClick={() => openClass(subject.type, subject.slug)}
                  >
                    <span className="class-card-title">
                      <span style={{ minWidth: "14px" }}>
                        {subject.is_public || subscribed ? (
                          <FaRegCirclePlay />
                        ) : (
                          <AiOutlineLock />
                        )}
                      </span>
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
