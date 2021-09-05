const usersReducer = (state={dataUser:{}, token: null}, action) => {
    switch (action.type) {
        case "SIGN_UP":
            return {
                ...state,
                dataUser: action.payload
            }
        default:
            return state
    }
    
}

export default usersReducer