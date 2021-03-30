import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {SET_MAIN_BANNER_MOVIE} from "../../../reducers/types";
import store from "../../../store";
import { logoutUser } from "../../../actions/authActions";
import { sendFriendRequest, friendRequest, friendList, friendResponse } from "../../../actions/usersActions";
import axios from "../../../utils/Requests/axiosReq";
import requestsTmdb from "../../../utils/Requests/requestsTmdb";
import M from "materialize-css";
import "./Nav.css"

function Nav(props) {
    const { user } = props.auth
    const [searchbarText, setSearchbarText] = useState("")
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
            onOpenStart: () => {setShowBadges(true)},
            onCloseEnd: () => {setShowBadges(false)},
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false,
            closeOnClick: false
        });

        M.Dropdown.init(document.querySelectorAll('.dropdown-account'), {
            inDuration: 500,
            outDuration: 225,
            coverTrigger: false,
            closeOnClick: false
        });

        M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
        M.Modal.init(document.querySelectorAll('.modal'), {});
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {})
        M.Collapsible.init(document.querySelectorAll('.mobile-collapsible'), {
            onCloseEnd: resetAll,
            inDuration: 500
        });

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

    const updateFriends = () => {
        return listFriends.map(function(friend){
            return <li key={friend.username}>
                <a href="#!" class = "white-text">
                    {friend.username.toUpperCase()}
                    {friend.online? <p class = 'right online-friend'> Online</p> : <p class = 'right center offline-friend'> Offline</p>}
                </a>
            </li>
        })
    } 

    const updateSpanNotifications = () => {
        friendRequest(myusername).then(data => {
            if(data.requests.length > 0){
                setNewNotification(true)
            }
        })
    }

    const updateNotifications = () => {
        return listNotifications.map(function(request){
            return <li key={request.username}>
                    <a href="#!" class = "left white-text">{request.friendUsername.toUpperCase()}</a>
                    <a href="#!" class = 'right green-text' onClick = {() => friendResponse(myusername, request.friendUsername, 1)}>Accept</a>
                    <a href="#!" class = 'right red-text' onClick = {() => friendResponse(myusername, request.friendUsername, 2)} >Decline</a>
            </li>
        })
    }

    const updateBadgeList = () => {
        console.log(props.badges)
        return props.badges.badges.map(function(badge){
            return  <li>
                        <div class="collapsible-header valign-wrapper transparent">
                            <i class="material-icons">{badge.owned? badge.source: "https"}</i>
                            {badge.owned && badge.title}
                            {(!badge.owned) && <span class="badge">Locked</span>}
                        </div>
                        <div class="collapsible-body white-text transparent center">
                            <span>{badge.description}</span>
                        </div>
                    </li>
        })
    }

    const resetAll = () => {
        resetListFriends()
        resetListNotifications()
    }
    
    const onChangeFriendName = e => {
        setFriendName(e.target.value );
    };

    return (
        <div>
            <nav className = "navDashboard z-depth-0">
                <div class="nav-wrapper">
                    <a href="#!" data-target="mobile-nav-dashboard" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <div className = "row">
                        <div className ="col s2">
                            <p className = "movieparty-logo">MovieParty</p>
                        </div>
                        <div className ="col s3">
                            <button className = "search-icons transparent" onClick={() => searchMovie(searchbarText)}><i class="material-icons white-text">search</i></button>
                        </div>
                        <div className ="col s7 l3">
                            <form>
                                <div class="input-field">
                                    <input id="search" class="border-search" type="search" onChange={onChange} value={searchbarText} required/>
                                </div>
                            </form>
                        </div>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a href="#!" class="dropdown-trigger dropdown-notifications" data-target="notifications">{newNotification && <span class="new badge"></span>}NOTIFICATION<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="notifications" class="dropdown-content dropdown-nav">
                                <li><a href="#!" >Notification</a></li>
                                {listNotifications !== undefined && updateNotifications()}
                            </ul>
                            <li><a href="#!" class="dropdown-trigger dropdown-badges" data-target="badges">BADGES<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="badges" class="dropdown-content dropdown-nav">
                                <li><a href="#!" >Badges</a></li>
                                <li><ul class="collapsible">
                                    {showBadges && updateBadgeList()}
                                </ul></li>
                            </ul>
                            <li><a href="#!" class="dropdown-trigger dropdown-friends" data-target="friends">FRIENDS<i class="material-icons right">arrow_drop_down</i></a></li>
                            <ul id="friends" class="dropdown-content dropdown-nav">
                                {listFriends !== undefined && updateFriends()}
                                <li class = "valign-wrapper"><a href="#!" class = "all-width"><button data-target="modalAddFriend" class="btn modal-trigger white-text red-background all-width">Add friend</button></a></li>                               
                            </ul>
                            <li><a href="#!" class="dropdown-trigger dropdown-account" data-target="account">{myusername.toUpperCase()}</a></li>
                            <ul id="account" class="dropdown-content dropdown-nav account-info-dropdown">
                                <li class = "valign-wrapper"><button class="btn-flat all-width center white-text add-friend" onClick={() => onLogoutClick(myusername)}>LOGOUT</button></li>                               
                            </ul>
                        </ul>
                    </div> 
                </div>
            </nav>

            <ul class="sidenav" id="mobile-nav-dashboard">
                <li><a href="#!" class = "center">ACCOUNT: {myusername.toUpperCase()}</a></li>
                <ul class="collapsible mobile-collapsible">
                    <li>
                        <div class="collapsible-header" onClick = {() => initListFriends()}>Friends</div>
                        <div class="collapsible-body">
                            {listFriends !== undefined && updateFriends()}
                            <li class = "valign-wrapper"><a href="#!" class = "all-width"><button data-target="modalAddFriend" class="btn modal-trigger white-text red-background all-width">Add friend</button></a></li>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onClick = {() => setShowBadges(true)}>Badges</div>
                        <div class="collapsible-body">
                            <li><a href="#!" class = "category">Badges</a></li>
                            <li>
                                <ul class="collapsible">
                                    {showBadges && updateBadgeList()}
                                </ul>
                            </li>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onClick = {() => initListNotification()}>Notification{newNotification && <span class="new badge"></span>}</div>
                        <div class="collapsible-body">
                            <li><a href="#!" class = "category">Notification</a></li>
                            {listNotifications !== undefined && updateNotifications()}
                        </div>
                    </li>
                </ul>
                <li><button class="btn-flat all-width  white-text" onClick={() => onLogoutClick(myusername)}>LOGOUT</button></li>
            </ul>

            <div id="modalAddFriend" class="modal grey darken-4">
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
                <div class="modal-footer grey darken-4">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat white-text" onClick = {() => setFriendName("")}>Discard</a>
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat white-text" onClick={() => sendFriendRequest(myusername, friendName)}>Send request</a>
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
