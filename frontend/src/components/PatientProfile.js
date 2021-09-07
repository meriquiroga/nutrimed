import { Link } from "react-router-dom"
import { connect } from "react-redux"
import patientActions from "../redux/actions/patientActions"

const PatientProfile = () => {
   return (
      <div className="profile">
         <div className="leftProfile">
            <img
               className="profileImg"
               src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
               alt="profile"
            />
            <h4>Hola "nombre"</h4>
            <p>
               Para poder sacar turno debés completar tus datos haciendo click
               en el siguiente botón.
            </p>
            <button><Link to="/patientdata">
               COMPLETÁ TU PERFIL
            </Link></button>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <p>Nombre:</p>
                  <p>Apellido:</p>
                  <p>DNI:</p>
                  <p>Dirección:</p>
                  <p>Teléfono:</p>
                  <p>E-mail:</p>
               </div>
               <div className="underConstruction">
                  <h4>En construcción</h4>
               </div>
            </div>
         </div>
         <div className="rightProfile">
            <h3 className="proxTurnos">PRÓXIMOS TURNOS</h3>
            <p className="turnos">No tenés turnos programados.</p>
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
