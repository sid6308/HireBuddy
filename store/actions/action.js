import { actionTypes } from "../actionTypes";
import axios from "utils/axios";

export const setFormValues = (formData) => {
  return {
    type: actionTypes.SET_FORM_VALUES,
    payload: formData,
  };
};

export const postInterviewCreation = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_INTERVIEW_START });
  axios.post(`/createInterview`, data).then((res) => {
    dispatch({
      type: actionTypes.CREATE_INTERVIEW_SUCCESS,
      payload: res.data.success,
    });
  });
};
