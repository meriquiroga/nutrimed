

const SignUpDoc = () => {
    // const [valueIn, setValueIn] = useState("")
    // const [newUser, setNewUser] = useState({
    //     dni: "",
    //     phone: "",
    //     address: "",
    //     socialWork: "",
    // })
    
    // let disp = valueIn === "prof" ? "block" : "none" 
    // let dispGo = valueIn === "prof" ? "none" : "block"
    
    
    return (
        <>
            <input type="number" placeholder="DNI" name="dni" value={newUser.dni}/>
            <input type="tel" placeholder="Teléfono" name="telephone" value={newUser.phone}/>
            <input type="text" placeholder="Dirección" name="address" value={newUser.address}/>
            <select name="socialWork" >

                <option>No tengo Obra Social</option>
                {}
                <option>Otro</option>

            </select>

        </>
    )
}

export default SignUpDoc