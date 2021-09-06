import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const PatientCompleteData = () => {
   const [dataPatient, setDataPatient] = useState()
   const [clinicHistories, setClinicHistories] = useState(null)
   const sendData = async (e) => {
      e.preventDefault()
      const f = new FormData()

      for (let index = 0; index < clinicHistories.length; index++) {
         f.append("clinicalHistory", clinicHistories[index])
      }

      await axios
         .post("http://localhost:4000/api/patient", f)
         .then((res) => console.log(res))
         .catch((error) => console.log(error))
   }

   const inputPreview = useRef(null)
   const preview = useRef(null)

   const inputHandler = () => {
      const $inputPrewiew = inputPreview.current.files[0]
      const $preview = preview.current
      const readFile = new FileReader()

      if ($inputPrewiew) {
         readFile.readAsDataURL($inputPrewiew)
         readFile.onloadend = function () {
            $preview.src = readFile.result
         }
      } else {
         $preview.src = ""
      }
   }

   const obrasSociales = [
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
   console.log()
   return (
      <div className="dataClient">
         <h2>Termina de completar tus datos</h2>
         <form id="form">
            <label>DNI</label>
            <input type="text" placeholder="DNI"></input>
            <label>Dirección</label>
            <input type="text" placeholder="Calle"></input>
            <input type="text" placeholder="Numero"></input>
            <input type="text" placeholder="Ciudad"></input>
            <select id="inputState" name="country">
               <option defaultValue>ELIGE TU OBRA SOCIAL:</option>
               {obrasSociales.map((obra, index) => (
                  <option key={index}>{obra}</option>
               ))}
            </select>
            <label>Tu historia clinica</label>
            <input
               ref={inputPreview}
               type="file"
               name="file"
               multiple
               onChange={inputHandler}
            ></input>
            <div className="preview">
               <img src="" ref={preview} alt="preview" />
            </div>
            <button type="submit" onClick={sendData}>
               ENVIAR
            </button>
         </form>

         <Link to="/patient">Volver al perfil</Link>
      </div>
   )
}

export default PatientCompleteData
