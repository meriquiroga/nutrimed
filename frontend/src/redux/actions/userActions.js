import axios from "axios"

const userActions = {

    signUpUser: (user) => {
        return async (dispatch) => {
            try {
                let res = await axios.post("http://localhost:4000/api/user", user)
                if (res.data.success) {
                    dispatch({type: "SIGN_UP", payload: res.data.res})
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
            dispatch({type: "SIGN", payload: {newUser: res.data, token}})
        }catch(err) {
            return dispatch({type: "LOG_OUT"})
        }}
    },

}

export default userActions