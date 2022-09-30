import { actionTypes } from "../actionTypes";

let initialState = {
  conductInterviewForm: {},
  loading: false,
  interviewCreated: false,
};
const interviewReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SET_FORM_VALUES:
      return {
        ...state,
        conductInterviewForm: {
          ...state.conductInterviewForm,
          ...action.payload,
        },
        interviewCreated: false,
      };
    
    case actionTypes.CREATE_INTERVIEW_START:

      return { ...state, loading: true };
    case actionTypes.CREATE_INTERVIEW_SUCCESS:
      return { ...state, interviewCreated: true, loading: false };
    default:
      return state;
  }
};

export default interviewReducer;
