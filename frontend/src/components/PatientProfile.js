import { Link } from "react-router-dom"
import { connect } from "react-redux"
import patientActions from "../redux/actions/patientActions"

const PatientProfile = () => {
   return (
      <div className="profile">
         <div className="ladoProfile">
            <img
               className="profileImg"
               src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
               alt="profile"
            />
            <h5>Hola "nombre"</h5>
            <p>
               Para poder sacar turno puedes completar tus datos haciendo click
               en el siguiente enlace
            </p>
            <Link className="linkCompleta" to="/patientdata">
               Completá tu perfil
            </Link>
         </div>
         <div>
            <div className="centroProfile">
               <h1 className="tituloProfile">MIS DATOS</h1>
               <div className="datosProfile">
                  <h4>Nombre:</h4>
                  <h4>Apellido:</h4>
               </div>
               <div className="datosProfile">
                  <h4>DNI:</h4>
                  <h4>Direccion</h4>
               </div>
               <div className="datosProfile">
                  <h4>Telefono</h4>
                  <h4>Email</h4>
               </div>
               <div className="datosProfile">
                  <h4>Historial Clinico</h4>
                  <h4>Mis doctores</h4>
               </div>
            </div>
         </div>
         <div className="ladoProfile">
            <h3 className="proxTurnos">PROXIMOS TURNOS</h3>
            <h5 className="turnos">No tenes turnos por el momento</h5>
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      patient: state.users.dataUser,
   }
}

const mapDispatchToProps = {
   editProfilePatient: patientActions.editProfilePatient,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)
