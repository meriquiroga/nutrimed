import { useState } from "react"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"

const SignUpDoc = (props) => {
    
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
            mail,
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
        props.upgradeDoc(props.user._id, actDoc)
    }

    
    return (
        <>
            <input type="number" placeholder="DNI" name="dni" onChange={addDocHandler} defaultValue={actDoc.dni}/>
            <input type="text" placeholder="Descripción" name="description" onChange={addDocHandler} defaultValue={actDoc.description}/>
            <input type="text" placeholder="N° de matrícula" name="registration" onChange={addDocHandler} defaultValue={actDoc.registration}/>
            <input type="text" placeholder="Especialidad" name="specialty" onChange={addDocHandler} defaultValue={actDoc.specialty}/>
            <input type="text" placeholder="Teléfono" name="phoneNumber" onChange={addDocHandler} defaultValue={actDoc.data.phoneNumber}/>
            <input type="text" placeholder="Calle" name="street" onChange={addDocHandler} defaultValue={actDoc.data.direction.street}/>
            <input type="number" placeholder="Número" name="num" onChange={addDocHandler} defaultValue={actDoc.data.direction.num}/>
            <input type="text" placeholder="Ciudad" name="city" onChange={addDocHandler} defaultValue={actDoc.data.direction.city}/>
            ¿Acepta Obra Social? <input type="checkbox" onClick={socialWorkHandler}/>
            <select disabled={valueIn ? true : false} name="socialWork" >
                <option>No tengo Obra Social</option>
                {}
            </select>
            <button onClick={submitHandler}>Actualizar datos</button>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        doctor: state.users.dataUser
    }
}

const mapDispatchToProps = {
    upgradeDoc: doctorActions.editProfileDoctor
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)