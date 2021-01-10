import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import friendReducer from "./friendReducer";
import moviePartyReducer from "./moviePartyReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  friend: friendReducer,
  partystatus: moviePartyReducer
});