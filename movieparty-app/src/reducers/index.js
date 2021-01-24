import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import friendReducer from "./friendReducer";
import moviePartyReducer from "./moviePartyReducer";
import genericMsgReducer from "./genericMsgReducer";
import searchMovieReducer from "./searchMovieReducer";
import badgeReducer from "./badgeReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  friend: friendReducer,
  partystatus: moviePartyReducer,
  mainBannerMovieId: searchMovieReducer,
  genericmsg: genericMsgReducer,
  badges: badgeReducer
});