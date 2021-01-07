import React, { useState, useEffect } from "react"; 
import {friendResponse } from "../../actions/friendsActions";

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

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification__item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      <p>{props.message} {props.friendusr} </p>
      <button onClick={()=>{setWidth(100);friendResponse(props.usr, props.friendusr, 1)}} >accetta</button>
      <button onClick={()=>{setWidth(100);friendResponse(props.usr, props.friendusr, 2)}} >rifiuta</button>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
