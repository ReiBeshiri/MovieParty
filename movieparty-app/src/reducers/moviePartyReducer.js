import {
    MOVIEPARTY_IS_STARTED
} from "../actions/types";

const initialState = {
    movieparty_isStarted: false
};

//se state non esiste allora viene inizializzato con "initialState"
export default function(state = initialState, action) {
    switch (action.type) {
        case MOVIEPARTY_IS_STARTED:
            return {
                //...state,
                movieparty_isStarted: action.payload
            };
        default:
            return state;
    }
}