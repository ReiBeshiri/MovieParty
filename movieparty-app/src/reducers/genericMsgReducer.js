import {
    GENERICMSG
} from "../actions/types";

const initialState = {
    message: ""
};

//se state non esiste allora viene inizializzato con "initialState"
export default function(state = initialState, action) {
    switch (action.type) {
        case GENERICMSG:
            return {
                //...state,
                message: action.payload
            };
        default:
            return state;
    }
}