import { Link } from "react-router-dom"
import { connect } from "react-redux"

const ProfileUser = (props) => {
   console.log(props)
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
            <Link className="linkCompleta" to={!props.user.newUser.doc ? "/patient/profile" : "/doc/profile"}>
               Complete su perfil
            </Link>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <h4>Nombre: {props.user.newUser.name}</h4>
                  <h4>Apellido: {props.user.newUser.lastName}</h4>
               </div>
               <div className="datosProfile">
                  <h4>DNI: {!props.user.newUser.dni ? "A completar en su perfil" : props.user.newUser.dni}</h4>
                  <h4>Direccion: {!props.user.newUser.data.direction.street ? "A completar en su perfil" : `${props.user.newUser.data.direction.street} ${props.user.newUser.data.direction.num}`}</h4>
               </div>
               <div className="datosProfile">
                  {<h4>Telefono: {!props.user.newUser.data.phoneNumber ? "A completar en su perfil" : props.user.newUser.data.phoneNumber}</h4>}
                  { <h4>Email: {props.user.newUser.data.mail}</h4>}
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