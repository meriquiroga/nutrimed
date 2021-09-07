import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { useState } from "react"
import { connect } from "react-redux"
import userActions from '../redux/actions/userActions'
import { Link } from 'react-router-dom'



const Login = (props) => {


    const [valueIn, setValueIn] = useState("")
    const [userLog, setUserLog] = useState({
        data: {mail: ""},
        password: "",
        google: false
    })

    const userLogin = (e) =>{
        
        if (e.target.name === "data"){
            setUserLog({...userLog, data: {mail: e.target.value}})
        }else {
            setUserLog({...userLog, [e.target.name]: e.target.value})
        }
        
    }
    const responseGoogle = (res) => {
        let newUserWithGoogle = {
            data: {mail: res.profileObj.email}, 
            password: res.profileObj.googleId
        }
        props.logIn(newUserWithGoogle, validUser)
    }


    const responseFacebook = (res) => {
        if (res.id){
        let logWithFacebook = {
            data: {mail: res.email},
            password: res.id
        }
        props.logIn(logWithFacebook, validUser)
        .then((res) => {console.log(res)

        }).catch((e)=> console.log(e))
    }}



    const validInputHandler = (e) => {
        setValueIn(e.target.value)
    }

    const submitUserLog = () => {
        props.logIn(userLog, validUser, )
    }
    
    let validUser = valueIn === "prof" ? "profesional" : "comun" 
    let dispGo = valueIn === "prof" ? "none" : "block"


    return (
        <>
            <div>Paciente <input onClick={validInputHandler} type="radio" name="buttonRol" defaultValue="pat" defaultChecked/></div>
            <div>Profesional <input onClick={validInputHandler} type="radio" name="buttonRol" defaultValue="prof"/></div>

            <input type="email" placeholder="Enter your email" name="data" defaultValue={userLog.data.mail} onChange={userLogin}/>
            <input type="password" placeholder="Enter your password" name="password" defaultValue={userLog.password} onChange={userLogin}/>
            <button id= "buttonSign" onClick ={submitUserLog}>Login</button>
            <div style={{display:dispGo}}>
                <GoogleLogin
                    clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                    buttonText="Login with Google account"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <FacebookLogin 
                    appId="283809223550858"
                    autoLoad={false}
                    fields="email"
                    textButton="Registrarse con facebook"
                    icon="fa-facebook"
                    callback={responseFacebook} />
                <p>¿No tiene cuenta? <Link to = "/signup">¡Crear cuenta!</Link></p>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    logIn: userActions.logIn
}

export default connect(null, mapDispatchToProps)(Login)