import axios from "axios"

const userActions = {
   signUpUser: (user) => {
      return async (dispatch, getState) => {
         try {
            let response = await axios.get(
               "http://localhost:4000/api/appointments/",
               user
            )
            if (response.data.success) {
               dispatch({
                  type: "GET_APPOINTMENTS",
                  payload: response.data.res,
               })
               return { success: true }
            }
         } catch (err) {
            return { success: false, res: err.message }
         }
      }
   },
}

export default userActions
