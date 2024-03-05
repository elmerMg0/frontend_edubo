import { RegistrerModal } from "../../components/registerModal/RegisterModal"
import './login.css'
function Login() {
  return (
    <div className="login">
        <RegistrerModal isOpen={true} toggleModal={() => {}} />
    </div>
  )
}

export default Login