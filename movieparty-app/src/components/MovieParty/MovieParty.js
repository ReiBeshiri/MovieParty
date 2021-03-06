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
import { friendList } from "../../actions/usersActions";
import {PARTY_INVITATION} from "../../reducers/types";

function MovieParty(props) {

    const [start, setStart] = useState(false);
    const myusername = props.auth.user.name.split(" ")[0];    
    const [listFriends, setListFriends] = useState(undefined)
    const [movieURL, setMovieURL] = useState("");

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
        if(props.partystatus.leader === "" || props.partystatus.leader === myusername){
            joinRoom(myusername);
            fetchmovie(props.location.movieId);
            store.dispatch({
                type: PARTY_INVITATION,
                payload: {sender: myusername, room: myusername, movieURL: movieURL}
            })
            //update friend list if leader
            friendList(myusername).then(data => {
                setListFriends(data.friends)
            })
        }
        console.log(props)
        //reset props
        props.partystatus.inLobby=false
    }, []);

    useEffect(() => {
        if(props.partystatus.movieparty_isStarted){
            console.log(props)
            setStart(true)
            setMovieURL(props.partystatus.movieURL)
            //exit lobby
            props.partystatus.inLobby=false
            props.partystatus.leader=""
        }
    }, [props.partystatus.movieparty_isStarted])

    function viewFriends(friendsList){
        return friendsList.map(function(friend){
            return  <div className="friend" key={friend.username}>
                        <label className="friend__list">{friend.username} <label className={friend.online?"friend__online":"friend__offline"}>{(friend.online?"online":"offline")}</label></label>
                        <button id={"btn" + friend.username} className={friend.online?"lobby__pre__party__invite__friend":"lobby__pre__party__invite__friend__disabled"} onClick={(e) => sendInvite(e.target, friend.username)} disabled={!friend.online}>Invita</button> 
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
        console.log("start party")
        setStart(true)
        sendStartParty(myusername)
        //exit lobby
        props.partystatus.inLobby=false
        props.partystatus.leader=""
    }

    console.log(start)

    return(
        <div className = {!start?"lobby__elements":"lobby__elements_"}>
            {!start && <div className="lobby__pre__party">
                {!start && <p className="lobby__pre__party__title"><h4>{props.partystatus.leader} pre party lobby!</h4></p>}
                {!start && (props.partystatus.leader === myusername || props.partystatus.leader === undefined) && listFriends !== undefined && viewFriends(listFriends)}
                {!start && (props.partystatus.leader === myusername || props.partystatus.leader === undefined) && <button className="lobby__pre__party__start__party" onClick={() => startParty()}>Avvia il party</button>}
                {!start && props.partystatus.leader !== myusername && props.partystatus.leader !== undefined && <p>Waiting for the leader to start the party</p>}                
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