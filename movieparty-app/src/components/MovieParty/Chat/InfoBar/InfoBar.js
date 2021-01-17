import React from 'react';
import { Link } from "react-router-dom";
import onlineIcon from './icons/onlineIcon.png';
import closeIcon from './icons/go_back_to_dashboard.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src="https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-25-512.png" alt="online-icon"/>
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