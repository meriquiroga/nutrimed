import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Footer = (props) => {

   const outHandler = () => {
      props.logOut()
   }

    return (
        <h1>hola</h1>
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