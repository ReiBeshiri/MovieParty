import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "./Navbar.css";

function Navbar(){

    useEffect(() => {
        const  elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }, [])

    return (
        <div>
            <nav class = "transparent z-depth-0">
                <div class="nav-wrapper">
                    {/* <img class="logo responsive-img" src="img/logo.svg"/> */}
                    <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <Link
                                to="/register"
                                className="btn transparent redborder waves-effect waves-light registerButton"
                            >
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="btn transparent redborder waves-effect waves-light loginButton"
                            >
                                Log In
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="login">Login</a></li>
                <li><a href="register">Registration</a></li>
            </ul>
        </div>
    );
}

export default Navbar;