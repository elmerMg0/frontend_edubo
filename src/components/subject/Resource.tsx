import { FileI, Resource } from "../../models/models";
import "./subject.css";
import { FaCloudDownloadAlt } from "react-icons/fa";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props {
  resources: Resource[];
  files: FileI[];
}
export function ResourceComponent({ resources, files }: Props) {
  return (
    <section className="subject-resource">
      <h4 className="title-section-subject">Recursos de la clase</h4>
      {resources?.length > 0 ? (
        resources.map((resource: Resource) => (
          <div
            key={resource.id}
            className="subject-resource-card"
            dangerouslySetInnerHTML={{ __html: resource.descripcion }}
          />
        ))
      ) : (
        <p>Estamos trabajando en la expansión de los recursos disponibles.</p>
      )}

      <h4 className="title-section-subject mt-3">Archivos de la clase</h4>

      <ul className="files-list">
        {files?.length > 0 &&
          files.map((file: FileI) => {
            return (
              <li
                key={file.id}
                className="subject-resource-card subject-resource__item"
              >
                <a className="d-flex align-items-center gap-2 justify-content-between" href={APIURLIMG + file.file_url} download={file.name} target="_blank">
                  <h5>{file.name}</h5>
                  <span>
                      <FaCloudDownloadAlt/>
                  </span>
                </a>
                <p className="m-0">Tamaño: {file.size}</p>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
