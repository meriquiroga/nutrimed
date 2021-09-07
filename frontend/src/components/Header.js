import { connect } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import { useState } from "react"

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
         {!props.user.doc && <button><Link to={props.valid ? "/appointment" : "/signup"}>SOLICITAR TURNO</Link></button>}
        
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
