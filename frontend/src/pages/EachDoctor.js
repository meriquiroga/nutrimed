import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import doctorActions from "../redux/actions/doctorActions";
import Reviews from "../components/Reviews";
// import io from "socket.io-client";
// import patientActions from "../redux/actions/patientActions";

class EachDoctor extends Component {
  state = {
    loading: { condition: true, text: "Loading...", link: "" },
    socket: null,
  };

  componentDidMount() {
    window.scroll(0, 0);
    if (!this.props.doctors.length) {
      this.props.getOneDoctorDB(this.props.match.params.id).then((res) => {
        res.success
          ? this.setState({ loading: { condition: false } })
          : this.setState({
              loading: {
                ...this.state.loading,
                text: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde",
                link: "Home",
              },
            });
      });
    } else {
      this.props.getOneDoctor(this.props.match.params.id);
      this.setState({ loading: { condition: false } });
    }

  }
  render() {
    if (this.state.loading.condition) {
      return (
        <>
          (
          <div className="containerLoading">
            <h3>{this.state.loading.text}</h3>
          </div>
          )<Link to="/">{this.state.loading.link}</Link>
        </>
      );
    }
    return (
      <div className="profile">
        <div className="leftProfile">
          <div
            className="doc"
            style={{ backgroundImage: `url('${this.props.doctor.src}')` }}
          ></div>
          <h4>
            {" "}
            {this.props.doctor.name} {this.props.doctor.lastName}
          </h4>
          <p>Matrícula: {this.props.doctor.registration}</p>
          <p>Especialidad: {this.props.doctor.specialty}</p>
        </div>
        <div className="docDescription">
          <div>
            <p>{this.props.doctor.description}</p>
          </div>
          <div>
            <Reviews
              reviews={this.props.doctor.review}
              doctorId={this.props.doctor._id}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateTopProps = (state) => {
  return {
    doctor: state.doctors.doctor,
    doctors: state.doctors.doctors,
  };
};
const mapDispatchToProps = {
  getOneDoctor: doctorActions.getOneDoctor,
  getOneDoctorDB: doctorActions.getOneDoctorDB
};
export default connect(mapStateTopProps, mapDispatchToProps)(EachDoctor);
