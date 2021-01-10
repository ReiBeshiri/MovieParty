import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {SET_MAIN_BANNER_MOVIE} from "../../actions/types";
import store from "../../store";
import { logoutUser } from "../../actions/authActions";
import { friendRequest, genericmsg } from "../../actions/friendsActions";
import axios from "../../utils/Requests/axiosReq";
import requestsTmdb from "../../utils/Requests/requestsTmdb";
import "./Nav.css"

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
        <div className={`nav ${show/**if show true add nav__blackscroll*/ && "nav__blackscroll"}`}>
            <img
                className="nav__logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboEyDF2dtHbPm5v_kWaOnc610LI4PrszUJg&usqp=CAU"
                alt="Moive Party"
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
