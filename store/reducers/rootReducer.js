import { combineReducers } from "redux";
import authReducer from "./authReducer";
import interviewReducer from "./interviewReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  authReducer,
  interviewReducer,
  login: loginReducer,
});
export default rootReducer;
