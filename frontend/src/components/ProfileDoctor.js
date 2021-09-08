import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import { useEffect } from "react";
import { useState } from "react";
import patientActions from "../redux/actions/patientActions";
import userActions from "../redux/actions/userActions";

const ProfileDoctor = (props) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    props.getAppointments(props.token).then((res) => console.log(res));
  }, []);
  return (
    <div className="profile">
      <div className="ladoProfile">
        <img className="profileImg" src="" alt="profile" />
        <h5>Bienvenido NAME</h5>
        <p>
          Para poder sacar turno puedes completar tus datos haciendo click en el
          siguiente enlace
        </p>
        {/* <Link
               className="linkCompleta"
               to={!props.user.doc ? "/patient/profile" : "/doctor/profile"}
            >
               Complete su perfil
            </Link> */}
      </div>
      <div>
        <div className="centroProfile">
          <h1 className="tituloProfile">MIS DATOS</h1>
          <div className="datosProfile">
            <h4>Nombre: "nombre"</h4>
            <h4>Apellido: "apellido"</h4>
          </div>
          <div className="datosProfile">
            <h4>DNI:</h4>
            <h4>Direccion:</h4>
          </div>
          <div className="datosProfile">
            <h4>Telefono:</h4>
            <h4>Email: </h4>
          </div>
        </div>
      </div>
      {/* <div className="ladoProfile">
            <h3 className="proxTurnos">AGENDA</h3>
            <h4>Lista de pacientes</h4>
            <p className="turnos">{props.patients[26].name}</p>
            <p className="turnos">{props.patients[26].lastName}</p>
            <img src={props.patients[26].src} className="imgTurnos"></img>
            <p className="turnos">{props.patients[22].name}</p>
            <p className="turnos">{props.patients[22].lastName}</p>
            <img src={props.patients[22].src} className="imgTurnos"></img>
            <p className="turnos">{props.patients[24].name}</p>
            <p className="turnos">{props.patients[24].lastName}</p>
            <img src={props.patients[24].src} className="imgTurnos"></img>
         </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    patients: state.patients.patients,
    token: state.users.token,
  };
};

const mapDispatchtoProps = {
  getPatiens: patientActions.getPatients,
  getAppointments: doctorActions.getAppointments,
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileDoctor);
