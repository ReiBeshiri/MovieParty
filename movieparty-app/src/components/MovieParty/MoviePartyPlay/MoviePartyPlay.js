import './MoviePartyPlay.css';
import { connect } from "react-redux";
import React, { useState, useEffect, useRef  } from "react";
import ReactPlayer from 'react-player'
import Chat from '../Chat/Chat';
import {synchronizeVideo} from "../../../socket/socket";

function MoviePartyPlay(props) {

  var player1 = useRef(null);
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
  const [seeking, setSeeking] = useState(0)
  const [prevTimestamp, setPrevTimestamp] = useState(Number.MAX_SAFE_INTEGER);
  const epsilon = 1.5

  useEffect(() => {
    if(props.partystatus.timestamp !== undefined){
      setPrevTimestamp(props.partystatus.timestamp)
      player1.seekTo(props.partystatus.timestamp, 'seconds')
    }
    if(props.partystatus.playing !== undefined){
      setPlaying(props.partystatus.playing)
    }
    props.partystatus.timestamp = undefined
    props.partystatus.playing = undefined
  }, [props.partystatus]);
  
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
    const url = url
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
    if(playing===false){
      setPlaying(true)
      synchronizeVideo(props.partystatus.room, undefined, true)
    }    
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
    if(playing===true){
      setPlaying(false)
      synchronizeVideo(props.partystatus.room, undefined, false)
    }
  }

  const handleSeekMouseDown = e => {
    //setSeeking(true)
  }

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = e => {
    //setSeeking(false)
    player1.current.seekTo(parseFloat(e.target.value), 'seconds')
  }

  const handleProgress = state => {
    //console.log('onProgress', state.playedSeconds)
    //console.log('props->', props) //synchronizeVideo(props.partystatus.room, timestamp, playing)
    //console.log(player1) //current time in player
    if(Math.abs(state.playedSeconds - prevTimestamp) > epsilon){
      setSeeking(seeking+1)
      if(seeking>0){
        console.log("CE' STATO UN SEEK!!!!!")
        synchronizeVideo(props.partystatus.room, state.playedSeconds, undefined)
      }          
    }
    setPrevTimestamp(state.playedSeconds)
    //player1.seekTo(60.00, 'seconds')
    // We only want to update time slider if we are not currently seeking
    //if prev - now > epsilon => propagate time
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
    player1 = player
  }

  return(
    <div className = "movieparty">
      <div className="movieparty__player__container">
        {<ReactPlayer
          ref={ref}
          className='movieparty__player'
          width={"100%"}
          height={"100%"}
          url={'https://www.youtube.com/watch?v='+props.movieURL}
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
          onPause={handlePause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onEnded={handleEnded}
          onError={e => console.log('onError', e)}
          onProgress={(handleProgress)}
          onDuration={handleDuration}
        />}
      </div>
      <div className = "movieparty__chat__container">
          {<Chat className = "movieparty__chat"/>}
      </div>
    </div>
  );

}

const mapStateToProps = state => ({
  partystatus: state.partystatus
});

export default connect(
  mapStateToProps, 
  {}
)(MoviePartyPlay);