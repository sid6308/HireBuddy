import { userConstants } from "../actionTypes";
import axios from "utils/axios";

const login = (email, password) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await axios.post("/login", { email, password });
      dispatch(success(response.data));
      const { first_name, role, oracleID } = response.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ first_name, role, oracleID })
      );
    } catch (err) {
      dispatch(failure(err.response.data.message));
    }
  };
};

const logout = () => {
  localStorage.removeItem("user");
  return { type: userConstants.LOGOUT };
};

const request = () => {
  return { type: userConstants.LOGIN_REQUEST };
};
const success = (user) => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    user,
  };
};
const failure = (error) => {
  return { type: userConstants.LOGIN_FAILURE, error };
};

export const userActions = {
  login,
  logout,
};
