import React, { useState, useEffect } from "react"; 
import {friendResponse } from "../../actions/friendsActions";
import { notification_titles } from "./NotificationTitle";

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
            <button onClick={()=>{setWidth(100);friendResponse(props.myusr, props.message.info, 1)}} >accetta</button>
            <button onClick={()=>{setWidth(100);friendResponse(props.myusr, props.message.info, 2)}} >rifiuta</button>
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

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification__item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      {props.title === notification_titles.friend_req && friendReq()}
      {props.title === notification_titles.friend_req_accepted && genericNotification()}
      {props.title === notification_titles.genericmsg && genericNotification()}
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