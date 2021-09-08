import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

class Staff extends Component {
  state = {
    loading: { condition: true, text: "Loading..." },
  };

  componentDidMount() {
    window.scroll(0, 0);
    this.props.getDoctors().then((res) => {
      res.success
        ? this.setState({ loading: { condition: false } })
        : this.setState({
            loading: {
              ...this.state.loading,
              text: "Lo sentimos, ha ocurrido un error, vuelva a intentarlo más tarde.",
            },
          });
    });
  }

  render() {
    if (this.state.loading.condition) {
      return ( 
      <div className="containerLoading"><h3>{this.state.loading.text}</h3>
      </div>
      )
    }
    let doctor = this.props.doctors.map((obj) => {
      return (
        <Link to={`/staff/${obj._id}`} key={obj._id}>
          <div className="doctorCardsContainer">
            <div className="doctorCard">
              <div
                className="doctor-image"
                style={{
                  backgroundImage: `url('${obj.src}')`,
                }}
              ></div>
              <div className="docCardText">
                <h3>
                  {obj.name} {obj.lastName}
                </h3>
                <p>M.P.: {obj.registration}</p>
                <p>{obj.specialty}</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="container">
        <div className="signUpForm">
        <h3>Staff</h3>
        <p>Contamos con profesionales especializados en alergias e intolerancias alimentarias, diabetología, alimentación y dietética clínica, nutrición materno-infantil, dietoterapia, psiconutrición, medicina general y entrenamiento fit, con rutinas abocadas a la salud integral del paciente.</p>
        <div className="doctorCardsContainer">{doctor}</div>;
        </div>
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    doctors: state.doctors.doctors,
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
};

export default connect(mapStateTopProps, mapDispatchToProps)(Staff);
