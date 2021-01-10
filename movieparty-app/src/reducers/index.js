import { combineReducers } from "redux";
import { SET_MAIN_BANNER_MOVIE } from "../actions/types";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import friendReducer from "./friendReducer";
import genericMsgReducer from "./genericMsgReducer";
import searchMovieReducer from "./searchMovieReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  friend: friendReducer,
  mainBannerMovieId: searchMovieReducer,
  genericmsg: genericMsgReducer
});