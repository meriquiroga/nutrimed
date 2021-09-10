import axios from "axios"

const patientActions = {
   editProfilePatient: () => {
      console.log("editando")
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

   getCalendar: () => {
      return async (dispatch, getState) => {
         try {
            let calendar = await axios.get("http://localhost:4000/api/calendar")
            dispatch({ type: "GET_CALENDAR", payload: calendar.data.res })
            return { success: true, res: calendar.data.res }
         } catch (err) {
            return { success: false }
         }
      }
   },

   postDescription: (id, token, description) => {
      return async () => {
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
            if (res.data.success) {
               return { success: true, res: res.data.res }
            } else {
               throw new Error("Database Error")
            }
         } catch (err) {
            return { success: false, error: err }
         }
      }
   },

   addAppointment: (data) => {
      return async () => {
         try {
            let res = await axios.post(
               `http://localhost:4000/api/appointment/${data.doctorId}`,
               { date: data.date },
               {
                  headers: {
                     Authorization: "Bearer " + data.patientId,
                  },
               }
            )
            if (res.data.success) {
               return { success: true }
            } else {
               throw Error()
            }
         } catch (err) {
            return { success: false }
         }
      }
   },

   getSocket: (socket) => {
      return async (dispatch) => {
         try {
            dispatch({
               type: "SOCKET",
               payload: { socket },
            })
         } catch (err) {
            console.log(err)
         }
      }
   },

   confirmFormMail: (user) => {
      return async () => {
         try {
            let resMail = await axios.post(
               "http://localhost:4000/api/mail",
               {},
               {
                  headers: {
                     Authorization: "Bearer " + user,
                  },
               }
            )
            console.log(resMail)
         } catch (err) {
            console.log(err)
         }
      }
   },
}

export default patientActions
