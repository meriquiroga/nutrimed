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
                     <NavLink to="/signin">
                        <p>INGRESAR</p>
                     </NavLink>
                  </li>
               )}
               {props.valid && (
                  <li>
                     <NavLink to="/profile">
                        <p>PERFIL</p>
                     </NavLink>
                  </li>
               )}
               <li>
                  <NavLink to="/information">
                     <p>CONTACTO</p>
                  </NavLink>
               </li>
               <li>
                  {props.valid && (
                     <Link onClick={outHandler} to="/">
                        <p>SALIR</p>
                     </Link>
                  )}
               </li>
            </ul>
         </div>
         <div className="headerRigth">
            <button>
               <Link to={props.valid ? "/appointment" : "/signin"}>
                  SOLICITAR TURNO
               </Link>
            </button>
            {props.valid && <h4 className="nameHeader">{props.user.name}</h4>}
            <div
               className="logoUser"
               style={{
                  backgroundImage: `url('${
                     props.valid
                        ? props.user.src
                        : "https://i.postimg.cc/DzGJCrT8/customer-icon-23.png"
                  }')`,
               }}
            ></div>
         </div>
      </header>
   )
}
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
