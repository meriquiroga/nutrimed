import { Link } from "react-router-dom"
import { connect } from "react-redux"

const ProfileUser = (props) => {
   return (
      <div className="profile">
         <div className="leftProfile">
            <img className="profileImg"
               src={props.user.src}
               alt="profile"
            />
            <h4>Bienvenido/a, {props.user.name}</h4>
            <p>
               Para poder sacar turno es necesario completar tus datos haciendo click
               en el siguiente botón.
            </p>
            <button><Link to={!props.user.doc ? "/patient/profile" : "/doctor/profile"}>
               COMPLETÁ TU PERFIL
            </Link></button>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <p>Nombre: {props.user.name}</p>
                  <p>Apellido: {props.user.lastName}</p>
                  <p>DNI: {!props.user.dni ? "A completar en su perfil" : props.user.dni}</p>
                  <p>Domicilio: {!props.user.data.direction.street ? "A completar en su perfil" : props.user.data.direction.street, props.user.data.direction.num}</p>
                  <p>Teléfono: {!props.user.data.phoneNumber ? "A completar en su perfil" : props.user.data.phoneNumber}</p>
                  <p>E-mail: {props.user.data.mail}</p>
               </div>
               <div>
                  <img className="profileImg" src="/assets/date-picker-fxa.jpg" alt=""/>
               </div>
            </div>
         </div>
         <div className="rightProfile">
             {!props.user.doc ? <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4> : <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>}
             {!props.user.doc ? <p className="turnos">No tenés turnos programados.</p> : <h5 className="turnos">No tenes pacientes por el momento</h5>}
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