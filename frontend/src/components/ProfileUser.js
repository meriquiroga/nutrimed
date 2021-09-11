import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import doctorActions from "../redux/actions/doctorActions"
import React from "react"
import ReactCircleModal from "react-circle-modal"
import MedicalData from "./MedicalData"
import { Accordion, AccordionItem } from "react-sanfona"

const ProfileUser = (props) => {
   const { doc, src, name, lastName, dni, data } = props.user
   const [appointments, setAppointments] = useState([])
   const [loading, setLoading] = useState(true)
   const [change, setChange] = useState([])
   const [confirmDelete, setConfirmDelete] = useState(false)

   useEffect(() => {
      props.getAppointments(props.token).then((res) => {
         if (res.success) {
            setAppointments(res.res)
            setLoading(false)
            return false
         }
      })
   }, [change])

   if (loading) {
      return <h1>Loading</h1>
   }

   const filterDays = (dayM) => {
      let day = appointments.filter((appointment) =>
         appointment.date.date.includes(dayM)
      )
      return day
   }

   const deleteAppoint = (id) => {
      props.deleteAppointment(props.token, id).then((res) => setChange(res.res))
   }

   const lunes = filterDays("Lunes")
   const martes = filterDays("Martes")
   const miercoles = filterDays("Miercoles")
   const jueves = filterDays("Jueves")
   const viernes = filterDays("Viernes")

   const drawAccordion = (day, day2) => {
      return (
         <Accordion>
            <AccordionItem
               className="accordion"
               title={day}
               expanded={day === 1}
            >
               {day2.length === 0 ? (
                  <p>No hay turnos por el momento.</p>
               ) : (
                  day2.map((appointment, index) => {
                     return (
                        <div key={index}>
                           <div className="nombre-HC">
                              <h4>
                                 {appointment.patientId.name}{" "}
                                 {appointment.patientId.lastName}
                              </h4>
                              <ReactCircleModal
                                 backgroundColor="#36B0B4"
                                 toogleComponent={(onClick) => (
                                    <img
                                       className="historiaClinica"
                                       onClick={onClick}
                                       src="/assets/historialClinico.png"
                                       alt=""
                                    />
                                 )}
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
                           <p>{appointment.date.date}</p>
                           <p>{appointment.date.hour} hs</p>
                           <button
                              onClick={() => setConfirmDelete(!confirmDelete)}
                           >
                              Borrar turno
                           </button>
                           {confirmDelete && (
                              <div>
                                 <h4>Confirmar eliminacion</h4>
                                 <img
                                    className="iconCom"
                                    src="/assets/cross.png"
                                    alt="edit"
                                    onClick={() =>
                                       setConfirmDelete(!confirmDelete)
                                    }
                                 />
                                 <img
                                    className="iconCom"
                                    src="/assets/check2.png"
                                    alt="edit"
                                    onClick={() =>
                                       deleteAppoint(appointment._id)
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     )
                  })
               )}
            </AccordionItem>
         </Accordion>
      )
   }

   return (
      <div className="profile">
         <div className="leftProfile">
            <div
               className="profileImg"
               style={{ backgroundImage: `url('${src}')` }}
            ></div>
            <h4>Bienvenido/a, {name}</h4>
            {!doc ? (
               <p>
                  Para poder sacar turno es necesario que completes tus datos.
                  Hacelo en el siguiente botón.
               </p>
            ) : (
               <p>
                  Completá tus datos y mantenelos actualizados en el siguiente
                  botón.
               </p>
            )}

            <button>
               <Link
                  className="linkCompleta"
                  to={!doc ? "/patient/profile" : "/doc/profile"}
               >
                  COMPLETAR PERFIL
               </Link>
            </button>
         </div>
         <div>
            <div className="centroProfile">
               <h3 className="tituloProfile">Mis datos</h3>
               <div className="datosProfile">
                  <p>Nombre: {name}</p>
                  <p>Apellido: {lastName}</p>
                  <p>DNI: {!dni ? " - " : dni}</p>
                  <p>
                     Domicilio:{" "}
                     {!data.direction.street
                        ? " - "
                        : `${data.direction.street} ${data.direction.num}`}
                  </p>
                  {
                     <p>
                        Telefono: {!data.phoneNumber ? " - " : data.phoneNumber}
                     </p>
                  }
                  {<p>E-mail: {data.mail}</p>}
               </div>
            </div>
         </div>
         <div className="rightProfile">
            {!doc ? (
               <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4>
            ) : (
               <h4 className="proxTurnos">PRÓXIMOS PACIENTES</h4>
            )}
            {!doc ? (
               appointments.length === 0 ? (
                  <p className="turnos">No tenés turnos programados.</p>
               ) : (
                  appointments.map((appointment, index) => {
                     return (
                        <div key={index}>
                           <div>
                              <Link to={`/staff/${appointment.doctorId._id}`}>
                                 <h3 className="linksDoctor">
                                    {appointment.doctorId.name}{" "}
                                    {appointment.doctorId.lastName}
                                 </h3>
                              </Link>
                           </div>
                           <p className="turnos">{appointment.date.date}</p>
                           <p className="turnos">{appointment.date.hour} hs.</p>
                           <button
                              onClick={() => setConfirmDelete(!confirmDelete)}
                           >
                              Borrar turno
                           </button>
                           {confirmDelete && (
                              <div>
                                 <h4>Confirmar eliminacion</h4>
                                 <img
                                    className="iconCom"
                                    src="/assets/cross.png"
                                    alt="edit"
                                    onClick={() =>
                                       setConfirmDelete(!confirmDelete)
                                    }
                                 />
                                 <img
                                    className="iconCom"
                                    src="/assets/check2.png"
                                    alt="edit"
                                    onClick={() =>
                                       deleteAppoint(appointment._id)
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     )
                  })
               )
            ) : appointments.length === 0 ? (
               <p className="turnos">No tenés pacientes agendados para hoy.</p>
            ) : (
               <div>
                  {drawAccordion("Lunes", lunes)}
                  {drawAccordion("Martes", martes)}
                  {drawAccordion("Miercoles", miercoles)}
                  {drawAccordion("Jueves", jueves)}
                  {drawAccordion("Viernes", viernes)}
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
      doctors: state.doctors.doctors,
   }
}

const mapDispatchToProps = {
   getAppointments: doctorActions.getAppointments,
   deleteAppointment: doctorActions.deleteAppointment,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
