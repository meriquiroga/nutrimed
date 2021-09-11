import { useState } from "react"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"
import { Link } from "react-router-dom"

const EditProfileDoctor = (props) => {
  console.log(props)
  const {token} = props
  const {data, dni, description, specialty, registration} = props.user
  const email = props.user.data.mail;
  const [valueIn, setValueIn] = useState(true);
  const [validEdit, setValidEdit] = useState(false)
  const [actDoc, setActDoc] = useState({
    dni: "",
    description: "",
    registration: "",
    specialty: "",
    data: {
      direction: {
        street: "",
        num: "",
        city: "",
      },
      mail: email,
      phoneNumber: "",
      },
      socialWork: "",
   })

   const editHandler = () => {
      setValidEdit(!validEdit)
   }

   const addDocHandler = (e) => {
      // if (e.target.name === "socialWork"){
      //   console.log("aca")
      //   console.log(valueIn)
      //   setActDoc({...actDoc, [e.target.name]: valueIn})
      //   }
      if (e.target.name === "street") {
         setActDoc({
            ...actDoc,
            data: {
               ...actDoc.data,
               direction: { ...actDoc.data.direction, street: e.target.value },
            },
         })
      } else if (e.target.name === "phoneNumber") {
         setActDoc({
            ...actDoc,
            data: { ...actDoc.data, phoneNumber: e.target.value },
         })
      } else if (e.target.name === "num") {
         setActDoc({
            ...actDoc,
            data: {
               ...actDoc.data,
               direction: { ...actDoc.data.direction, num: e.target.value },
            },
         })
      } else if (e.target.name === "city") {
         setActDoc({
            ...actDoc,
            data: {
               ...actDoc.data,
               direction: { ...actDoc.data.direction, city: e.target.value },
            },
         })
      } else {
         setActDoc({ ...actDoc, [e.target.name]: e.target.value })
      }
   }

   const socialWorkHandler = (e) => {
      setValueIn(!valueIn)
      setActDoc({ ...actDoc, [e.target.name]: valueIn })
   }

   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         submitHandler()
      }
   }

   const submitHandler = () => {
      props.upgradeDoc(props.user.doc, actDoc, props.token).then((res) => {
         console.log(res)
      })
   }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler()
    }
  }

  const submitHandler = () => {
    props.upgradeDoc(props.user.doc, actDoc, props.token)
    .then((res)=> {console.log(res)})
  };

  return (
    <>
      <div className="container">
        <div className="grayContainer">
          <h3>Completá o actualizá tus datos</h3>
          <form className="inputs">
            <input
              type="text"
              placeholder="DNI"
              name="dni"
              onChange={addDocHandler}
              // defaultValue={actDoc.dni}
              defaultValue={token ? dni : actDoc.dni}
              disabled={!dni ? false : (validEdit ? false :  true)}
              
            />
            <input
              type="text"
              placeholder="Descripción"
              name="description"
              onChange={addDocHandler}
              // defaultValue={actDoc.description}
              defaultValue={token ? description : actDoc.description}
              disabled={!description.join() ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="N° de matrícula"
              name="registration"
              onChange={addDocHandler}
              // defaultValue={actDoc.registration}
              defaultValue={token ? registration : actDoc.registration}
              disabled={!registration ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="Especialidad"
              name="specialty"
              onChange={addDocHandler}
              // defaultValue={actDoc.specialty}
              defaultValue={token ? specialty : actDoc.specialty}
              disabled={!specialty ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              name="phoneNumber"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.phoneNumber}
              defaultValue={token ? data.phoneNumber : actDoc.data.phoneNumber}
              disabled={!data.phoneNumber ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="Calle"
              name="street"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.street}
              defaultValue={token ? data.direction.street : actDoc.data.direction.street}
              disabled={!data.direction.street ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="Número"
              name="num"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.num}
              defaultValue={token ? data.direction.num : actDoc.data.direction.num}
              disabled={!data.direction.num ? false : (validEdit ? false :  true)}
            />
            <input
              type="text"
              placeholder="Ciudad"
              name="city"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.city}
              defaultValue={token ? data.direction.city : actDoc.data.direction.city}
              disabled={!data.direction.city ? false : (validEdit ? false :  true)}
              onKeyPress={handleKeyPress}
            />
            <span onClick={editHandler}>{!validEdit ? "Editar ✏️" : "Cancelar ❌"}</span>
          </form>
          <h4>¿Acepta Obra Social? </h4>
          <div className="radio">
            <div>
              Si{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={true}
              />
            </div>
            <div>
              No{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={false}
              />
              </div>
               </div>
               <button onClick={submitHandler}>Actualizar datos</button>
               <div>
                  <Link to="/profile">Volver al perfil</Link>
               </div>
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      user: state.users.dataUser,
      token: state.users.token,
   }
}

const mapDispatchToProps = {
   upgradeDoc: doctorActions.editProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDoctor)
