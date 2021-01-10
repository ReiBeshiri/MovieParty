import {
    MOVIEPARTY_IS_STARTED,
    PARTY_INVITATION,
    IN_LOBBY
} from "../actions/types";

const initialState = {
    movieparty_isStarted: false,
    leader: "",
    room: "",
    movieURL:"",
    inLobby: false
};

//se state non esiste allora viene inizializzato con "initialState"
export default function(state = initialState, action) {
    switch (action.type) {
        case MOVIEPARTY_IS_STARTED:
            return {
                ...state,
                movieparty_isStarted: action.payload,                
            };
        case PARTY_INVITATION:
            return{
                ...state,
                leader: action.payload.sender,
                room: action.payload.room,
                movieURL: action.payload.movieURL,
                inLobby: false
            }
        case IN_LOBBY:
            return{
                ...state,
                inLobby: action.payload
            }
        default:
            return state;
    }
}