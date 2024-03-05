import { BiLock } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import { typePlans } from "../../utilities/constans"

function Suscribe() {

  const { idCourse } = useParams();
  return (
    <div className="suscribe">
        <BiLock size={20}/>
        <p className="m-0">Suscribe a un plan para continuar</p>
        <Link to={`/precios/${typePlans.course}/${idCourse?.split("-")[0]}`}>
         <button className="f-btn btn--padding btn--l-white">Suscribirme</button>
        </Link>
    </div>
  )
}

export default Suscribe