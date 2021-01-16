import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {SET_MAIN_BANNER_MOVIE} from "../../../actions/types";
import store from "../../../store";
import { logoutUser } from "../../../actions/authActions";
import { friendRequest, genericmsg } from "../../../actions/friendsActions";
import axios from "../../../utils/Requests/axiosReq";
import requestsTmdb from "../../../utils/Requests/requestsTmdb";
import "./MyNav.css"

function Nav(props) {
    const { user } = props.auth;
    const [searchbarText, setSearchbarText] = useState("");
    const [show, showNav] = useState(false);
    const myusername = user.name.split(" ")[0];
    
    /** listener to the scroll y event, when reaches 100px activate show func*/
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                showNav(true);
            } else {
                showNav(false);
            }            
        });
        /**remove listener so it dows not stack, optimizing the fact that we don't need 100 listeners, but just 1*/
        /*return () => {
            window.removeEventListener("scroll");
        }; callback  error*/ 
    }, []);

    const onChange = e => {
        setSearchbarText(e.target.value);
    };

    const onLogoutClick = (myUsername) => {
        props.logoutUser(myUsername);
    };

    const searchMovie = (movie) => {
        async function fetchMovie(m){
            let querymovie = m.replace(/ /g, '+');//-
            const res = await axios.get( axios.defaults.baseURL + "/search/movie" + requestsTmdb.apikey + "&query=" + querymovie);
            store.dispatch({
                type: SET_MAIN_BANNER_MOVIE,
                payload: res.data.results[0].id
            })
        }
        if(movie.length>0){fetchMovie(movie);} //if movie length > 0 search, dont otherwise        
    };

    return (
        /*<div className={`nav ${show && "nav__blackscroll"}`}>
            <img
                className="logoSize responsive-img"
                src="img/logo.svg"
                alt="MoiveParty logo"
            />            
            <div className="nav__elements">
                <input
                    onChange={onChange}
                    value={searchbarText}
                    className="nav__elements__searchbar"
                    type="text"
                />
                <button className="nav__elements__button" onClick={() => searchMovie(searchbarText)}>Search Movie</button>
                <button className="nav__elements__button" onClick={()=> {genericmsg(myusername, searchbarText)}}>genericmsg</button>
                <button className="nav__elements__button" onClick={()=> {friendRequest(myusername, searchbarText)}}>Add Friend</button>
                <button className="nav__elements__button" id="nav__elements__button__logout" onClick={() => onLogoutClick(myusername)}>Logout</button>
                <img 
                    className="nav__avatar"
                    src="https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-25-512.png"
                    alt="Your Avatar"
                />
            </div>
        </div>*/

        <div class="navbar-fixed">
            <nav className = "navDashboard">
                <div class="nav-wrapper">
                     <div className = "row">
                        <div className ="col s1">
                            <img
                                className="responsive-img"
                                src="img/logo.svg"
                                alt="MoiveParty logo"
                            />
                            {/* <p className = "white-text">LOGO</p> */}
                        </div>
                        <div className ="col s4 offset-s1">
                            <form>
                                <div class="input-field">
                                    <input id="search" type="search" onChange={onChange} value={searchbarText} required/>
                                    <label class="label-icon" for="search" onClick={console.log("ciao")}><i class="material-icons white-text">search</i></label>
                                    <i class="material-icons white-text">close</i>
                                </div>
                            </form>
                        </div>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a class="waves-effect waves-teal btn-flat white-text" onClick={()=> genericmsg(myusername, searchbarText)}>genericmsg</a></li>
                            <li><a class="waves-effect waves-teal btn-flat white-text" onClick={()=> friendRequest(myusername, searchbarText)}>Friend</a></li>
                            <li><a class="waves-effect waves-teal btn-flat white-text" onClick={() => onLogoutClick(myusername)}>Logout</a></li>
                        </ul>
                    </div> 
                </div>
            </nav>
        </div>

    )
}

Nav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend,
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Nav);

//export default Nav;
