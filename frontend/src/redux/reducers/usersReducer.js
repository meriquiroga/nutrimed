const usersReducer = (state={dataUser:{}, token: null}, action) => {
    switch (action.type) {
        case "SIGN_UP":
            console.log(action.payload)
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
