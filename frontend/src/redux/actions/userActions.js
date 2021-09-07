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
            dispatch({type: "SIGN_UP", payload: {newUser: res.data, token}})
        }catch(err) {
            return dispatch({type: "LOG_OUT"})
        }}
    },

    logIn: (user, validUser) => {
        
        let typeUser = null
        if (validUser === "comun"){
            typeUser = "patient"
        }else {
            typeUser = "doctor"
        }
        return async (dispatch) => {
        try {
            console.log(user)
            let res = await axios.get(`http://localhost:4000/api/${typeUser}`, (user))
            console.log(res)
            if(res.data.success)  {
                dispatch({type: "SIGN_UP", payload: {newUser: res.data, token: res.data.res.token}})
                
            }else {
                console.log(res)
                throw new Error()
                
            }
        }catch(err){
            return ({success: false, res: err.message})
        }
        }    
    },

    logOut: () => {
        return(dispatch) => {
            dispatch({type: "LOG_OUT"})
        }
    }

}

export default userActions