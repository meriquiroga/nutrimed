import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip"

const SignIn = ({logIn}) => {
  const [valueIn, setValueIn] = useState("");
  const [errors, setErrors] = useState("")
  const [error, setError] = useState({errorUno: false, errorDos: false})
  const [userLog, setUserLog] = useState({
    data: { mail: "" },
    password: "",
    google: false,
  });

  // console.log(error1)

  const userLogin = (e) => {
    setError({errorUno: false})
    if (e.target.name === "data") {
      setUserLog({ ...userLog, data: { mail: e.target.value } });
      }else {
        setUserLog({ ...userLog, [e.target.name]: e.target.value });
    }
  };



  const responseGoogle = (res) => {
    let newUserWithGoogle = {
      data: { mail: res.profileObj.email },
      password: res.profileObj.googleId,
      flagGoogle: true,
    };
    logIn(newUserWithGoogle, validUser)
    .then((res) => {if (!res.success){
      setErrors("Debe estar registrado con Google para utilizar este botón")
      setError({errorDos: true})

      }else 
        console.log("k");
      });
  }
  
  const validInputHandler = (e) => {
    setError({errorUno: false})
    setValueIn(e.target.value);
  };

  const submitUserLog = () => {
    if(!userLog.password.length || !userLog.data.mail.length){
        setError({errorUno: true})
        setErrors("Todos los campos deben estar completos")
        return false
    }
    if(!error.errorUno){
      logIn(userLog, validUser)
      .then((res) => {if (!res.success) {
        setErrors("Error de autenticación. Verifique correctamente")
        setError({errorUno: true})
        }
      })
    } 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitUserLog()
    }
  }

  let validUser = valueIn === "prof" ? "profesional" : "comun";
  let dispGo = valueIn === "prof" ? "none" : "block";

  return (
    <>

      {valueIn === "" && <ReactTooltip id="button_Google"
        place="right"
        effect="solid"
        className="buttonGoogle"
      >
        Debe seleccionar tipo de usuario
      </ReactTooltip>}
    
      <div className="container">
        <div className="grayContainer">
          <img src="/assets/login.png" alt="" />
          <h3>Por favor, seleccioná si sos paciente o profesional</h3>
          <div className="radio">
            <div>
              Paciente{" "}
              <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                defaultValue="pat"
              />
            </div>
            <div>
              Profesional{" "}
              <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                defaultValue="prof"
              />
            </div>
          </div>
          <div className="inputs">
            <input
              type="email"
              placeholder="E-mail"
              name="data"
              defaultValue={userLog.data.mail}
              onChange={userLogin}
              className={((error.errorUno && !userLog.data.mail.length) ? "errorY" : "errorN")}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              defaultValue={userLog.password}
              onChange={userLogin}
              className={((error.errorUno && !userLog.password.length) ? "errorY" : "errorN")}
              onKeyPress={handleKeyPress}
            />
          </div>
          {error.errorUno && <p style={{fontSize:"small"}} >*{errors}</p>}
          {error.errorDos && <p style={{fontSize:"small"}} >*{errors}</p>}
          <button id="buttonSign" onClick={submitUserLog}>
            LOGIN
          </button>
          <div style={{ display: dispGo, display:"flex", justifyContent:"center"}}>
            <div  style={{width:"14%"}} data-tip data-for="button_Google">
              <GoogleLogin disabled={valueIn === "" ? true : false}
                clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                buttonText="Ingresar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <p>¿No tenés cuenta? <Link to="/signup">¡Creala aquí!</Link></p>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  logIn: userActions.logIn,
};

export default connect(null, mapDispatchToProps)(SignIn);