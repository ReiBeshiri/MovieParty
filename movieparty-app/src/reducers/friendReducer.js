import {
    SET_FRIEND_USERNAME,
    SET_ACCEPTED_FRIENDSHIP
} from "./types";

const initialState = {
    friend_username: "",
    friend_accepted: ""
};

//se state non esiste allora viene inizializzato con "initialState"
export default function friend(state = initialState, action) {
    switch (action.type) {
        case SET_FRIEND_USERNAME:
            return {
                //...state,
                friend_username: action.payload
            };
        case SET_ACCEPTED_FRIENDSHIP:
            return{
                friend_accepted: action.payload
            };
        default:
            return state;
    }
}