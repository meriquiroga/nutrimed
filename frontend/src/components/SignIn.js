import { GoogleLogin} from 'react-google-login'
import { useState } from "react"
import { connect } from "react-redux"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import { set } from 'mongoose'

const SignIn = ({ logIn }) => {
   const [valueIn, setValueIn] = useState("")
   const [errors, setErrors] = useState("")
   const [error, setError] = useState({ errorUno: false, errorDos: false })
   const [userLog, setUserLog] = useState({
      data: { mail: "" },
      password: "",
      google: false,
   })

const userLogin = (e) => {
      setError({ errorUno: false })
      if (e.target.name === "data") {
         setUserLog({ ...userLog, data: { mail: e.target.value } })
      } else {
         setUserLog({ ...userLog, [e.target.name]: e.target.value })
      }
   }
const responseGoogle = (res)=>{
   let newUserWithGoogle ={
      data: { mail: res.profileObj.email },
         password: res.profileObj.googleId,
         flagGoogle: true
   }
   logIn(newUserWithGoogle, validUser)
   .then(res=>{
      if(!res.success){
         set("Debe estar registrado con Google para utilizar este botón")
         setError({ errorDos: true })
      }
   })
}

const validInputHandler = (e)=>{
   setError({ errorUno: false })
      setValueIn(e.target.value)
}

const submitUserLog = ()=>{
   if(!userLog.password.length || !userLog.data.mail.length){
      setError({ errorUno: true })
      setErrors("Todos los campos deben estar completos")
   }
   if(!error.errorUno){
      logIn(userLog, validUser)
      .then(res=>{
         if(!res.success){
            setErrors("Error de autenticación. Verifique correctamente")
            setError({ errorUno: true })
         }
      })
   }
}
const handleKeyPress = (e) => {
   if (e.key === "Enter") {
      submitUserLog()
   }
}

let validUser = valueIn === "prof" ? "profesional" : "comun";
let dispGo = valueIn === "prof" ? "none" : "block";

return(
   <>
   {valueIn === "" && <ReactTooltip id="button_Google" place="right" effect="solid" className="buttonGoogle"> Debe seleccionar tipo de usuario </ReactTooltip>}
   <ReactTooltip id="buttonError" place="top" effect="solid" className="buttonGoogle"> {errors} </ReactTooltip>
   <div className="container">
      <div className="grayContainer">
         <img src="/assets/login.png" alt="" />
          <h3>Por favor, seleccioná si sos paciente o profesional</h3>
          <div className="radio">
             <div>
                <p>Paciente </p>
                <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                value="pat"
                defaultChecked
              />
             </div>
             <div>
                <p>Profesional </p>
                <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                value="prof"
              />
             </div>
          </div>
          <div className="inputs">
            <div className="forError">
            <input
              type="email"
              placeholder="E-mail"
              name="data"
              defaultValue={userLog.data.mail}
              onChange={userLogin}
              className={((error.errorUno && !userLog.data.mail.length) ? "errorY" : "errorN")}
            />
            </div>
            <div className="forError">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              defaultValue={userLog.password}
              onChange={userLogin}
              className={((error.errorUno && !userLog.password.length) ? "errorY" : "errorN")}
              onKeyPress={handleKeyPress}
            />
            {<img data-tip data-for="buttonError" style={{height:"40px", width:"40px", display: (error.errorUno || error.errorDos) ? "block" : "none"}} src="/assets/cross.png" alt="..."/>}
            </div>
          </div>
         <button id="buttonSign" onClick={submitUserLog}>LOGIN</button>
         <div
                  style={{
                     display: valueIn === "prof" ? "none" : "block flex",
                     justifyContent: "center",
                  }}
               >
                  <GoogleLogin
                     disabled={valueIn === "" ? true : false}
                     clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                     buttonText="Ingresar con Google"
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy={"single_host_origin"}
                  />
               </div>
               <p>
                  ¿No tenés cuenta? <Link to="/signup">¡Creala aquí!</Link>
               </p>

      </div>
   </div>
   </>
)

}

const mapDispatchToProps = {
   logIn: userActions.logIn,
}

export default connect(null, mapDispatchToProps)(SignIn)
