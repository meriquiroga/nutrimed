import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import userActions from "../redux/actions/userActions";

const Header = (props) => {
  const outHandler = () => {
    props.logOut();
  };

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
          {!props.valid && (
            <li>
              <NavLink to="/signup">
                <p>CREAR CUENTA</p>
              </NavLink>
            </li>
          )}
          {!props.valid && (
            <li>
              <NavLink to="/login">
                <p>INGRESAR</p>
              </NavLink>
            </li>
          )}
          {props.valid && (
            <li>
              <NavLink to="/patient">
                <p>PERFIL</p>
              </NavLink>
            </li>
          )}
          {props.valid && (
            <li>
              <NavLink onClick={outHandler} to="/">
                <p>SALIR</p>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* {!props.user.userExist.doc && <button><Link to={props.valid ? "/appointment" : "/signup"}>SOLICITAR TURNO</Link></button>} */}
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    valid: state.users.token,
    user: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  logOut: userActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
