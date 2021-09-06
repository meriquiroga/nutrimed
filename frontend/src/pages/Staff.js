import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

class Staff extends Component {
  state = {};
  componentDidMount() {
    this.props.doctors();
    // const { doctors } = this.props
  }
  render() {
    let result = this.state.doctors.map((item) => (
      <div className="contenedor">
        <Link to="/information">
          <div
            className="doctor-image"
            style={{
              backgroundImage: `url('/assets/${item.src}')`,
            }}
          ></div>
        </Link>
        <p>{item.name}</p>
        <p>Especialista en {item.specialty}</p>
        <p>Matricula {item.dni}</p>
      </div>
    ));

    return (
      <div className="contenedor1">
        <h1>{result}</h1>
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    doctors: state.users.doctors,
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
};

export default connect(mapStateTopProps, mapDispatchToProps)(Staff);
