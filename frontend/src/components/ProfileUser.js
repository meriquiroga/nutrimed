import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProfileUser = (props) => {
  return (
    <div className="profile">
      <div className="leftProfile">
        <img
          className="profileImg"
          src={props.user.userExist.src}
          alt="profile"
        />
        <h4>Bienvenido/a, {props.user.userExist.name}</h4>
        <p>
          Para poder sacar turno es necesario completar tus datos haciendo click
          en el siguiente botón.
        </p>
        <Link
          className="linkCompleta"
          to={!props.user.userExist.doc ? "/patient/profile" : "/doc/profile"}
        >
          Complete su perfil
        </Link>
      </div>
      <div>
        <div className="centroProfile">
          <h3 className="tituloProfile">Mis datos</h3>
          <div className="datosProfile">
            <h4>Nombre: {props.user.userExist.name}</h4>
            <h4>Apellido: {props.user.userExist.lastName}</h4>
          </div>
          <div className="datosProfile">
            <h4>
              DNI:{" "}
              {!props.user.userExist.dni
                ? "A completar en su perfil"
                : props.user.userExist.dni}
            </h4>
            <h4>
              Direccion:{" "}
              {!props.user.userExist.data.direction.street
                ? "A completar en su perfil"
                : `${props.user.userExist.data.direction.street} ${props.user.userExist.data.direction.num}`}
            </h4>
          </div>
          <div className="datosProfile">
            {
              <h4>
                Telefono:{" "}
                {!props.user.userExist.data.phoneNumber
                  ? "A completar en su perfil"
                  : props.user.userExist.data.phoneNumber}
              </h4>
            }
            {<h4>Email: {props.user.userExist.data.mail}</h4>}
          </div>
        </div>
      </div>
      <div className="rightProfile">
        {!props.user.userExist.doc ? (
          <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4>
        ) : (
          <h3 className="proxTurnos">PRÓXIMOS PACIENTES</h3>
        )}
        {!props.user.userExist.doc ? (
          <p className="turnos">No tenés turnos programados.</p>
        ) : (
          <h5 className="turnos">No tenes pacientes por el momento</h5>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
  };
};

export default connect(mapStateToProps)(ProfileUser);
