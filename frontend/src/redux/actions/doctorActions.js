import axios from "axios"

const doctorActions = {
    editProfileDoctor: (idDoctor) => {
        return async () => {
            try {
                let res = await axios.put(`http://localhost:4000/api/doctor/perfil/${idDoctor}`)
                if (res.data.success){
                    return {success: true}
                }

            } catch(err) {
                return {success: false, res: err}
            }
        }
    },
    getDoctors: () => {
        return async (dispatch, getState) => {
          try {
            let res = await axios.get("http://localhost:4000/api/doctors");
            let info = res.data.res;
            dispatch({ type: "GET_ALL_DOCTORS", payload: info });
          } catch (err) {
            return {success: false, res: err}
           
        }
        
      }
    },
}



export default doctorActions