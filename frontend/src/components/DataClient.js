const DataClient = () => {
   const sendData = (e) => {
      e.preventDefault()
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
            <select
               id="inputState"
               name="country"
               //    value={newUser.select}
               //    onChange={inputHandler}
            >
               <option defaultValue>ELIGE TU OBRA SOCIAL:</option>
               {obrasSociales.map((obra, index) => (
                  <option key={index}>{obra}</option>
               ))}
            </select>
            <label>Tu historia clinica</label>
            <input type="file"></input>
            <button type="submit" onClick={sendData}>
               ENVIAR
            </button>
         </form>
      </div>
   )
}

export default DataClient
