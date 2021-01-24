import React from 'react';
import { Link } from "react-router-dom";
//import onlineIcon from './icons/onlineIcon.png';
import closeIcon from './icons/go_back_to_dashboard.png';

import './InfoBar.css';
/**
 * https://p1.hiclipart.com/preview/525/409/291/black-and-colorful-yosemite-style-icons-red-imessage-w-bg-png-clipart.jpg
 * https://i.pinimg.com/originals/cb/f9/b1/cbf9b13467d15911a17db8c00dc3382e.jpg
 */
const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src="https://i.pinimg.com/originals/cb/f9/b1/cbf9b13467d15911a17db8c00dc3382e.jpg" alt="chat"/>
      <h6>welcome to {room} room</h6>
    </div>
    {<div className="rightInnerContainer">
        <Link to="/dashboard">
              <i className="material-icons left"><img className="back__to__dashboard" src={closeIcon} alt="close icon" /></i>
        </Link>    
    </div>}
  </div>
);

export default InfoBar;