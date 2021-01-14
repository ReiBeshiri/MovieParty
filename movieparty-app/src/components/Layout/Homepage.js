import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Homepage.css";


function Homepage() {
        return (
            <div className = "backgroundImage">
                <Navbar/>
                <div class = "prova">
                    <div class ="fullwidth center-align">
                        <img class="mediumSize responsive-img" src="img/logo.svg"/>
                        <h1 class = "moviepartyTitle">A new way to watch movies together</h1>
                        {/* <br/>
                        <Link
                            to="/register"
                            className="btn btn-large waves-effect waves-light hoverable red lighten-1 accent-3 registerButton"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-large waves-effect waves-light hoverable red lighten-1 accent-3 loginButton"
                        >
                            Log In
                        </Link> */}
                    </div>
                </div>
            </div>

            
        );
}

export default Homepage;