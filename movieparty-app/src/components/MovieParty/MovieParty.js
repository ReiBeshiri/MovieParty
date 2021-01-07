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

    function _onStateChange(ev){
        console.log(ev.target);
    }

    function _onPlay(ev){
        console.log(ev.target);
    }


    return(
        <div className = "movieparty">
            <YouTube className = "movieparty__youtube" videoId={props.trailerUrl} opts={props.opts} onStateChange={_onStateChange} onPlay={_onPlay}/>
            <Chat className = "movieparty__chat"/>
        </div>
    );


}

export default MovieParty;