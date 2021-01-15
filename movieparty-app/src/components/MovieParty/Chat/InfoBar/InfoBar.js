import React from 'react';

import onlineIcon from './icons/onlineIcon.png';
import closeIcon from './icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src="https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-25-512.png" alt="online-icon"/>
      <h6>welcome to {room} room</h6>
    </div>
    {/*<div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>*/}
  </div>
);

export default InfoBar;