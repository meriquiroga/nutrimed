import { Link } from "react-router-dom" 

const Main = () => {
  return (
    <main>
        <div className="hero" style={{ backgroundImage: "url('/assets/hero3.jpg')"}}>
            <div className="insideHero">
                <h1>Enfocados en tu bienestar integral.</h1>
                <button id="buttonSign"><Link to="/staff">CONOCENOS</Link></button>
            </div>
        </div>
        <div className="iconCardsContainer">
            <div className="iconCard">
              <img src='/assets/icoNutricion.png' alt=""/>
              <h3>NUTRICIÓN</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoPsicologia.png' alt=""/>
              <h3>PSICOLOGÍA</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoMedicina.png' alt=""/>
              <h3>MEDICINA GENERAL</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoEntrenamiento.png' alt=""/>
              <h3>ENTRENAMIENTO</h3>
            </div>
        </div>
        <div className="description" style={{ backgroundImage: "url('/assets/description2.jpg')"}}>
          <div>
            <h3>¿Quiénes somos?</h3>
            <p>Somos un equipo interdisciplinario comprometido con la salud nutricional de la sociedad, con el propósito de acompañar a las personas en la búsqueda de la armonía del cuerpo y la mente.</p> 
            <p>Contamos con profesionales especializados en alergias e intolerancias alimentarias, diabetología, alimentación y dietética clínica, nutrición materno-infantil,  dietoterapia, psiconutrición, medicina general y entrenamiento fit, con rutinas abocadas a la salud integral del paciente.</p>
          </div>
        </div>
    </main>
  )
}

export default Main
