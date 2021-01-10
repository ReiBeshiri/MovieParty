import YouTube from "react-youtube";
import Chat from '../Chat/Chat';

function MoviePartyPlay(props) {

    //yt player options
    const opts = {
        height: "400",//400
        width: "100%",
        playerVars: {
        autoplay: 0,
        }
    }

    console.log(props.movieURL)
    return(
        <div className = "moviepartyplay">
            <YouTube className = "movieparty__youtube" videoId={props.movieURL} opts={opts}/>
            <Chat className = "movieparty__chat"/>
        </div>
    );

}

export default MoviePartyPlay;