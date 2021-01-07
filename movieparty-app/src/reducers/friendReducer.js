import {
    SET_FRIEND_USERNAME
} from "../actions/types";

//const isEmpty = require("is-empty");

const initialState = {
    friend_username: ""
};

//se state non esiste allora viene inizializzato con "initialState"
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_FRIEND_USERNAME:
            return {
                //...state,
                friend_username: action.payload
            };
        default:
            return state;
    }
}