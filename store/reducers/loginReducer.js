import { userConstants } from "../actionTypes";

let user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = user ? { loggedIn: true, user, error: null } : {};

// const initialState = {
//   isLoggedIn: false,
//   user: [],
//   error: null,
//   loading: false,
// };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
        error: null,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        error: null,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: null,
        error: action.error,
      };
    case userConstants.LOGOUT:
      return {
        loggedOut: true,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
