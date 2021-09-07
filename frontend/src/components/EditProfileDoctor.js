import { useState } from "react"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"
import { Link } from "react-router-dom"

const EditProfileDoctor = (props) => {
    // const mail = props.user.data.mail
    const [valueIn, setValueIn] = useState(true)
    const [actDoc, setActDoc] = useState({
        dni: "",
        description: "",
        registration: "",
        specialty: "",
        data: {
            direction: {
                street: "",
                num: "",
                city: ""
            },
            // mail,
            phoneNumber: "",
        },
        socialWork: "",
    })
    
    
    const addDocHandler = (e) => {
       
        if (e.target.name === "street"){
            setActDoc({...actDoc, data: {direction: {...actDoc.data.direction, street: e.target.value}}})
        }else if (e.target.name === "phoneNumber"){
            setActDoc({...actDoc, data: {...actDoc.data, phoneNumber: e.target.value}})
        }else if (e.target.name === "num"){
            setActDoc({...actDoc, data: {direction: {...actDoc.data.direction, num: e.target.value}}})
        }else if (e.target.name === "city"){
            setActDoc({...actDoc, data: {direction: {...actDoc.data.direction, city: e.target.value}}})
        }else  {
            setActDoc({...actDoc, [e.target.name]: e.target.value})
        }
    }


    const socialWorkHandler = () => {
        setValueIn(!valueIn)
    }


    const submitHandler = () => {
        props.upgradeDoc(props.user.doc, actDoc, props.token)
    }

    const allSocialWork = [
        "MEDICAL",
        "SWISS",
        "APMA",
        "OSDE",
        "CARA",
        "UDE",
        "OSPIM",
        "PREVENCIOON SALUD",
        "SANCOR",
        "LIAW",
     ]

    
    return (
        <>  
         <div className="container">
             <div className="signUpForm">
             <h2>Termina de completar tus datos</h2>
            <input type="number" placeholder="DNI" name="dni" onChange={addDocHandler} defaultValue={actDoc.dni}/>
            <input type="text" placeholder="Descripción" name="description" onChange={addDocHandler} defaultValue={actDoc.description}/>
            <input type="text" placeholder="N° de matrícula" name="registration" onChange={addDocHandler} defaultValue={actDoc.registration}/>
            <input type="text" placeholder="Especialidad" name="specialty" onChange={addDocHandler} defaultValue={actDoc.specialty}/>
            <input type="text" placeholder="Teléfono" name="phoneNumber" onChange={addDocHandler} defaultValue={actDoc.data.phoneNumber}/>
            <input type="text" placeholder="Calle" name="street" onChange={addDocHandler} defaultValue={actDoc.data.direction.street}/>
            <input type="number" placeholder="Número" name="num" onChange={addDocHandler} defaultValue={actDoc.data.direction.num}/>
            <input type="text" placeholder="Ciudad" name="city" onChange={addDocHandler} defaultValue={actDoc.data.direction.city}/>
            <h4>¿Acepta Obra Social? </h4> 
            {valueIn ? "No" : "Si"}<input type="checkbox" onClick={socialWorkHandler}/>

            <select disabled={valueIn ? true : false} onChange={addDocHandler} name="socialWork" defaultValue={actDoc.socialWork} >
                {allSocialWork.map((social, index) => (
                    <option key={index}>{social}</option>
                ))}
            </select>
            <button onClick={submitHandler}>Actualizar datos</button>
            

            <Link to="/doctor">Volver al perfil</Link>
             </div>

        </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.dataUser,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    upgradeDoc: doctorActions.editProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDoctor)