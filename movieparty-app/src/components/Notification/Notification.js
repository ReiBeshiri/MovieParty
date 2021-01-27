import React, { useState, useEffect } from "react"; 
import {friendResponse } from "../../actions/usersActions";
import { notification_titles } from "./NotificationTitle";
import {sendMoviePartyResponse} from "../../socket/socket";

const Notification = props => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;//notification expire time
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      })
    }, 400)
  };

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification()
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  function friendReq() {
        return (
          <div className="notification__result">
            <p>{props.message.text} {props.message.info} </p>
            <button className="notification__button" onClick={()=>{setWidth(100);friendResponse(props.myusr, props.message.info, 1)}} >accetta</button>
            <button className="notification__button" onClick={()=>{setWidth(100);friendResponse(props.myusr, props.message.info, 2)}} >rifiuta</button>
            <div className={"bar"} style={{ width: `${width}%` }} />
          </div>
        )
  }

  function genericNotification() {
    return (
      <div className="notification__result">
        <p>{props.message.text} {props.message.info} </p>
        <div className={"bar"} style={{ width: `${width}%` }} />
      </div>
    )
  }

  function partyReqNotification(){
    return (
      <div className="notification__result">
        <p>{props.message.text}</p>
        <button className="notification__button" onClick={()=>{setWidth(100);sendMoviePartyResponse(props.message.info.leader, props.message.info.room, true)}} >accetta</button>
        <button className="notification__button" onClick={()=>{setWidth(100);sendMoviePartyResponse(props.message.info.leader, props.message.info.room, false)}} >rifiuta</button>
        <div className={"bar"} style={{ width: `${width}%` }} />
      </div>
    )
  }

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification__item ${
        props.type === "SUCCESS" ? "success" : "badge"
      } ${exit ? "exit" : ""}`}
    >
      {props.title === notification_titles.friend_req && friendReq()}
      {props.title === notification_titles.friend_req_accepted && genericNotification()}
      {props.title === notification_titles.genericmsg && genericNotification()}
      {props.title === notification_titles.party_req && partyReqNotification()}
    </div>
  );
};

export default Notification;

/** NOTIFICATION STRUCTURE
 * 
      title: title,
      type: type,
      message: msg, -> {text: "", info: var}
      myusr:usr
 * 
 */