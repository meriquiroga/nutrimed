import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Footer = (props) => {

   const outHandler = () => {
      props.logOut()
   }

    return (
        <footer>
            <div>
               <img src='/assets/instagram.png' alt=""/>
               <img src='/assets/facebook.png' alt=""/>
               <img src='/assets/twitter.png' alt=""/>
               <img src='/assets/linkedin.png' alt=""/>
            </div>
            <div className="footerNavbar">
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
                  <NavLink to="/login">
                     <p>INGRESAR</p>
                  </NavLink>
               </li>}
               {props.valid && <li>
                  <NavLink to="/profile">
                     <p>PERFIL</p>
                  </NavLink>
               </li>}
               {props.valid && <li>
                  <NavLink onClick={outHandler} to="/" >
                     <p>SALIR</p>
                  </NavLink>
               </li>}
            </ul>
            </div>
            <p>© Copyright 2021 | NutriMed. </p>
        </footer>
    )
}

const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
      user: state.users.dataUser
   }
}

const mapDispatchToProps = {
   logOut: userActions.logOut
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)