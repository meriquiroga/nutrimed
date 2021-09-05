import { connect } from "react-redux"
import {useEffect, useState} from "react"
import socialActions from "../redux/actions/socialActions"
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css'



const SignUpPat = () => {
    let breaker = true
    const [socialWork, setSocialWork] = useState()
    const [valueIn, setValueIn] = useState("")
    const [validSelect, setValidSelect] = useState(false)
    const [newUser, setNewUser] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordProf: "",
        validPassword: "",
        photo: "",
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    // useEffect(()=> {
    //     props.getSocialWorks()
    // }, [])


    function validFields(field) {
        for (var i in field){
            if(!field[i].length){
                Toast.fire({
                    icon: 'error',
                    title: 'The field to complete is '+[i]
                    })
                breaker = false
                break
            }
        }    
    }           

    const responseGoogle = res => {
        let logWithGoogle = {
            name: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            photo: res.profileObj.imageUrl,
        }
        // props.signUp(logWithGoogle)
        // .then((res) => {
            
        // }).catch((e)=> console.log(e))
    }

    const responseFacebook = (res) => {
        console.log(res)
        let logWithFacebook = {
            name: res.first_name,
            lastName: res.last_name,
            email: res.email,
            password: res.id,
            photo: res.picture.data.url,
        }
        // props.signUp(logWithFacebook)
        // .then((res) => {

        // }).catch((e)=> console.log(e))
    }
    const submitHandler = () => {
        validFields(newUser)
        console.log("hola")
        // props.signUp(newUser)
    }
    
    const addUserHandler = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
        
    }
    console.log(newUser)
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
                        <div>Paciente <input onClick={validInputHandler} type="radio" name="buttonRol" value="pat" defaultChecked/></div>
                        <div>Profesional <input onClick={validInputHandler} type="radio" name="buttonRol" value="prof"/></div>
                    </div>
                    <div className="inputs">
                    <input type="text" placeholder="Nombre" name="name" onChange={addUserHandler} value={newUser.name}/>
                    <input type="text" placeholder="Apellido"name="lastName" onChange={addUserHandler} value={newUser.lastName}/>
                    <input type="email" placeholder="E-mail" name="email" onChange={addUserHandler} value={newUser.email}/>
                    <input type="password" placeholder="Contraseña"name="password" onChange={addUserHandler}  value={newUser.password}/>
                    <input  type="password" placeholder="Repita su contraseña"name="validPassword" onChange={addUserHandler}  value={newUser.validPassword}/>
                    <input style={{display:disp}} type="text" placeholder="Contraseña de profesional" name="passwordProf" onChange={addUserHandler} value={newUser.passwordProf}/>
                    </div>
                    <button onClick={submitHandler} >REGISTRARSE</button>
                    <div style={{display:dispGo}}>
                        <div>
                            <GoogleLogin 
                            clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                            buttonText="Registrarse con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div>
                        <FacebookLogin
                            appId="283809223550858"
                            autoLoad={false}
                            fields="first_name,last_name,email,picture"
                            textButton="Registrarse con facebook"
                            icon="fa-facebook"
                            callback={responseFacebook} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// const mapDispatchToProps = {
//     getSocialWorks: socialActions.getSocialWorks
// }
// connect(null, mapDispatchToProps)
export default (SignUpPat)