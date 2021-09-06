import {Link} from 'react-router-dom'

const Main = () => {
  return (
    <main>
        <div className="hero" style={{ backgroundImage: "url('/assets/hero3.jpg')"}}>
            <div className="insideHero">
                <h1>Enfocados en tu bienestar integral.</h1>
                <Link to="/staff"><button>CONOCENOS</button></Link>
            </div>
        </div>
        <div className="iconCardsContainer">
            <div className="iconCard">
              <img src='/assets/icoNutricion.png' alt=""/>
              <h3>NUTRICIÓN</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoNutricion.png' alt=""/>
              <h3>PSICOLOGÍA</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoNutricion.png' alt=""/>
              <h3>MEDICINA GENERAL</h3>
            </div>
            <div className="iconCard">
              <img src='/assets/icoNutricion.png' alt=""/>
              <h3>ENTRENAMIENTO</h3>
            </div>
        </div>
        <div className="description" style={{ backgroundImage: "url('/assets/description2.jpg')"}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </main>
  );
};

export default Main;
