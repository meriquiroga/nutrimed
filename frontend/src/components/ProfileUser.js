import { Link } from "react-router-dom"
import { connect } from "react-redux"

const ProfileUser = (props) => {
   return (
      <div className="profile">
         <div className="ladoProfile">
            <img
               className="profileImg"
               src={props.user.src}
               alt="profile"
            />
            <h5>Bienvenido {props.user.name}</h5>
            <p>
               Para poder sacar turno puedes completar tus datos haciendo click
               en el siguiente enlace
            </p>
            <Link className="linkCompleta" to={!props.user.doc ? "/patient/profile" : "/doctor/profile"}>
               Complete su perfil
            </Link>
         </div>
         <div>
            <div className="centroProfile">
               <h1 className="tituloProfile">MIS DATOS</h1>
               <div className="datosProfile">
                  <h4>Nombre: {props.user.name}</h4>
                  <h4>Apellido: {props.user.lastName}</h4>
               </div>
               <div className="datosProfile">
                  <h4>DNI: {!props.user.dni ? "A completar en su perfil" : props.user.dni}</h4>
                  <h4>Direccion: {!props.user.data.direction.street ? "A completar en su perfil" : props.user.data.direction.street, props.user.data.direction.num}</h4>
               </div>
               <div className="datosProfile">
                  <h4>Telefono: {!props.user.data.phoneNumber ? "A completar en su perfil" : props.user.data.phoneNumber}</h4>
                  <h4>Email: {props.user.data.mail}</h4>
               </div>
               
            </div>
         </div>
         <div className="ladoProfile">
             {!props.user.doc ? <h3 className="proxTurnos">PROXIMOS TURNOS</h3> : <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>}
             {!props.user.doc ? <h5 className="turnos">No tenes turnos por el momento</h5> : <h5 className="turnos">No tenes pacientes por el momento</h5>}
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      user: state.users.dataUser,
   }
}

export default connect(mapStateToProps)(ProfileUser)
