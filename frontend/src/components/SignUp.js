import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import userActions from "../redux/actions/userActions";
import patientActions from "../redux/actions/patientActions";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip"


const SignUp = ({ signUpUser, getAvatars }) => {
  let valor = null;
  const [valueIn, setValueIn] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState({errorOne: false, errorTwo: false});
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    data: { mail: "" },
    password: "",
    passwordAdm: "",
    validPassword: "",
    src: "",
    doc: false,
  });
  const [previewImg, setPreviewImg] = useState(
    "https://i.postimg.cc/Hn7rq5TV/avatar5.png"
  );
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function getAllAvatars() {
      let response = await getAvatars();
      if (response.success) {
        setAvatars(response.res);
      } else {
        console.log("no fetchea avatares");
      }
    }
    getAllAvatars();

    return false;
    // eslint-disable-next-line
  }, []);
  const inputValue = (e) => {
    setPreviewImg(e.target.value);
  };

  const validFields = (field) => {
    for (var i in field) {
      if (
        !field[i].length &&
        !Object.values([i]).includes("data") &&
        !Object.values([i]).includes("passwordAdm")
      ) {
        valor = valor + 1;
        (valor > 1 || errors.length > 1)  && setError({errorOne: true});
      }
    }
    return valor;
  };



  const responseGoogle = (res) => {
    let logWithGoogle = {
      name: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      data: { mail: res.profileObj.email },
      password: res.profileObj.googleId,
      src: res.profileObj.imageUrl,
      google: true,
    };
    signUpUser(logWithGoogle).then((res) => {
      if (!res.success) {
        setError({errorOne: true});
        setErrors([{ message: res.res }]);
      }
    });
  };

  const submitHandler = () => {
    validFields(newUser);
    if (valueIn === "prof") {
      newUser.doc = true;
    } else {
      newUser.doc = false;
    }
    if (valor < 2) {
      signUpUser({ ...newUser, doc: newUser.doc }).then((res) => { console.log(res)
        if (!res.success) {
          setError({errorOne: true})
          setError({errorTwo: true})
          typeof res.res === "string"
            ? setErrors([{ message: "Ups! intentelo mas tarde" }])
            : setErrors(res.res)
        }
      });
    }else
    setErrors([{ message: "Todos los campos deben estar completos" }])
  };

  const addUserHandler = (e) => {
    setError({errorOne: false});
    setError({errorTwo: false})
    if (e.target.name === "data") {
      setNewUser({ ...newUser, data: { mail: e.target.value } });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const validInputHandler = (e) => {
    setValueIn(e.target.value);
  };


  let disp = valueIn === "prof" ? "block" : "none";
  let dispGo = valueIn === "prof" ? "none" : "block";

      let mensaje1 = null
      let mensaje2 = null
      let mensaje3 = null
      let mensaje4 = null
      let mensaje5 = null
      let mensaje6 = null

    return (
      <>
      {  
      errors.forEach(newError => 
        newError.message.includes("dato") ? mensaje1 = newError.message 
      : newError.message.includes("nombre") ? mensaje2 = newError.message
      : newError.message.includes("apellido") ? mensaje3 = newError.message
      : newError.message.includes("email") ? mensaje4 = newError.message
      : newError.message.includes("contraseña") ? mensaje5 = newError.message
      : newError.message.includes("validar") ? mensaje6 = "Las contraseñas deben coincidir" 
      : console.log(error))
      
        }

      <ReactTooltip id="buttonError1" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : mensaje2 && mensaje2} </ReactTooltip>
      <ReactTooltip id="buttonError2" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : mensaje3 && mensaje3} </ReactTooltip>
      <ReactTooltip id="buttonError3" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : mensaje4 && mensaje4} </ReactTooltip>
      <ReactTooltip id="buttonError4" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : mensaje5 && mensaje5} </ReactTooltip>
      <ReactTooltip id="buttonError5" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : mensaje6 && mensaje6} </ReactTooltip>
      <ReactTooltip id="buttonError6" place="top" effect="solid" className="buttonGoogle"> {mensaje1 ? mensaje1 : ""} </ReactTooltip>

        <div className="container">
          <div className="grayContainer">
            <img src='/assets/form.png' alt=""/>  
            <h3>¿Usted se registrará como paciente o profesional?</h3>
            <div className="radio">
              <div>Paciente 
                <input
                 onClick={validInputHandler} 
                 type="radio" 
                 name="buttonRol" 
                 defaultValue="pat" 
                 defaultChecked/>
              </div>
              <div>Profesional 
                <input 
                onClick={validInputHandler} 
                type="radio" 
                name="buttonRol" 
                defaultValue="prof"/>
              </div>
            </div>
            <div className="inputs">
              <input 
              type="text" 
              placeholder="Nombre" 
              className={
                ((error.errorOne && !newUser.name.length) ? "errorY" : "errorN")}
              name="name"
              onChange={addUserHandler}  
              defaultValue={newUser.name}  
              />
              {<img data-tip data-for="buttonError1" style={{height:"40px", width:"40px", display: ((error.errorOne && !newUser.name.length) || error.errorTwo) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <input 
              type="text" 
              placeholder="Apellido"
              name="lastName"  
              className={
                ((error.errorOne && !newUser.lastName.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} 
              defaultValue={newUser.lastName} 
              />
              {<img data-tip data-for="buttonError2" style={{height:"40px", width:"40px", display:((error.errorOne && !newUser.lastName.length) || error.errorTwo) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <input 
              type="email" 
              placeholder="Email" 
              name="data" 
              className={
                ((error.errorOne && !newUser.data.mail.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} 
              defaultValue={newUser.data.mail} 
              />
              {<img data-tip data-for="buttonError3"  style={{height:"40px", width:"40px", display:((error.errorOne && !newUser.data.mail.length) || error.errorTwo) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <input 
              type="password" 
              placeholder="Contraseña"
              name="password" 
              className={
                ((error.errorOne && !newUser.password.length) ? "errorY" : "errorN")} 
              onChange={addUserHandler}  
              defaultValue={newUser.password} 
              />
              {<img data-tip data-for="buttonError4" style={{height:"40px", width:"40px", display:((error.errorOne && !newUser.password.length) || error.errorTwo) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <input 
              type="password" 
              placeholder="Repita su contraseña"
              name="validPassword" 
              className={
                ((error.errorOne && !newUser.validPassword.length) ? "errorY" : "errorN")}
              onChange={addUserHandler}
              defaultValue={newUser.validPassword}
                />
              {<img data-tip data-for="buttonError5" style={{height:"40px", width:"40px", display:((error.errorOne && !newUser.validPassword.length) || error.errorTwo) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <input 
              type="password" 
              placeholder="Clave profesional NutriMed" 
              name="passwordAdm"
              style={{display:disp}}  
              className={
                ((error.errorOne && !newUser.passwordAdm.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} 
              defaultValue={newUser.passwordAdm} 
              required={valueIn === "prof" ? true : false}
              />
            </div>
          </div>
          
          <h3>Elija su avatar para perfil</h3>

          <div className="containerPreview" >
          {<img data-tip data-for="buttonError6" style={{height:"40px", width:"40px", display:(error.errorOne && errors.length) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
              <div
                className="preview"
                style={{
                  backgroundImage: `url("${previewImg}")`,
                }}
              ></div>
            <div className={((error.errorOne && !newUser.src.length) ? "errorY thumbNails" : "errorN thumbNails")}>
              {avatars.map((div, index) => (
                <div
                  onClick={inputValue}
                  className="thumbNail"
                  key={index}
                  style={{
                    backgroundImage: `url("${div.src}")`,
                  }}
                >
                  <input className="inputAvatar" name="src" onClick={addUserHandler}  defaultValue={div.src}></input>
                </div>
              ))}
            </div>
          </div>
          {/* {error.errorOne &&
              errors.map((error) => (
                <p key={error.message} style={{ fontSize: "1.3vmin" }}>
                  *{error.message}
                </p>
              ))} */}
          <button onClick={submitHandler}>REGISTRARSE</button>

          <div style={{ display: dispGo }}>
            <div>
              <GoogleLogin
                clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                buttonText="Registrarse con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <p>
            ¿Ya tenés cuenta? <Link to="/signin">¡Ingresá aquí!</Link>
          </p>
          
        </div>     
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
  getAvatars: patientActions.getAvatars,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
