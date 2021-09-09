const Information = () => {
  return (
    <div className="container">
      <div
        className="hero"
        style={{
          backgroundImage: `url('/assets/map.png')`,
        }}
      >
        <h1>CONTACTO</h1>
        <img className="icon-contact" src="/assets/marcador.png" />
      </div>

      <div className="iconCardsContainer">
        <div className="iconCard">
          <img src="/assets/icono-telefono.png" />
          <h3>Teléfono</h3>
          <h3> +54 9 351 802 2424</h3>
        </div>
        <div className="iconCard">
          <img id="buttonSign" src="/assets/icono-map.png" />
          <h3>Dirección</h3>
          <h3>Av Colón 150</h3>
        </div>
        <div className="iconCard">
          <img src="/assets/icono-reloj.png" />
          <h3>Lunes a Viernes</h3>
          <h3>9:00 a 20:30hs.</h3>
        </div>
        <div className="form-consulta">
        <div className="inputs">
          <h2> Envianos tu consulta:</h2>
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Nombre" />
          <textarea className="textarea" type="text" placeholder="Escribe tu consulta.." />
          <button>Enviar</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
