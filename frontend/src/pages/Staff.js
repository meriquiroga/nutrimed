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
      return <h1>{this.state.loading.text}</h1>;
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
                <p>Matricula: {obj.registration}</p>
                <p>Especialidad: {obj.specialty}</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return <div className="doctorCardsContainer">{doctor}</div>;
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
