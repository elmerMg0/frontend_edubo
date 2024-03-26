import { Link } from "react-router-dom";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props{
    url: string,
    children: React.ReactNode,
    urlImage?: string 
}
function PathCourse({url, children, urlImage}: Props) {
  return (
    <Link
      to={`${url}`}
    >
      <li className="card-course">
        <div className="card-course-img">
          <img src={`${APIURLIMG}${urlImage}`} alt="" />
        </div>
        <div className="card-course-info">
          {children}
        </div>
      </li>
    </Link>
  );
}

export default PathCourse;
