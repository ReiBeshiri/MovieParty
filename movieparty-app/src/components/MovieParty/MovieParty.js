import axios from "../../utils/Requests/axiosReq"
import React, {useState, useEffect} from 'react'
import requestsTmdbMovieTrailer from "../../utils/Requests/requestsTmdb";
import InviteFriendsMovieParty from '../InviteFriendsMovieParty/InviteFriendsMovieParty';
import { joinRoom } from '../../socket/socket';


function MovieParty(props) {

    const [movieURL, setMovieURL] = useState("");

    //yt player options
    const opts = {
        height: "400",//400
        width: "100%",
        playerVars: {
        autoplay: 0,
        }
    }

    const fetchmovie = (movieid) => {
        async function fetchMovieTrailer(movieId){
            const ytUrl = await axios.get(axios.defaults.baseURL + "/movie/" + movieId + requestsTmdbMovieTrailer.trailerVideoKey)
            setMovieURL(String(ytUrl.data.results[0].key))
            console.log(String(ytUrl.data.results[0].key))
            return ytUrl
        }
        fetchMovieTrailer(movieid)
    }

    useEffect(() => {
        fetchmovie(props.location.movieId);
        joinRoom(props.location.myUsername);
    }, []); // <-- empty array means 'run once'

    return(
        <div className = "movieparty">
            {movieURL && <InviteFriendsMovieParty className = "invitefriends" friends={props.location.friendlist} myusername={props.location.myUsername} movieURL={movieURL}/>}            
        </div>
    );


}

export default MovieParty;