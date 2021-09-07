import { connect } from "react-redux"
import { useState} from "react"
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css'
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"



const SignUp = (props) => {
    let breaker = true
    const [valueIn, setValueIn] = useState("")
    const [newUser, setNewUser] = useState({
        name: "",
        lastName: "",
        data: {mail: ""},
        password: "",
        passwordAdm: "",
        validPassword: "",
        src: "",
        doc: false

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
            data: {mail: res.profileObj.email},
            password: res.profileObj.googleId,
            src: res.profileObj.imageUrl,
            google: true
        }
        props.signUpUser(logWithGoogle)
        .then((res) => {console.log(res)
            
        })
    }



    const responseFacebook = (res) => {
        if (res.picture){
        let logWithFacebook = {
            name: res.first_name,
            lastName: res.last_name,
            data: {mail: res.email},
            password: res.id,
            src: res.picture.data.url,
            google: true
        }
        props.signUpUser(logWithFacebook)
        .then((res) => {console.log(res)

        }).catch((e)=> console.log(e))
    }}


    const submitHandler = () => {
        // validFields(newUser)
        // if (breaker) 
        if (valueIn === "prof") newUser.doc = true
        else newUser.doc = false
        props.signUpUser({...newUser, doc: newUser.doc})
        .then((res)=>console.log(res)
        )
    }
    
    const addUserHandler = (e) => {
        if (e.target.name === "data"){
            setNewUser({...newUser, data: {mail: e.target.value}})
        }else{
            setNewUser({...newUser, [e.target.name]: e.target.value})
        }
    }

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
                    <input type="text" placeholder="Nombre" name="name" onChange={addUserHandler}  defaultValue={newUser.name}/>
                    <input type="text" placeholder="Apellido"name="lastName" onChange={addUserHandler} defaultValue={newUser.lastName}/>
                    <input type="password" placeholder="Contraseña"name="password" onChange={addUserHandler}  defaultValue={newUser.password}/>
                    <input type="password" placeholder="Repita su contraseña"name="validPassword" onChange={addUserHandler}  defaultValue={newUser.validPassword}/>
                    <input type="text" placeholder="Foto de perfil" name="src" onChange={addUserHandler} defaultValue={newUser.src}/>
                    <input type="email" placeholder="Email" name="data" onChange={addUserHandler} defaultValue={newUser.data.mail}/>
                    <input style={{display:disp}}  type="text" placeholder="Contraseña de profesional" name="passwordAdm" onChange={addUserHandler} defaultValue={newUser.passwordAdm}/>
                    </div>
                    <button onClick={submitHandler} >REGISTRARSE</button>
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
                <Link to = "/editdoc">Probar</Link>
            </div>

            

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        doctors: state.users.dataUser
    }
}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
