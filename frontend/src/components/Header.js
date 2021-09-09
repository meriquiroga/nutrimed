import { valid } from "joi"
import { connect } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Header = (props) => {
   console.log(props)
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
                  {props.valid && (
                  <li>
                     <NavLink onClick={outHandler} to="/">
                        <p>SALIR</p>
{/*                       <img src="/assets/salir.png" alt="" />
 */}                     </NavLink>
                  </li>
               )}
            </ul>
         </div>
         {props.valid && <h3>Bienvenido/a {props.user.userExist.name}</h3>}
         <button><Link to={props.valid ? "/appointment" : "/login"}>SOLICITAR TURNO</Link></button>
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
