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

   postDescription: (id, token, description) => {
      return async (dispatch, getState) => {
         try {
            let res = await axios.put(
               "http://localhost:4000/api/patient/" + id,
               { description },
               {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               }
            )
            if (res.data.res) {
               return { success: true, res: res.data.res }
            } else {
               throw new Error("Database Error")
            }
         } catch (err) {
            return { success: false, error: err }
         }
      }
   },
}

export default patientActions
