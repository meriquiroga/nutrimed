import axios from "axios"

const doctorActions = {
    editProfileDoctor: (idDoctor) => {
        return async () => {
            try {
                let response = await axios.put(`http://localhost:4000/api/doctor/perfil/${idDoctor}`, {})
                if (response.data.success){
                    return {success: true}
                }

            }catch(e){
                return {success: false, response: e}
            }
        }
    }
}

export default doctorActions