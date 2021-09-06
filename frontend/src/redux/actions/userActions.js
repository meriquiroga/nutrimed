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
        return async (dispatch, getState) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user", user)
                console.log(response)
                if (response.data.success) {
                    dispatch({type: "SIGN_UP", payload: response.data.res.newUser})
                    return {success: true}
                }
                
            }catch(e){
                return {success: false, response: e}
            }
        }
    }
}

export default userActions