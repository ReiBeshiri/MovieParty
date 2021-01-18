import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {SET_MAIN_BANNER_MOVIE} from "../../../actions/types";
import store from "../../../store";
import { logoutUser } from "../../../actions/authActions";
import { friendRequest, genericmsg, friendList } from "../../../actions/friendsActions";
import axios from "../../../utils/Requests/axiosReq";
import requestsTmdb from "../../../utils/Requests/requestsTmdb";
import M from "materialize-css";
import "./MyNav.css"

function Nav(props) {
    const { user } = props.auth;
    const [searchbarText, setSearchbarText] = useState("");
    const [show, showNav] = useState(false);
    const myusername = user.name.split(" ")[0];
    
    useEffect(() => { 

        const elem = (document.querySelectorAll('.dropdown-trigger'))
        M.Dropdown.init(elem, {
            onOpenStart: updateFriends, 
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false
        });

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

    const updateFriends = () => {
        const ulFriends = document.getElementById("friends")

        var elements = document.getElementsByClassName("friend");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        
        friendList(myusername).then(data => { data.friends.forEach(element => {
            ulFriends.innerHTML = ulFriends.innerHTML +     
            `<li class = "friend white-text">
                ${element.username}
                ${element.online? "<p class = 'right online-friend'> Online</p>": "<p class = 'right center offline-friend'> Offline</p>"}
            </li>`         
        })})
    }   

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
                            <p className = "movieparty-logo">MovieParty</p>
                        </div>
                        <div className ="col s1 offset-s1 prova">
                            <button className = "search-icons transparent" onClick={() => searchMovie(searchbarText)}><i class="material-icons white-text">search</i></button>
                        </div>
                        <div className ="col s3">
                            <form>
                                <div class="input-field">
                                    <input id="search" type="search" onChange={onChange} value={searchbarText} required/>
                                    {/* <i class="material-icons white-text">close</i> */}
                                </div>
                            </form>
                        </div>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            {/* <li><a class="waves-effect waves-teal btn-flat white-text" onClick={()=> genericmsg(myusername, searchbarText)}>genericmsg</a></li> */}
                            <li><a class="dropdown-trigger" data-target="friends">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="friends" class="dropdown-content friends-list-dropdown">
                                <li><a className = "red-text">I tuoi amici</a></li>
                            </ul>
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
