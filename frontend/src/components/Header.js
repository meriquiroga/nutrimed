import { connect } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Header = ({valid,user,logOut}) => {
   const outHandler = () => {
      logOut()
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
               {!valid && (
                  <li>
                     <NavLink to="/signup">
                        <p>CREAR CUENTA</p>
                     </NavLink>
                  </li>
               )}
               {!valid && (
                  <li>
                     <NavLink to="/signin">
                        <p>INGRESAR</p>
                     </NavLink>
                  </li>
               )}
               {valid && (
                  <li>
                     <NavLink to="/profile">
                        <p>PERFIL</p>
                     </NavLink>
                  </li>
               )}
            </ul>
         </div>
         <div className="headerRigth">
            {valid && <h4>Bienvenido/a, {user.name}</h4>}
            <div>
               {valid && (
                  <NavLink className="logOut" onClick={outHandler} to="/">
                     SALIR
                     <img src="/assets/salir.png" alt="" />
                  </NavLink>
               )}
            </div>
            {((valid && !user.doc) || !valid)  &&
            <button>
               <Link to={valid ? "/appointment" : "/signin"}>
                  SOLICITAR TURNO
               </Link>
            </button>
            }
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
