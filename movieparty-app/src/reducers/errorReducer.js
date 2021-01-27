import { GET_ERRORS } from "./types";

const initialState = {};

export default function err(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

/**import { GET_ERRORS } from "../actions/types";

const initialState = {err:""};

export default function err(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        err:action.payload
      };
    default:
      return state;
  }
} */