import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {SET_MAIN_BANNER_MOVIE} from "../../../actions/types";
import store from "../../../store";
import { logoutUser } from "../../../actions/authActions";
import { sendFriendRequest, friendRequest, friendList, friendResponse, userBadgeList } from "../../../actions/friendsActions";
import axios from "../../../utils/Requests/axiosReq";
import requestsTmdb from "../../../utils/Requests/requestsTmdb";
import M from "materialize-css";
import "./MyNav.css"

function Nav(props) {
    const { user } = props.auth
    const [searchbarText, setSearchbarText] = useState("")
    const [show, showNav] = useState(false);
    const [friendName, setFriendName] = useState("")
    const myusername = user.name.split(" ")[0]
    const [listFriends, setListFriends] = useState(undefined)
    const [listNotifications, setListNotifications] = useState(undefined)
    const [newNotification, setNewNotification] = useState(false)
    const [showBadges, setShowBadges] = useState(false)
    
    useEffect(() => { 

        M.Dropdown.init(document.querySelectorAll('.dropdown-friends'), {
            onOpenStart: initListFriends, 
            onCloseEnd: resetListFriends,
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false
        });

        M.Dropdown.init(document.querySelectorAll('.dropdown-notifications'), {
            onOpenStart: initListNotification,
            onCloseEnd: resetListNotifications, 
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false
        });

        M.Dropdown.init(document.querySelectorAll('.dropdown-badges'), {
            onOpenStart: changeShowBadges,
            onCloseEnd: changeShowBadges, 
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false,
            closeOnClick: false
        });

        M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
        M.Modal.init(document.querySelectorAll('.modal'), {});
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {})

        updateSpanNotifications()
        
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

    const initListFriends = () => {
        friendList(myusername).then(data => {
            setListFriends(data.friends)
        })
    }

    const resetListFriends = () => {
        setListFriends(undefined)
    }

    const initListNotification = () => {
        friendRequest(myusername).then(data => {
            setListNotifications(data.requests)
        })
    }

    const resetListNotifications = () => {
        setNewNotification(false)
        setListNotifications(undefined)
    }

    const changeShowBadges = () => {
        setShowBadges(!showBadges)
    }

    const updateFriends = () => {
        return listFriends.map(function(friend){
            return <li class = "friend white-text" key={friend.username}>
                {friend.username}
                {friend.online? <p class = 'right online-friend'> Online</p> : <p class = 'right center offline-friend'> Offline</p>}
            </li>
        })
    } 

    const updateSpanNotifications = () => {
        friendRequest(myusername).then(data => {
            if(data.requests.length > 0){
                //document.getElementById("badge-notification").classList.remove("scale-out")
                setNewNotification(true)
            }
        })
    }

    const updateNotifications = () => {
        //document.getElementById("badge-notification").classList.add("scale-out")
        return listNotifications.map(function(request){
            return <li class = "notification white-text" key={request.username}>
                <p class = "left">{request.friendUsername} vuole essere tuo amico</p>
                <button class = 'right' onClick = {() => friendResponse(myusername, request.friendUsername, 1)}>Aggiungi</button>
                <button class = 'right' onClick = {() => friendResponse(myusername, request.friendUsername, 2)} >Rifiuta</button>
            </li>
        })
    }

    const updateBadgeList = () => {
        console.log(showBadges)
        return  <li>
                    <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                    
    }
    
    const onChangeFriendName = e => {
        setFriendName(e.target.value );
    };

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
                            <li><a class="dropdown-trigger dropdown-badges" data-target="badges">BADGES<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="badges" class="dropdown-content friends-list-dropdown">
                                <li class = "prova"><a class = "prova">Badges</a></li>
                                <li><ul class="collapsible">
                                    {showBadges && updateBadgeList()}
                                </ul></li>
                            </ul>
                            <li><a class="dropdown-trigger dropdown-notifications" data-target="notifications">{newNotification && <span id = "badge-notification" class="new badge badge-notification"></span>}NOTIFICATION<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="notifications" class="dropdown-content friends-list-dropdown">
                                <li><a>Notification</a></li>
                                {listNotifications !== undefined && updateNotifications()}
                            </ul>
                            <li><a class="dropdown-trigger dropdown-friends" data-target="friends">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="friends" class="dropdown-content friends-list-dropdown">
                                <li class = "valign-wrapper"><button data-target="modal1" class="btn modal-trigger red white-text add-friend">Add friend</button></li>
                                {listFriends !== undefined && updateFriends()}
                            </ul>
                            <li><a class="waves-effect waves-teal btn-flat white-text" onClick={() => onLogoutClick(myusername)}>Logout</a></li>
                        </ul>
                    </div> 
                </div>
            </nav>

            <ul class="sidenav" id="mobile-nav-dashboard">
                <li><a class="dropdown-trigger dropdown-friends" data-target="friends-mobile">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                <ul id="friends-mobile" class="dropdown-content mobile-friends-list-dropdown">
                <li><button data-target="modal1" class="btn modal-trigger red white-text add-friend">Add friend</button></li>
                    {listFriends !== undefined && updateFriends()}
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
                    <a class="modal-close waves-effect waves-green btn-flat white-text" onClick={() => sendFriendRequest(myusername, friendName)}>Send request</a>
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
    badges: state.badges
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Nav);

//export default Nav;
