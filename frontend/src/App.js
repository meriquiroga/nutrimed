import "./App.css"
import Home from "./pages/Home"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUp from "./components/SignUp"
import Staff from "./pages/Staff"
import Profile from "./pages/Profile"
import EachDoctor from "./pages/EachDoctor"
import { connect } from "react-redux";
import Appointment from "./Components/Appointment";
import Shifts from "./components/Shifts"
import EditProfilePatient from "./components/EditProfilePatient"
import EditProfileDoctor from "./components/EditProfileDoctor"
// import { connect } from "react-redux";
// import {useEffect} from "react"

const App = (props) => {
   // useEffect(()=>{
   //   if (localStorage.getItem("token")){
   //       props.logWithLs(localStorage.getItem("token"))
   //   }
   // }, [])


   return (
      <BrowserRouter>
         <Header />
         <Switch>
            <Route exact path="/" component={Home} />
            {props.valid &&<Route path="/signup" component={SignUp} />}
            <Route exact path="/staff" component={Staff} />
            <Route path='/staff/:id' component={EachDoctor}/>
            <Route path="/appointment" component={Appointment} />
            <Route path="/shifts" component={Shifts} />
            {(props.valid && props.user.doc) &&<Route exact path="/doc/profile" component={EditProfileDoctor} />}
            {props.valid &&<Route exact path="/patient" component={Profile} />}
            {props.valid &&<Route path="/doctor" component={Profile} />}
            {(props.valid && !props.user.doc) && <Route exact path="/patient/profile" component={EditProfilePatient}/>}
            <Redirect to="/" />
         </Switch>
         <Footer />
      </BrowserRouter>
   )
}

const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
      user: state.users.dataUser
   }
}
export default connect(mapStateToProps)(App)
