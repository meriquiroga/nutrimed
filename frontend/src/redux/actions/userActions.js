import axios from "axios"

const userActions = {

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
    },

    logUserWithLs: (token) => {
        return async (dispatch) => {
           try {
                let res = await axios.get("http://localhost:4000/api/verifyToken", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                console.log(res)
            dispatch({type: "SIGN", payload: {newUser: res.data, token}})
        }catch(err) {
            return dispatch({type: "LOG_OUT"})
        }}
    },

}

export default userActions