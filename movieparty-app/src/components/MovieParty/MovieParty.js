import "./Lobby.css"
import React, {useState, useEffect} from 'react'
import { sendMoviePartyInvite, sendStartParty } from "../../socket/socket";
import MoviePartyPlay from "./MoviePartyPlay/MoviePartyPlay";
import { connect } from "react-redux";
import axios from "../../utils/Requests/axiosReq";
import { joinRoom } from '../../socket/socket';
import store from "../../store";
import requestsTmdbMovieTrailer from "../../utils/Requests/requestsTmdb";
import Chat from './Chat/Chat';

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
            if(movieId!==undefined){
                const ytUrl = await axios.get(axios.defaults.baseURL + "/movie/" + movieId + requestsTmdbMovieTrailer.trailerVideoKey)
                if(ytUrl.data.results[0] !== undefined){
                    setMovieURL(String(ytUrl.data.results[0].key))
                    console.log(String(ytUrl.data.results[0].key))
                }                                
                return ytUrl
            }            
        }
        fetchMovieTrailer(movieid)
    }

    useEffect(() => {
        joinRoom(myusername);
        if(props.partystatus.leader === "" || props.partystatus.leader === myusername){
            fetchmovie(props.location.movieId);
            store.dispatch({
                type: PARTY_INVITATION,
                payload: {sender: myusername, room: myusername, movieURL: movieURL}
            })
        }
        console.log(props)
        //reset props
        props.partystatus.inLobby=false
    }, []);

    useEffect(() => {
        if(props.partystatus.movieparty_isStarted){
            console.log(props)
            setStart(props.partystatus.movieparty_isStarted)
            setMovieURL(props.partystatus.movieURL)            
            //exit lobby
            props.partystatus.inLobby=false
        }
    }, [props.partystatus.movieparty_isStarted])

    function viewFriends(friendsList){

        const prova = friendsList.map(function(friend){
            return  <div className="friend" key={friend.username}>
                        <label className="friend__list">{friend.username} <label className={friend.online?"friend__online":"friend__offline"}>{(friend.online?"online":"offline")}</label></label>
                        <button id={"btn" + friend.username} className={friend.online?"lobby__pre__party__invite__friend":"lobby__pre__party__invite__friend__disabled"} onClick={(e) => sendInvite(e.target, friend.username)} disabled={!friend.online}>Invita</button> 
                    </div>
        });

        console.log(prova)

        return prova
        /*return friendsList.map(function(friend){
            return  <div className="friend" key={friend.username}>
                        <label className="friend__list">{friend.username} <label className={friend.online?"friend__online":"friend__offline"}>{(friend.online?"online":"offline")}</label></label>
                        <button id={"btn" + friend.username} className={friend.online?"lobby__pre__party__invite__friend":"lobby__pre__party__invite__friend__disabled"} onClick={(e) => sendInvite(e.target, friend.username)} disabled={!friend.online}>Invita</button> 
                    </div>
        }); */
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
        //exit lobby
        props.partystatus.inLobby=false
    }

    return(
        <div className = {!start?"lobby__elements":"lobby__elements_"}>
            {!start && <div className="lobby__pre__party">
                {!start && <p className="lobby__pre__party__title"><h4>lobby pre party di {props.partystatus.leader}!</h4></p>}
                {!start && props.partystatus.leader === myusername && viewFriends(props.location.friendlist)}
                {!start && props.partystatus.leader === myusername && <button className="lobby__pre__party__start__party" onClick={() => startParty()}>Avvia il party</button>}
                {!start && props.partystatus.leader !== myusername && <p>aspetto che il leader starta il party, sono {myusername}</p>}                
            </div>}
            {!start && <div className = "lobby__pre__party__chat__container"><Chat className = "lobby__pre__party__chat"/></div>}
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