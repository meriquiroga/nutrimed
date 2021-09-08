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
          <img src="/assets/icoNutricion.png" />
          <h3> +54 9 351 802 2424</h3>
        </div>
        <div className="iconCard">
          <img id="buttonSign" src="/assets/icoNutricion.png" />
          <h3>Loza Bravo 3333</h3>
        </div>
        <div className="iconCard">
        <img src="/assets/icoNutricion.png" />
        <h3>Lunes a Viernes</h3>
        <h3>9:00 a 20:30hs.</h3>
        </div>
      </div>
    </div>
  );
};

export default Information;
