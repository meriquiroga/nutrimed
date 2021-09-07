import { Link } from "react-router-dom"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"

const ProfileUser = (props) => {
   console.log(props)
   return (
      <div className="profile">
<<<<<<< HEAD
         <div className="ladoProfile">
            <img className="profileImg" src={props.user.src} alt="profile" />
            <h5>Bienvenido {props.user.name}</h5>
=======
         <div className="leftProfile">
            <img className="profileImg"
               src={props.user.src}
               alt="profile"
            />
            <h4>Bienvenido/a, {props.user.name}</h4>
>>>>>>> 434bf48959a8d2450804dfc8daf3c9953e58f7ef
            <p>
               Para poder sacar turno es necesario completar tus datos haciendo click
               en el siguiente botón.
            </p>
<<<<<<< HEAD
            <Link
               className="linkCompleta"
               to={!props.user.doc ? "/patient/profile" : "/doctor/profile"}
            >
=======
            <Link className="linkCompleta" to={!props.user.doc ? "/patient/profile" : "/doc/profile"}>
>>>>>>> 434bf48959a8d2450804dfc8daf3c9953e58f7ef
               Complete su perfil
            </Link>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <h4>Nombre: {props.user.name}</h4>
                  <h4>Apellido: {props.user.lastName}</h4>
               </div>
               <div className="datosProfile">
<<<<<<< HEAD
                  <h4>
                     DNI:{" "}
                     {!props.user.dni
                        ? "A completar en su perfil"
                        : props.user.dni}
                  </h4>
                  <h4>
                     Direccion:{" "}
                     {
                        (!props.user.data.direction.street
                           ? "A completar en su perfil"
                           : props.user.data.direction.street,
                        props.user.data.direction.num)
                     }
                  </h4>
               </div>
               <div className="datosProfile">
                  <h4>
                     Telefono:{" "}
                     {!props.user.data.phoneNumber
                        ? "A completar en su perfil"
                        : props.user.data.phoneNumber}
                  </h4>
                  <h4>Email: {props.user.data.mail}</h4>
               </div>
            </div>
         </div>
         <div className="ladoProfile">
            {!props.user.doc ? (
               <h3 className="proxTurnos">PROXIMOS TURNOS</h3>
            ) : (
               <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>
            )}
            {!props.user.doc ? (
               <h5 className="turnos">No tenes turnos por el momento</h5>
            ) : (
               <h5 className="turnos">No tenes pacientes por el momento</h5>
            )}
=======
                  <h4>DNI: {!props.user.dni ? "A completar en su perfil" : props.user.dni}</h4>
                  <h4>Direccion: {!props.user.data.direction.street ? "A completar en su perfil" : `${props.user.data.direction.street} ${props.user.data.direction.num}`}</h4>
               </div>
               <div className="datosProfile">
                  {<h4>Telefono: {!props.user.data.phoneNumber ? "A completar en su perfil" : props.user.data.phoneNumber}</h4>}
                  { <h4>Email: {props.user.data.mail}</h4>}
               </div>
            </div>
         </div>
         <div className="rightProfile">
             {!props.user.doc ? <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4> : <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>}
             {!props.user.doc ? <p className="turnos">No tenés turnos programados.</p> : <h5 className="turnos">No tenes pacientes por el momento</h5>}
>>>>>>> 434bf48959a8d2450804dfc8daf3c9953e58f7ef
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      user: state.users.dataUser,
   }
}

<<<<<<< HEAD
const mapDispatchToProps = {
   getAppointments: doctorActions.getAppointments,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)

// import { Link } from "react-router-dom"
// import { connect } from "react-redux"
// import patientActions from "../redux/actions/patientActions"

// const PatientProfile = () => {
//    return (
//       <div className="profile">
//          <div className="leftProfile">
//             <img
//                className="profileImg"
//                src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
//                alt="profile"
//             />
//             <h4>Hola "nombre"</h4>
//             <p>
//                Para poder sacar turno debés completar tus datos haciendo click
//                en el siguiente botón.
//             </p>
//             <button><Link to="/patientdata">
//                COMPLETÁ TU PERFIL
//             </Link></button>
//          </div>
//          <div>
//             <div className="centroProfile">
//                <h3 className="tituloProfile">Mis datos</h3>
//                <div className="datosProfile">
//                   <p>Nombre:</p>
//                   <p>Apellido:</p>
//                   <p>DNI:</p>
//                   <p>Dirección:</p>
//                   <p>Teléfono:</p>
//                   <p>E-mail:</p>
//                </div>
//                <div className="underConstruction">
//                   <h4>En construcción</h4>
//                </div>
//             </div>
//          </div>
//          <div className="rightProfile">
//             <h3 className="proxTurnos">PRÓXIMOS TURNOS</h3>
//             <p className="turnos">No tenés turnos programados.</p>
//          </div>
//       </div>
//    )
// }

// const mapStateToProps = (state) => {
//    return {
//       patient: state.users.dataUser,
//    }
// }

// const mapDispatchToProps = {
//    editProfilePatient: patientActions.editProfilePatient,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)
=======
export default connect(mapStateToProps)(ProfileUser)
>>>>>>> 434bf48959a8d2450804dfc8daf3c9953e58f7ef
