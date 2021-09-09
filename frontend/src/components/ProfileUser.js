import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import doctorActions from "../redux/actions/doctorActions"
import React from "react"
import ReactCircleModal from "react-circle-modal"
import MedicalData from "./MedicalData"

const ProfileUser = (props) => {
   
   const [appointments, setAppointments] = useState([])

   useEffect(() => {
      if (props.user.userExist.doc) {
         console.log(props.token)
         props.getAppointments(props.token).then((res) => {
            setAppointments(res.res)
         })
      }
   }, [])

   return (
      <div className="profile">
         <div className="leftProfile">
            <div
               className="profileImg"
               style={{ backgroundImage: `url('${props.user.userExist.src}')` }}
            ></div>
            <h4>Bienvenido/a, {props.user.userExist.name}</h4>
            {!props.user.userExist.doc ? (
               <p>
                  Para poder sacar turno es necesario que completes tus datos.
                  Hacelo en el siguiente botón.
               </p>
            ) : (
               <p>Completá tus datos y mantenelos actualizados en el siguiente botón.</p>
            )}

            <button>
               <Link
                  className="linkCompleta"
                  to={
                     !props.user.userExist.doc
                        ? "/patient/profile"
                        : "/doc/profile"
                  }
               >
                  COMPLETAR PERFIL
               </Link>
            </button>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <p>Nombre: {props.user.userExist.name}</p>
                  <p>Apellido: {props.user.userExist.lastName}</p>
                  <p>
                     DNI:{" "}
                     {!props.user.userExist.dni
                        ? " - "
                        : props.user.userExist.dni}
                  </p>
                  <p>
                     Domicilio:{" "}
                     {!props.user.userExist.data.direction.street
                        ? " - "
                        : `${props.user.userExist.data.direction.street} ${props.user.userExist.data.direction.num}`}
                  </p>
                  {
                     <p>
                        Telefono:{" "}
                        {!props.user.userExist.data.phoneNumber
                           ? " - "
                           : props.user.userExist.data.phoneNumber}
                     </p>
                  }
                  {<p>E-mail: {props.user.userExist.data.mail}</p>}
               </div>
            </div>
         </div>
         <div className="rightProfile">
            {!props.user.userExist.doc ? (
               <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4>
            ) : (
               <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>
            )}
            {!props.user.userExist.doc ? (
               <p className="turnos">No tenés turnos programados.</p>
            ) : appointments.length === 0 ? (
               <p className="turnos">No tenés pacientes agendados para hoy.</p>
            ) : (
               <div>
                  {appointments.map((appointment, index) => {
                     return (
                        <div key={index}>
                           <h2 className="turnos">
                              {appointment.patientId.name}{" "}
                              {appointment.patientId.lastName}
                           </h2>
                           <h5>{appointment.date.date}</h5>
                           <h5>{appointment.date.hour}</h5>
                           <ReactCircleModal
                              backgroundColor="#36B0B4"
                              toogleComponent={(onClick) => (
                                 <button
                                    className="botonFichaMedica"
                                    onClick={onClick}
                                 >
                                    VER FICHA MEDICA
                                 </button>
                              )}
                              // Optional fields and their default values
                              offsetX={0}
                              offsetY={0}
                           >
                              {(onClick) => (
                                 <div
                                    style={{
                                       backgroundColor: "#fff",
                                       padding: "1em",
                                       width: "75vw",
                                       alignSelf: "center",
                                       display: "flex",
                                       flexDirection: "column",
                                       justifyContent: "center",
                                       alignItems: "center",
                                    }}
                                 >
                                    <MedicalData appointment={appointment} />
                                    <button onClick={onClick}>VOLVER</button>
                                 </div>
                              )}
                           </ReactCircleModal>
                        </div>
                     )
                  })}
               </div>
            )}
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      user: state.users.dataUser,
      token: state.users.token,
      patients: state.patients.patients,
   }
}

const mapDispatchToProps = {
   getAppointments: doctorActions.getAppointments,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
