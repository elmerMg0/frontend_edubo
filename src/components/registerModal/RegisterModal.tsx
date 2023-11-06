import './registerModal.css'
export function RegistrerModal(){
    return(
        <div className='register-modal'>
            <p>Iniciar Sesion</p>
            <div>
                <button>Google</button>
                <button>Facebook</button>
            </div>
            <hr />

            <p>O usa tu correo electronico</p>
            <form>
                <label htmlFor="email">Correo Electronico</label>
                <input type="text" />
                <label htmlFor="contrasenia">Contrasenia</label>
                <input type="password" />
                <button type='submit'>Iniciar Sesion</button>
            </form>

            <p>No tienes una cuenta? Registrate gratis</p>
        </div>
    )
}