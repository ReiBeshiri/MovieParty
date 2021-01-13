import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Homepage.css";


function Homepage(props) {
        return (
            <div className = "backgroundImage">
                <div class = "valign-wrapper fullscreen">
                    <div class ="fullwidth center-align">
                        <h1 class = "moviepartyTitle">MovieParty</h1>
                        <br/>
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
                        </Link>
                    </div>
                </div>
            </div>
            /*<div class = "valign-wrapper fullscreen">
                    <div class="row">
                        <div class="col s1">1</div>
                        <div class="col s1">2</div>
                        <div class="col s1">3</div>
                        <div class="col s1">4</div>
                        <div class="col s1">5</div>
                        <div class="col s1">6</div>
                        <div class="col s1">7</div>
                        <div class="col s1">8</div>
                        <div class="col s1">9</div>
                        <div class="col s1">10</div>
                        <div class="col s1">11</div>
                        <div class="col s1">12</div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div class = "col s6">
                            <Link
                                to="/register"
                                style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Register
                            </Link>
                        </div>
                        <div class = "col s6">
                            <Link
                                to="/login"
                                style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                                }}
                                className="btn btn-large btn-flat waves-effect white black-text"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Build</b> a login/auth app with the{" "}
                            <span style={{ fontFamily: "monospace" }}>MERN</span> 
                            stack from scratch
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                        Create a (minimal) full-stack app with user authentication via
                        passport and JWTs
                        </p>
                        <br/>
                        <div className="col s6">
                        <Link
                            to="/register"
                            style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Register
                        </Link>
                        </div>
                        <div className="col s6">
                        <Link
                            to="/login"
                            style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                            }}
                            className="btn btn-large btn-flat waves-effect white black-text"
                        >
                            Log In
                        </Link>
                        </div>
                    </div>
                    </div>
                        </div>*/
        );
}

export default Homepage;