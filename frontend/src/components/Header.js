import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { useState } from "react"

const Header = (props) => {


   const buttonHandler = () => {
      props.valid ? props.history.push("/appointment") : props.history.push("/patient/profile")
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
               {!props.valid && <li>
                  <NavLink to="/signup">
                     <p>CREAR CUENTA</p>
                  </NavLink>
               </li>}
               {!props.valid && <li>
                  <NavLink to="/">
                     <p>INGRESAR</p>
                  </NavLink>
               </li>}
               {props.valid && <li>
                  <NavLink to="/patient">
                     <p>PERFIL</p>
                  </NavLink>
               </li>}
            </ul>
         </div>
         {props.valid ? (
  <NavLink to="/appointment">
    <button>SOLICITAR TURNO</button>
  </NavLink>
) : (
  <NavLink to="/signup">
    <button>SOLICITAR TURNO</button>
  </NavLink>
)}
      </header>
   )
}
const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
      user: state.users.dataUser
   }
}

export default connect(mapStateToProps)(Header)
