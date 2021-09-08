import { connect } from "react-redux"
import { useEffect, useState } from "react"
import patientActions from "../redux/actions/patientActions"
import Description from "./Description"

const MedicalData = (props) => {
   const [descriptions, setDescriptions] = useState([])
   const [inputDescription, setInputDescription] = useState({ description: "" })

   useEffect(() => {
      props.getPatients()
   }, [])

   const inputHandler = (e) => {
      setInputDescription({
         ...inputDescription,
         description: e.target.value,
      })
   }

   const submitHandler = () => {
      props
         .postDescription(
            props.patients[0]._id,
            props.token,
            inputDescription.description
         )
         .then((res) => {
            setDescriptions(res.res)
         })
      setInputDescription({ description: "" })
   }

   const pressEnter = (e) => {
      if (e.key === "Enter") {
         submitHandler()
      }
   }

   console.log(props)

   return (
      <>
         <div className="medicalData">
            <h1>HISTORIAL MÉDICO</h1>
            <h2>Paciente</h2>
            <div className="ABC">
               <div>
                  <img
                     className="imgMD"
                     // src={props.patients[0].src}
                     alt="abc"
                  />
               </div>
               <div>
                  {" "}
                  {/* <p>Nombre: {props.patients[0].name}</p>
                  <p>Apellido: {props.patients[0].lastName}</p> */}
                  {/* <p>
                     DNI:{" "}
                     {props.patients[0].dni != null
                        ? props.patients[0].dni
                        : "Falta completar"}
                  </p> */}
               </div>
               <div>
                  {" "}
                  <p>Domicilio: Falta completar</p>
                  <p>Telefono: Falta completar</p>
                  {/* <p>E-mail: {props.patients[0].data.mail}</p> */}
               </div>
            </div>
            <div className="DEF">
               <h2>Descripción</h2>
               <div className="descripcion">
                  {descriptions.map((description, index) => {
                     return (
                        <Description description={description} key={index} />
                     )
                  })}
               </div>
               <div>
                  <input
                     type="text"
                     name="description"
                     placeholder="Ingresar descripcion"
                     onChange={inputHandler}
                     onKeyPress={pressEnter}
                  />
                  <button onClick={submitHandler}>ENVIAR</button>
               </div>
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      token: state.users.token,
      dataUser: state.users.dataUser,
      patients: state.patients.patients,
   }
}

const mapDispatchToProps = {
   postDescription: patientActions.postDescription,
   getPatients: patientActions.getPatients,
}
export default connect(mapStateToProps, mapDispatchToProps)(MedicalData)
