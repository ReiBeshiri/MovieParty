import React, {useState} from 'react'
import { sendMoviePartyInvite, sendStartParty } from "../../socket/socket";
import MoviePartyPlay from "../MoviePartyPlay/MoviePartyPlay";

function InviteFriendsMovieParty(props) {

    const [start, setStart] = useState(false);

    function viewFriends(friendsList){
        console.log("prova")
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
        sendMoviePartyInvite(props.myusername, friendUsername, props.movieURL)
    }

    function startParty(){
        setStart(true)
        sendStartParty(props.myusername)
    }

    return(
        <div id="invitefriends" className = "invitefriends">
            {!start && viewFriends(props.friends)}
            {!start && <button onClick={() => startParty()}>Avvia il party</button>}
            {start && <MoviePartyPlay movieURL = {props.movieURL}/>}
        </div>
    );
}

export default InviteFriendsMovieParty;