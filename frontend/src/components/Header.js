import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
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
         {! props.user.doc && <button onClick={buttonHandler}>SOLICITAR TURNO</button>}
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
