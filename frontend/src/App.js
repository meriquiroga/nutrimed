import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUpPat from "./Components/SignUpPat";
import DoctorInformation from "./Components/DoctorInformation";
import Staff from "./pages/Staff";
import SignUpDoc from "./Components/SignUpDoc";
import Patient from "./pages/Patient";
import PatientCompleteData from "./Components/PatientCompleteData";
import Appointment from "./Components/Appointment";
import { connect } from "react-redux";
// import { connect } from "react-redux";
// import {useEffect} from "react"

const App = (props) => {
  // useEffect(()=>{
  //   if (localStorage.getItem("token"){
  //       props.logWithLs(localStorage.getItem("token"))
  //   })
  // }, [])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUpPat} />
        <Route path="/staff" component={Staff} />
        <Route path="/information" component={DoctorInformation} />
        <Route path="/editdoc" component={SignUpDoc} />
        <Route path="/patient" component={Patient} />
        <Route path="/patientdata" component={PatientCompleteData} />
        <Route path="/appointment" component={Appointment} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  };
};

// const mapDispatchToProps = {
//   logWithLs: userActions.logWithLs,
// };

export default connect(mapStateToProps)(App);
