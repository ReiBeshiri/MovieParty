import { GET_BADGES } from "./types";

const initialState = {
  username:"",
};

export default function badge(state = initialState, action) {
  switch (action.type) {
    case GET_BADGES:
      return action.payload;
    default:
      return state;
  }
}