import { combineReducers } from "redux";
import usersReducer from "./usersReducer.js"
import doctorReducer from "./doctorReducer.js";

const rootReducer = combineReducers ({
    users : usersReducer,
    doctors : doctorReducer
})

export default rootReducer