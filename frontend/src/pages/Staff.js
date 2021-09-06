import { Component } from "react";
import { Link } from "react-router-dom";

export default class Staff extends Component {
  state = {
   
    
    doctor: [
      {
        name: "Oscar Alejandro",
        lastName: "Paoletti",
        dni: "21999286",
        src: "doctor6.png",
        description:
          "El Dr. Paoletti Oscar Alejandro es médico egresado de la U.N.C. Se formó como especialista en nutrición médica en el Consejo Médico de la Provincia de Córdoba. También es especialista en Medicina Estética, formada en el Instituto Pinto de Buenos Aires. Actualmente continúa su especialización en Obesidad y Diabetes.",
        registration: "",
        specialty: "Nutrición",
        password: "",

        data: {
          direction: {
            calle: "",
            num: "",
            city: "",
          },
          phoneNumber: "",
          mail: "",
        },
        score: [],
        appointment: [
          {
            patientId: "",
            date: {
              hour: "",
              date: "",
            },
          },
        ],
        doctor: true,
        google: false,
      },
      {
        name: "Oscar Alejandro",
        lastName: "Paoletti",
        dni: "21999286",
        src: "doctor6.png",
        description:
          "El Dr. Paoletti Oscar Alejandro es médico egresado de la U.N.C. Se formó como especialista en nutrición médica en el Consejo Médico de la Provincia de Córdoba. También es especialista en Medicina Estética, formada en el Instituto Pinto de Buenos Aires. Actualmente continúa su especialización en Obesidad y Diabetes.",
        registration: "",
        specialty: "Nutrición",
        password: "",

        data: {
          direction: {
            calle: "",
            num: "",
            city: "",
          },
          phoneNumber: "",
          mail: "",
        },
        score: [],
        appointment: [
          {
            patientId: "",
            date: {
              hour: "",
              date: "",
            },
          },
        ],
        doctor: true,
        google: false,
      },
      {
        name: "Oscar Alejandro",
        lastName: "Paoletti",
        dni: "21999286",
        src: "doctor6.png",
        description:
          "El Dr. Paoletti Oscar Alejandro es médico egresado de la U.N.C. Se formó como especialista en nutrición médica en el Consejo Médico de la Provincia de Córdoba. También es especialista en Medicina Estética, formada en el Instituto Pinto de Buenos Aires. Actualmente continúa su especialización en Obesidad y Diabetes.",
        registration: "",
        specialty: "Nutrición",
        password: "",

        data: {
          direction: {
            calle: "",
            num: "",
            city: "",
          },
          phoneNumber: "",
          mail: "",
        },
        score: [],
        appointment: [
          {
            patientId: "",
            date: {
              hour: "",
              date: "",
            },
          },
        ],
        doctor: true,
        google: false,
      },
      
    ],
  };

 componentDidMount() {
     
 }
  render() {
    let result = this.state.doctor.map((item) => (
      <div className="doctorCardsContainer">
        <div className="doctorCard">
        <Link to="/information">
          <div
            className="doctor-image"
            style={{
              backgroundImage: `url('/assets/${item.src}')`,
            }}
          ></div>
        </Link>
        <div className="docCardText">
        <p>{item.name}</p>
        <p>Especialista en {item.specialty}</p>
        <p>Matrícula {item.dni}</p>

        </div>

        </div>
      </div>
    ));

    return (
      <div className="doctorCardsContainer">
        <p>{result}</p>
      </div>
    );
  }
}

{
  /*<Link to="/information"> <div className="doctor-image" style={{
      backgroundImage: `url('/assets/doctor5.jpg')`,
    }}>
</div>
</Link>
<h2>RISELLI ROCIO DANIELA</h2>
<h3>Especialidad: Nutrición</h3>
<p>Matricula: 235545</p> 
<img className="icono" src="../estrella.png" alt={icono} />
*/
}
