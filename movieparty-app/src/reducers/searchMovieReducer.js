import {
    SET_MAIN_BANNER_MOVIE
} from "../actions/types";

const initialState = {
    mainBannerMovieId: "",
};

export default function searchmovie(state = initialState, action) {
    switch (action.type) {
        case SET_MAIN_BANNER_MOVIE:
            return {
                //...state,
                mainBannerMovieId: action.payload
            };
        default:
            return state;
    }
}