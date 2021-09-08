import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import patientActions from '../redux/actions/patientActions'
import AppointmentDay from '../components/AppointmentDay'

const Appointment = ({doctors,getDoctors, user, getCalendar,calendar}) => {
  const [newDoctors, setNewDoctors] = useState(doctors)
  const [newCalendar, setNewCalendar] = useState(calendar)
  const [view, setView] = useState(false)
  const [appointmentReady, setAppointmentReady] = useState({
    date: {
      hour: "",
      date: "",
    },
    doctorId: "",
    patientId: "",
  });
  useEffect(() => {
      window.scroll(0, 0)
      if(!doctors.length){
        getDoctors()
        .then(res=>{
          if(res.success){
            setNewDoctors(res.res)
          }
        })
      }
      if(!calendar.length){
        console.log('fecheo a los cale')
        getCalendar()
        .then(res=>{
          if(res.success){
            console.log(res.res)
            setNewCalendar(res.res)
          }else{
            console.log(res.res)
          }
        })
      }
  }, []);

  const appointmentValue = (e) => {
  };

  const inputDay = newCalendar.map(obj => <AppointmentDay key={obj._id} day={obj.day} timeTable={obj.timeTable}/>)
  
  return (
    <>
      <div className="container">
        <div className="signUpForm">
        <img src="/assets/appointment.png" alt="" />
        <h3>
          ¡Bienvenido! Antes de solicitar un turno, por favor elija el
          profesional.
        </h3>
        <form>
          <select id="optionDoctor" name="doctorId"
            defaultValue={appointmentReady.doctorId}
            onChange={appointmentValue}
          >
            <option value="generico">generico</option>
            {newDoctors.map((doctor, index) => (
              <option key={index} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </form>
        <div className="container2" >{inputDay}</div>
        </div>
        
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    user: state.users.dataUser,
    calendar:state.patients.calendar
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
  getCalendar:patientActions.getCalendar

};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);