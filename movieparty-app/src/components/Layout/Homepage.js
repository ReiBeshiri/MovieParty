import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css";


function Homepage() {
    return (
        <div className = "backgroundImage">
            <Navbar/>
            <div class ="fullwidth center-align paddingTop">
                <img class="mediumSize responsive-img" src="img/logo.svg" alt="movie party"/>
                <h1 class = "moviepartyTitle">A new way to watch movies together</h1>
            </div>
        </div>
    );
}

export default Homepage;