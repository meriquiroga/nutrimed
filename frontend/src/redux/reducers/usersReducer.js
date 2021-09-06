const usersReducer = (state={dataUser:{}, token: null, doctors:[]}, action) => {
    switch (action.type) {
        case "SIGN_UP":
            console.log(action.payload)
            return {
                ...state,
                dataUser: action.payload.newUser,
                token: action.payload.token
            }
            case "GET_ALL_DOCTORS":
                return {
                  ...state,
                  doctors: action.payload,
                }
        default:
            return state
    }
    
}

export default usersReducer
