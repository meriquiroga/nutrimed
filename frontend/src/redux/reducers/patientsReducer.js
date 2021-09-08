const patientsReducer = (state = { patients: [], patient: {}, calendar:[]}, action) => {
   switch (action.type) {
      case "GET_ALL_PATIENTS":
         return {
            ...state,
            patients: action.payload,
         }
      case "GET_ONE_PATIENT":
         return {
            ...state,
            patient: state.patients.find((obj) => obj._id === action.payload),
         }
      case 'GET_CALENDAR':
         return{
            ...state,
            calendar: action.payload
         }
      default:
         return state
   }
}
export default patientsReducer
