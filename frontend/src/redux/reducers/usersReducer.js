const usersReducer = (state={dataUser:{}, token: null}, action) => {
    switch (action.type) {
        case "SIGN_UP":
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                dataUser: action.payload.newUser,
                token: action.payload.token
            }
        default:
            return state
    }
    
}
export default usersReducer
