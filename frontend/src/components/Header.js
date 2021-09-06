import { NavLink } from "react-router-dom"

const Header = () => {
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
         <button>SOLICITAR TURNO</button>
      </header>
   )
}

export default Header
