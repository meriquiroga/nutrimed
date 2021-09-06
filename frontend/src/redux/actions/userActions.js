import axios from "axios"

const userActions = {
    // getSocialWorks: () => {
    //     return async () => {
    //         try {
    //             let response = await axios.get("")
    //             return response
    //         }catch(e){
    //             return {}
    //         }
    //     }
    // },

    signUpUser: (user) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user", user)
                if (response.data.success) {
                    dispatch({type: "SIGN_UP", payload: response.data.res})
                    return {success: true}
                }
                
            }catch(err){
                return {success: false, res:err.message}
            }
        }
    }
}

export default userActions