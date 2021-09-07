import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

const Appointment = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [appointmentReady, setAppointmentReady] = useState({
    date: {
      hour: "",
      date: "",
    },
    doctorId: "",
    patientId: "",
  });
  useEffect(() => {
    async function fetchDoctors() {
      let response = await props.getDoctors();
    }
    fetchDoctors();
  }, []);

  const appointmentValue = (e) => {
    setAppointmentReady({
      ...appointmentReady,
      [e.target.name]: e.target.value,
    });
  };
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
          <select
            id="optionDoctor"
            required
            name="doctorId"
            defaultValue={appointmentReady.doctorId}
            onChange={appointmentValue}
          >
            <option value="generico">generico</option>
            {props.doctors.map((doctor, index) => (
              <option key={index} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </form>

        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    patient: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
