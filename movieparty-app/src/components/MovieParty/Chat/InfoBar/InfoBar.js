import React from 'react';
import { Link } from "react-router-dom";
import chatIcon from './icons/chat-icon.png';
import closeIcon from './icons/go_back_to_dashboard.png';
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={chatIcon} alt="chat"/>
      <h6 class="valign-wrapper">{room} chat</h6>
    </div>
    {<div className="rightInnerContainer">
        <Link to="/dashboard">
              <i className="material-icons left"><img className="back__to__dashboard" src={closeIcon} alt="close icon" /></i>
        </Link>    
    </div>}
  </div>
);

export default InfoBar;