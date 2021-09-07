import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div className="navbar">
        <img src="/assets/logo.png" alt="" />
        <ul>
          <li>
            <NavLink exact to="/">
              <p>HOME</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              <p>CREAR CUENTA</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>INGRESAR</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient">
              <p>PERFIL</p>
            </NavLink>
          </li>
        </ul>
      </div>
      {props.token ? (
        <NavLink to="/appointment">
          <button>SOLICITAR TURNO</button>
        </NavLink>
      ) : (
        <NavLink to="/signup">
          <button>SOLICITAR TURNO</button>
        </NavLink>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  };
};
export default connect(mapStateToProps)(Header);
