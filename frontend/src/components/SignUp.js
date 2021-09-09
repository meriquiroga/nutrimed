import { connect } from "react-redux"
import { useState } from "react"
import { GoogleLogin } from 'react-google-login'
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"

const SignUp = ({signUpUser}) => {
    let valor = null
    const [valueIn, setValueIn] = useState("")
    const [errors, setErrors] = useState([])
    const [error, setError] = useState(false)
    const [newUser, setNewUser] = useState({
        name: "",
        lastName: "",
        data: {mail: ""},
        password: "",
        passwordAdm: "",
        validPassword: "",
        src: "",
        doc: false,
    })

    const validFields=(field)=>{
      for (var i in field ){
        if(!field[i].length && !Object.values([i]).includes("data") && !Object.values([i]).includes("passwordAdm")){
            valor=valor+1
            setError(true)
        }
      }  
      return valor
    }
           

    const responseGoogle = res => {
        let logWithGoogle = {
            name: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            data: {mail: res.profileObj.email},
            password: res.profileObj.googleId,
            src: res.profileObj.imageUrl,
            google: true
        }
        signUpUser(logWithGoogle)
        .then((res) => {if (!res.success) {
          setError(true)
          setErrors([{message: res.res}])
        }})
    }

    const submitHandler = () => {
        validFields(newUser)
        if (valueIn === "prof"){
          newUser.doc = true
        }else{
          newUser.doc = false
        }
        if (valor < 2){
        signUpUser({...newUser, doc: newUser.doc})
        .then(res=> {if(!res.success){
          typeof res.res === 'string' ? setErrors([{message:'Ups! intentelo mas tarde'}]) :  setErrors(res.res)
        }
        })
        }
        setErrors([{message:'Todos los campos debe estar completos'}])
    }


  const addUserHandler = (e) => {
    setError(false);
    if (e.target.name === "data") {
      setNewUser({ ...newUser, data: { mail: e.target.value } });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const validInputHandler = (e) => {
    setValueIn(e.target.value)
  }


    let disp = valueIn === "prof" ? "block" : "none" 
    let dispGo = valueIn === "prof" ? "none" : "block"

    return (
      <>
        <div className="container">
          <div className="signUpForm">
            <img src='/assets/form.png' alt=""/>  
            <h3>¿Usted se registrará como paciente o profesional?</h3>
            <div className="radio">
              <div>Paciente <input onClick={validInputHandler} type="radio" name="buttonRol" defaultValue="pat" defaultChecked/></div>
              <div>Profesional <input onClick={validInputHandler} type="radio" name="buttonRol" defaultValue="prof"/></div>
            </div>
            <div className="inputs">
              <input type="text" placeholder="Nombre" className={((error && !newUser.name.length) ? "errorY" : "errorN")}
              name="name" onChange={addUserHandler}  defaultValue={newUser.name}  
              />
              <input type="text" placeholder="Apellido"
              name="lastName"  className={((error && !newUser.lastName.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} defaultValue={newUser.lastName} 
                />
              <input type="email" placeholder="Email" 
              name="data" className={((error && !newUser.data.mail.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} defaultValue={newUser.data.mail} 
              />
              <input type="password" placeholder="Contraseña"
              name="password" className={((error && !newUser.password.length) ? "errorY" : "errorN")} 
              onChange={addUserHandler}  defaultValue={newUser.password} 
              />
              <input type="password" placeholder="Repita su contraseña"
              name="validPassword" className={((error && !newUser.validPassword.length) ? "errorY" : "errorN")}
                onChange={addUserHandler}  defaultValue={newUser.validPassword} 
                />
              <input type="text" placeholder="Foto de perfil" 
              name="src" className={((error && !newUser.src.length) ? "errorY" : "errorN")}
                onChange={addUserHandler} defaultValue={newUser.src} 
                />
              <input type="password" placeholder="Contraseña de profesional" name="passwordAdm"
              style={{display:disp}}  className={((error && !newUser.passwordAdm.length) ? "errorY" : "errorN")}
              onChange={addUserHandler} defaultValue={newUser.passwordAdm} required={valueIn === "prof" ? true : false}
              />
            </div>
            <div>
              {error && errors.map(error => <p key={error.message} style={{fontSize:"1.3vmin"}} >*{error.message}</p>)}
            </div>
            <button  onClick={submitHandler}>REGISTRARSE</button>
                
            <div style={{display:dispGo}}>
              <div >
                  <GoogleLogin
                  clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                  buttonText="Registrarse con Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
              </div>
            </div>
            <p>
                ¿Ya tenés cuenta? <Link to="/login">¡Ingresá aquí!</Link>
            </p>
          </div>
        </div>
      </>
    )
  }

const mapStateToProps = (state) => {
  return {
    doctors: state.users.dataUser,
  }
}

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
