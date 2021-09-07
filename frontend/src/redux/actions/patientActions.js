import axios from "axios"

const patientActions = {
   editProfilePatient: () => {
      return async () => {
         try {
            let res = await axios.put(`http://localhost:4000/api/patient`, {})
            if (res.data.response) {
               return { success: true, response: res.data.response }
            }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },

   getPatients: () => {
      return async (dispatch, getState) => {
         try {
            let res = await axios.get("http://localhost:4000/api/patients")
            dispatch({ type: "GET_ALL_PATIENTS", payload: res.data.res })
            return { success: true }
         } catch (err) {
            return { success: false, res: err }
         }
      }
   },
}

export default patientActions
