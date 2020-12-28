import YouTube from "react-youtube";
import Chat from '../Chat/Chat';


function MovieParty(props) {

    //yt player options
    /*const opts = {
        height: "400",//400
        width: "100%",
        playerVars: {
        autoplay: 0,
        },
    }*/

    return(
        <div className = "movieparty">
            <YouTube className = "movieparty__youtube" videoId={props.trailerUrl} opts={props.opts}/>
            <Chat className = "movieparty__chat"/>
        </div>
    );


}

export default MovieParty;