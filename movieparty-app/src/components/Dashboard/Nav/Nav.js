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
    const [friendName, setFriendName] = useState("");
    const myusername = user.name.split(" ")[0];
    
    useEffect(() => { 

        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
            onOpenStart: updateFriends, 
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false
        });

        M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
        M.Modal.init(document.querySelectorAll('.modal'), {});

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
        const ulMobileFriends = document.getElementById("friends-mobile")

        var elements = document.getElementsByClassName("friend");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }

        console.log(ulMobileFriends.innerHTML)
        
        friendList(myusername).then(data => { data.friends.forEach(element => {
            const newFriend = 
            `<li class = "friend white-text">
                ${element.username}
                ${element.online? "<p class = 'right online-friend'> Online</p>": "<p class = 'right center offline-friend'> Offline</p>"}
            </li>`
            ulFriends.innerHTML = ulFriends.innerHTML + newFriend
            ulMobileFriends.innerHTML = ulMobileFriends.innerHTML + newFriend  
        })})
    } 
    
    const onChangeFriendName = e => {
        setFriendName(e.target.value );
    };

    const deleteFriendName = () => {
        setFriendName("")
    }

    return (
        // <div class="navbar-fixed"> da errori la position: relative
        <div>
            <nav className = "navDashboard z-depth-0">
                <div class="nav-wrapper">
                    <a data-target="mobile-nav-dashboard" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <div className = "row">
                        <div className ="col s1">
                            <p className = "movieparty-logo">MovieParty</p>
                        </div>
                        <div className ="col s1 offset-s1 prova">
                            <button className = "search-icons transparent" onClick={() => searchMovie(searchbarText)}><i class="material-icons white-text">search</i></button>
                        </div>
                        <div className ="col s4 l3 m2 border-red">
                            <form>
                                <div class="input-field">
                                    <input id="search" type="search" onChange={onChange} value={searchbarText} required/>
                                </div>
                            </form>
                        </div>
                        <ul id="nav-mobile" class="right hide-on-med-and-down border-red">
                            <li><a class="dropdown-trigger" data-target="friends">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="friends" class="dropdown-content friends-list-dropdown">
                                <li><button data-target="modal1" class="btn modal-trigger red white-text add-friend">Add friend</button></li>
                            </ul>
                            <li><a class="waves-effect waves-teal btn-flat white-text" onClick={() => onLogoutClick(myusername)}>Logout</a></li>
                        </ul>
                    </div> 
                </div>
            </nav>

            <ul class="sidenav" id="mobile-nav-dashboard">
                <li><a class="dropdown-trigger" data-target="friends-mobile">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                <ul id="friends-mobile" class="dropdown-content mobile-friends-list-dropdown">
                    <li><a className = "red-text">I tuoi amici</a></li>
                </ul>
                <li><a class="waves-effect waves-teal btn-flat" onClick={() => onLogoutClick(myusername)}>Logout</a></li>
            </ul>

            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4 class = "red-text">Add a new friend</h4>
                    <div className="input-field">
                        <input
                            onChange={onChangeFriendName}
                            value = {friendName}
                            id="name"
                            type="text"
                            class = "white-text"
                        />
                        <label htmlFor="name">Friend Name</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="modal-close waves-effect waves-green btn-flat white-text" onClick = {() => setFriendName("")}>Discard</a>
                    <a class="modal-close waves-effect waves-green btn-flat white-text" onClick={() => friendRequest(myusername, friendName)}>Send request</a>
                </div>
            </div>
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
