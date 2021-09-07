import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { useState } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"

const Login = (props) => {
   const [valueIn, setValueIn] = useState("")
   const [userLog, setUserLog] = useState({
      data: { mail: "" },
      password: "",
      google: false,
   })

  const userLogin = (e) => {
    if (e.target.name === "data") {
      setUserLog({ ...userLog, data: { mail: e.target.value } });
    } else {
      setUserLog({ ...userLog, [e.target.name]: e.target.value });
    }
  };
  const responseGoogle = (res) => {
    let newUserWithGoogle = {
      data: { mail: res.profileObj.email },
      password: res.profileObj.googleId,
      flagGoogle: true
    };
    props.logIn(newUserWithGoogle, validUser);
  };

  const responseFacebook = (res) => {
    if (res.id) {
      let logWithFacebook = {
        data: { mail: res.email },
        password: res.id,
        flagGoogle: true
      };
      props
        .logIn(logWithFacebook, validUser)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
    }
  };

   const validInputHandler = (e) => {
      setValueIn(e.target.value)
   }

  const submitUserLog = () => {
    props.logIn(userLog, validUser);
  };

   let validUser = valueIn === "prof" ? "profesional" : "comun"
   let dispGo = valueIn === "prof" ? "none" : "block"

   return (
      <>
         <div className="container">
            <div className="signUpForm">
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
                        defaultChecked
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
                  />
                  <input
                     type="password"
                     placeholder="Contraseña"
                     name="password"
                     defaultValue={userLog.password}
                     onChange={userLogin}
                  />
               </div>
               <button id="buttonSign" onClick={submitUserLog}>LOGIN</button>
               <div style={{ display: dispGo }}>
                  <div>
                     <GoogleLogin
                        clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                        buttonText="Ingresar con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                     />
                  </div>
                  <div>
                     <FacebookLogin
                        appId="283809223550858"
                        autoLoad={false}
                        fields="email"
                        textButton="Ingresar con facebook"
                        icon="fa-facebook"
                        callback={responseFacebook}
                     />
                     <p>
                        ¿No tenés cuenta?{" "}
                        <Link to="/signup">¡Creala aquí!</Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

const mapDispatchToProps = {
   logIn: userActions.logIn,
}

export default connect(null, mapDispatchToProps)(Login)
