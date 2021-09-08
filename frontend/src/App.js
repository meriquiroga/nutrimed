import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import EachDoctor from "./pages/EachDoctor";
import Appointment from "./components/Appointment";
import EditProfilePatient from "./components/EditProfilePatient";
import EditProfileDoctor from "./components/EditProfileDoctor";
import { connect } from "react-redux";
import { useEffect } from "react";
import userActions from "./redux/actions/userActions";
import Login from "./components/Login";
import MedicalData from "./components/MedicalData";
import Information from "./components/Information";

const App = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.logWithLs(localStorage.getItem("token"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {!props.valid && <Route path="/signup" component={SignUp} />}
        <Route exact path="/staff" component={Staff} />
        <Route path="/staff/:id" component={EachDoctor} />
        <Route path="/information" component={Information} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/medicaldata" component={MedicalData} />
        {props.valid && props.user.doc && (
          <Route exact path="/doc/profile" component={EditProfileDoctor} />
        )}
        {props.valid && <Route exact path="/patient" component={Profile} />}
        {props.valid && <Route path="/doctor" component={Profile} />}
        {props.valid && !props.user.doc && (
          <Route exact path="/patient/profile" component={EditProfilePatient} />
        )}
        {!props.valid && <Route path="/login" component={Login} />}
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    valid: state.users.token,
    user: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  logWithLs: userActions.logUserWithLs,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
