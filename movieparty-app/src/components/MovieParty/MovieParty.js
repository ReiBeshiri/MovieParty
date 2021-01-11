import "./Lobby.css"
import React, {useState, useEffect} from 'react'
import { sendMoviePartyInvite, sendStartParty } from "../../socket/socket";
import MoviePartyPlay from "../MoviePartyPlay/MoviePartyPlay";
import { connect } from "react-redux";
import axios from "../../utils/Requests/axiosReq";
import { joinRoom } from '../../socket/socket';
import store from "../../store";
import requestsTmdbMovieTrailer from "../../utils/Requests/requestsTmdb";
import {
    PARTY_INVITATION
} from "../../actions/types";

function MovieParty(props) {

    const [start, setStart] = useState(false);
    const myusername = props.auth.user.name.split(" ")[0];

    console.log(myusername)

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
        joinRoom(myusername);
        if(props.partystatus.leader === ""){
            fetchmovie(props.location.movieId);
            store.dispatch({
                type: PARTY_INVITATION,
                payload: {sender: myusername, room: myusername, movieURL: movieURL}
            })
        }
        console.log(props)

    }, []);

    useEffect(() => {
        if(props.partystatus.movieparty_isStarted){
            console.log(props)
            setStart(true)
            setMovieURL(props.partystatus.movieURL)
        }
    }, [props.partystatus.movieparty_isStarted])

    function viewFriends(friendsList){
        return friendsList.map(function(friend){
            return  <div className="friend" key={friend.username}>
                        <label>{friend.username} ({friend.online?"online":"offline"})</label>
                        <button id={"btn" + friend.username} onClick={(e) => sendInvite(e.target, friend.username)}>Invita</button> 
                    </div>
        }); 
    }

    function sendInvite(btn, friendUsername){
        btn.innerHTML= "In attesa..."
        btn.disabled = "True"
        console.log("sonde movie prty invite")
        console.log(props)
        sendMoviePartyInvite(myusername, friendUsername, movieURL)
    }

    function startParty(){
        setStart(true)
        sendStartParty(myusername)
    }

    return(
        <div className = "lobby__elements">
            {!start && props.partystatus.leader === myusername && viewFriends(props.location.friendlist)}
            {!start && props.partystatus.leader === myusername && <button onClick={() => startParty()}>Avvia il party</button>}
            {!start && props.partystatus.leader !== myusername && <p>aspetto che il leader starta il party, sono {myusername}</p>}
            {start && <MoviePartyPlay movieURL = {movieURL}/>}
        </div>
    );
}
  
const mapStateToProps = state => ({
    auth: state.auth,
    genericmsg: state.genericmsg,
    partystatus: state.partystatus
});

export default connect(
    mapStateToProps, 
    {}
)(MovieParty);