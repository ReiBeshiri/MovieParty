import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { friendRequest, friendList } from "../../actions/friendsActions";
import "./Nav.css"

function Nav(props) {
    const { user } = props.auth;
    const [friendUsername, setfriendUsername] = useState("");
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
        setfriendUsername(e.target.value );
    };

    const onLogoutClick = (myUsername) => {
        props.logoutUser(myUsername);
    };

    return (
        <div className={`nav ${show/**if show true add nav__blackscroll*/ && "nav__blackscroll"}`}>
            <img
                className="nav__logo"
                /*src="https://media.istockphoto.com/vectors/movie-party-emblem-modern-cinema-sign-vector-illustration-vector-id1038664972?k=6&m=1038664972&s=170667a&w=0&h=xSXJ16gTLSnir9Ix6pwjKjCFLZ0nIvglGRK-mqi5T9M="*/                
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboEyDF2dtHbPm5v_kWaOnc610LI4PrszUJg&usqp=CAU"
                /*src="https://img-assets.drafthouse.com/images/collections/movie-parties/MovieParty_TC.jpg?auto=compress&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1080&q=80&w=1920"*/
                alt="Moive Party"
            />
            <input
                onChange={onChange}
                value={friendUsername}
                className="friendUsername"
                type="text"
            />
            <button onClick={()=> {friendRequest(myusername, friendUsername)}}>Aggiungi Amico</button>
            <button onClick={()=> {friendList(myusername)}}>Lista Amici</button>
            <button onClick={() => onLogoutClick(myusername)}>Logout</button>
            <img 
                className="nav__avatar"
                src="https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-25-512.png"
                alt="Your Avatar"
            />
        </div>
    )
}

Nav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Nav);

//export default Nav;
