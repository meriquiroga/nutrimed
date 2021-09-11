import { connect } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Header = (props) => {
   const outHandler = () => {
      props.logOut()
   }

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
            </ul>
         </div>
         <div className="headerRigth">
            {props.valid && <h4>Bienvenido/a, {props.user.name}</h4>}
            <div>
               {props.valid && (
                  <NavLink className="logOut" onClick={outHandler} to="/">
                     SALIR
                     <img src="/assets/salir.png" alt="" />
                  </NavLink>
               )}
            </div>
            {/* {!props.user.doc && ( */}
            <button>
               <Link to={props.valid ? "/appointment" : "/signin"}>
                  SOLICITAR TURNO
               </Link>
            </button>
            {/* )} */}
         </div>
      </header>
   )
}
const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
      user: state.users.dataUser,
   }
}

const mapDispatchToProps = {
   logOut: userActions.logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
