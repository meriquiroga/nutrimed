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

    signUpUser: (newUser) => {
        console.log("action")
        console.log(newUser)
        return async (dispatch) => {
            try {
                let response = await axios.post("http://localhost:4000/api/user", newUser)
                console.log("hola")

                if (response.data.success) {
                    dispatch({type: "SIGN_UP", payload: response.data.res})
                }
            }catch(e){
                return {success: false, response: e}
            }
        }
    }
}

export default userActions