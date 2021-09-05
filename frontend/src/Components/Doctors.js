import React from "react";
import { Link } from "react-router-dom";

const Doctors = () => {
  const doctor = [
    {
      data: {
        direction: {
          calle: "Siempre Verde",
          num: "99",
          city: "CABA",
        },
        phoneNumber: 155678392,
        mail: "cormillot@cormillot.com",
      },
      name: "Oscar Alejandro",
      lastName: "Paoletti",
      src: [
        "doctor1.png",
        "doctor2.png",
        "doctor3.png",
        "doctor4.png",
        "doctor5.png",
      ],
      dni: 32888932,
      description:
        "El Dr. Paoletti Oscar Alejandro es médico egresado de la U.N.C. Se formó como especialista en nutrición médica en el Consejo Médico de la Provincia de Córdoba. También es especialista en Medicina Estética, formada en el Instituto Pinto de Buenos Aires.",
      registration: "123213BTV",
      specialty: "Medico Nutriólogo",
      password: "Nutriologo",
      score: [],
      appointment: [
        {
          date: {
            hour: "",
            date: "",
          },
          _id: "6133d23e42179f859d26f374",
        },
      ],
      flag: "doctor",
    },
  ];

  const iconos = [
    "estrella.png",
    "estrella.png",
    "estrella.png",
    "estrella.png",
    "estrella.png",
  ];

  return (
    <div>
      <div className="section-doctors">
        <div className="card">
          <Link to="/information">
            <div
              className="doctor-image"
              style={{
                backgroundImage: `url('/assets/${image.src}')`,
              }}
            ></div>
          </Link>
          <h3>Dra. RANDANNE ROMINA ALEJANDRA</h3>
          <h4>Especialista en Nutrición</h4>
          <p>Matricula: 235472</p>
          <img className="icono" src="../assets/estrella.png" alt="icono" />
 {console.log("hola")}
          <div>
            {iconos.map((icon) => (
              <img className="icono" src={`../assets/${icon}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
