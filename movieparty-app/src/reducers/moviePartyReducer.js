import {
    MOVIEPARTY_IS_STARTED,
    PARTY_INVITATION,
    IN_LOBBY,
    NEW_CHAT_MESSAGE,
    SYNCHRONIZE_VIDEO,
    RESET
} from "./types";

const initialState = {
    movieparty_isStarted: false,
    leader: "",
    room: "",
    movieURL:"",
    inLobby: false,
    lastMessage: undefined,
    timestamp: undefined,
    playing: true
};

//se state non esiste allora viene inizializzato con "initialState"
export default function movieparty(state = initialState, action) {
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
        case NEW_CHAT_MESSAGE:
            return{
                ...state,
                lastMessage: action.payload
            }
        case SYNCHRONIZE_VIDEO:
            return{
                ...state,
                timestamp: action.payload.timestamp,
                playing: action.payload.playing
            }
        case RESET: return initialState
        default:
            return state;
    }
}