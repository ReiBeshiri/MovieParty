
function InviteFriendsMovieParty(props) {
    console.log(props)

    function prova(){
        console.log("asfa")
    }

    function viewFriends(friendsList){
        return friendsList.map(function(friend){
            return  <div className="friend" key={friend.username}>
                        <label>{friend.username} ({friend.online?"online":"offline"})</label>
                        <button onClick={prova}>Invita</button> 
                    </div>
        }); 
    }

    return(
        <div id="invitefriends" className = "invitefriends">
            {viewFriends(props.friends)}
        </div>
    );
}

export default InviteFriendsMovieParty;