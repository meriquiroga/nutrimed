import axios from "axios";

const doctorActions = {
  editProfileDoctor: (idDoctor, profileEdited) => {
    return async () => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/doctor/perfil/${idDoctor}`,
          { profileEdited }
        );
        if (response.data.success) {
          return { success: true };
        }
      } catch (err) {
        return { success: false, res: err };
      }
    };
  },
  getDoctors: () => {
    return async (dispatch, getState) => {
      try {
        let res = await axios.get("http://localhost:4000/api/doctors");
        let info = res.data.res;

        dispatch({ type: "GET_ALL_DOCTORS", payload: info });
      } catch (err) {
        return { success: false, res: err };
      }
    };
  },
};

export default doctorActions;
