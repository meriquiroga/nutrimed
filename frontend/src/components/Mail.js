const Mail = () => {
    return (
      <>
        <img src="/assets/logo.png" alt="logo" />
        <div>
        <div style="">
          <h1>Reserva de turno</h1>
          <h2>
            Estimado/a :
          </h2>
          <p>
            Te enviamos este e-mail para comunicarte que has reservado un turno en
            el Centro Medico NutriMed
          </p>
        </div>
  
        <div>
          <h3>Datos del paciente:</h3>
          <p>Nombre: </p>
          <p>Apellido:  </p>
          <p>Tipo Documento: D.N.I.</p>
          <p>Nro. Doc. :</p>
        </div>
  
        <div>
          <h2>Constancia del Turno:</h2>
          <p>Ubicación: </p>
          <p>Servicio: </p>
          <p>Profesional:</p>
          <p>Turno para el día </p>
          <p>Preparaciones Previas:</p>
        </div>
  
        <div>
          <h2>INFORMACION IMPORTANTE - MEDIDAS DE PROTECCIÓN:</h2>
          <p>
            Nuestra institución cumple todos los protocolos, recomendaciones e
            instrucciones sanitarias en torno al nuevo Coronavirus. Por esta
            razón, le solicitamos respetar las siguientes medidas al concurrir a
            su turno:
          </p>
          <ul>
            <li>Asista solo. Cuando lo necesite, con 1 acompañante.</li>
            <li>Utilice barbijo durante su permanencia en la institución.</li>
            <li>Mantenga 2 metros de distancia con los demás.</li>
            <li>
              Higienice sus manos al ingresar, antes de retirarse y las veces que
              lo considere necesario.
            </li>
          </ul>
        </div>
  
        <div>
          <h2>Importante:</h2>
          <p>
            Sr/a. Paciente: Solicitamos por favor que en caso de no poder asistir
            al turno solicitado tenga bien avisarnos via Web o al teléfono
            0810-222-2424.
          </p>
        </div>
        </div>
      </>
    );
  };
  
  export default Mail;