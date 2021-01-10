import React, {useEffect, useState} from 'react'
import MoviePartyPlay from "../MoviePartyPlay/MoviePartyPlay";
import { connect } from "react-redux";

function InvitedByFriendMovieParty(props) {

    const [start, setStart] = useState(false);

    useEffect(() => {
        console.log("questa è la props")
        console.log(props.start)
        console.log("questa è la const")
        console.log(start)
        setStart(props.start)
        console.log("questa è la const")
        console.log(start)
    }, [props.start])

    return(
        <div id="invitedbyfriend" className = "invitedbyfriend">
            {!start && <p>In attesa che il leader avvii il party...</p>}
            {start && <MoviePartyPlay movieURL = {window.history.state.movieURL}/>}
        </div>
    );
}

const mapStateToProps = state => ({
    start: state.partystatus.movieparty_isStarted
});

export default connect(
    mapStateToProps,
    {}
)(InvitedByFriendMovieParty);

//export default InvitedByFriendMovieParty;