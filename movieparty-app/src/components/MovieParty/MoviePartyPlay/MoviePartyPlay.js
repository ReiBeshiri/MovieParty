import YouTube from "react-youtube";
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
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
    
  const [url, setUrl] = useState(null);
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [controls, setControls] = useState(true);
  const [light, setLight] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false)
 
    const state = {
        url: url,
        pip: pip,
        playing: playing,
        controls: controls,
        light:light,
        volume:volume,
        muted:muted,
        played:played,
        loaded:loaded,
        duration:duration,
        playbackRate:playbackRate,
        loop:loop
      }
    
      const load = url => {
        setUrl(url)
        setPlayed(0)
        setLoaded(0)
        setPip(false)
      }
    
      const handlePlayPause = () => {
        setPlaying(!playing)
      }
    
      const handleStop = () => {
        setUrl(null)
        setPlaying(false)
      }
    
      const handleToggleControls = () => {
        const url = state.url
        setControls(!controls)
        setUrl(null)
        load(url)
      }
    
      const handleToggleLight = () => {
        setLight(!light)
      }
    
      const handleToggleLoop = () => {
        setLoop(!loop)
      }
    
      const handleVolumeChange = e => {
        setVolume(e.target.value)
      }
    
      const handleToggleMuted = () => {
        setMuted(!muted)
      }
    
      const handleSetPlaybackRate = e => {
        setPlaybackRate(e.target.value)
      }
    
      const handleTogglePIP = () => {
        setPip(!pip)
      }
    
      const handlePlay = () => {
        console.log('onPlay')
        setPlaying(true)
      }
    
      const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPip(true)
      }
    
      const handleDisablePIP = () => {
        console.log('onDisablePIP')
        setPip(false)
      }
    
      const handlePause = () => {
        console.log('onPause')
        setPlaying(false)
      }
    
      const handleSeekMouseDown = e => {
        setSeeking(true)
      }
    
      const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value))
      }
    
      const handleSeekMouseUp = e => {
        setSeeking(false)
        //player.seekTo(parseFloat(e.target.value))
      }
    
      const handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
      }
    
      const handleEnded = () => {
        console.log('onEnded')
        setPlaying(loop)
      }
    
      const handleDuration = (duration) => {
        console.log('onDuration', duration)
        setDuration(duration)
      }
    
      const renderLoadButton = (url, label) => {
        return (
          <button onClick={() => load(url)}>
            {label}
          </button>
        )
      }
    
      const ref = player => {
        player = player
      }
    
    return(
        <div className = "moviepartyplay">
            {/*<YouTube className = "movieparty__youtube" videoId={props.movieURL} opts={opts} 
            onReady={()=>console.log("PLS onReady")}
            onPlay={()=>console.log("PLS onReady")}                     // defaults -> noop
            onPause={()=>console.log("PLS onReady")}                    // defaults -> noop
            onEnd={()=>console.log("PLS onReady")}                      // defaults -> noop
            onError={()=>console.log("PLS onReady")}                    // defaults -> noop
            onStateChange={()=>console.log("PLS onReady")}              // defaults -> noop
            onPlaybackRateChange={()=>console.log("PLS onReady")}       // defaults -> noop 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
            onPlaybackQualityChange={()=>console.log("PLS onReady")}     
            />*/}
        {<ReactPlayer
              className='react-player1'
              url={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={handlePlay}
              onEnablePIP={handleEnablePIP}
              onDisablePIP={handleDisablePIP}
              onPause={() => handlePause()}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={(handleProgress)}
              onDuration={handleDuration}
            />}
            <Chat className = "movieparty__chat"/>
        </div>
    );

}

export default MoviePartyPlay;