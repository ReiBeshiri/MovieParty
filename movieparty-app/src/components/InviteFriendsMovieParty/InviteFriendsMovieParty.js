import "./Lobby.css"
import React, {useState} from 'react'
import { sendMoviePartyInvite, sendStartParty } from "../../socket/socket";
import MoviePartyPlay from "../MoviePartyPlay/MoviePartyPlay";
import { connect } from "react-redux";

function InviteFriendsMovieParty(props) {

    const [start, setStart] = useState(false);
    const myusername = props.auth.user.name.split(" ")[0];

    console.log(props)

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
        sendMoviePartyInvite(myusername, friendUsername, props.movieURL)
    }

    function startParty(){
        setStart(true)
        sendStartParty(myusername)
    }

    return(
        <div className = "lobby__elements">
            {!start && props.partystatus.leader === ""/*myusername*/ && viewFriends(props.friends)}
            {!start && props.partystatus.leader === ""/*myusername*/ && <button onClick={() => startParty()}>Avvia il party</button>}
            {!start && props.partystatus.leader !== "" && <p>aspetto che il leader starta il party, sono {myusername}</p>}
            {start && <MoviePartyPlay movieURL = {props.movieURL}/>}
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
)(InviteFriendsMovieParty);