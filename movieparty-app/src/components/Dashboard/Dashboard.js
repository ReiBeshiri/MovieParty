import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Apply Component Pattern
//Row component
import Row from "../Row/Row";
//Banner component
import Banner from "../Banner/Banner";
//Navbar component
import Nav from "../Nav/Nav"
//InviteFriendsMovieParty component
import InviteFriendsMovieParty from "../InviteFriendsMovieParty/InviteFriendsMovieParty"
//url to fetch the movies info from tmdb
import request from "../../utils/Requests/requestsTmdb";
//notification imports
import {useNotification} from "../Notification/NotificationProvider";
import {notification_titles} from "../Notification/NotificationTitle";

function Dashboard(props) {
  const { user } = props.auth;
  const myusername = user.name.split(" ")[0];
  const [inLobby, setInLobby] = useState(false);

  const dispatch = useNotification();
  const handleNewNotification = (title, type, msg, usr) => {
      dispatch({
      title: title,
      type: type,
      message: msg, //structured data
      myusr:usr
      })
  }

  useEffect(() => {
    if(props.friend.friend_username !== undefined && props.friend.friend_username.length > 2){
      console.log("nuova notifica per "+myusername)
      handleNewNotification(
        notification_titles.friend_req,
        "SUCCESS", //success or error or ecc..
        {text: "richiesta da ", info: props.friend.friend_username},
        myusername);
      props.friend.friend_username="";//reset props
      console.log("props resettata " + props.friend.friend_username);
    }      
  }, [props.friend.friend_username])

  useEffect(() => {
    if(props.friend.friend_accepted !== undefined && props.friend.friend_accepted.length > 2){
      console.log("nuova notifica per "+myusername)
      handleNewNotification(
        notification_titles.friend_req_accepted,
        "SUCCESS",
        {text:"ora sei amico con ", info: props.friend.friend_accepted},
        myusername
        );
      props.friend.friend_accepted="";//reset props
      console.log("props resettata " + props.friend.friend_accepted);
    }
  }, [props.friend.friend_accepted])

  useEffect(() => {
    if(props.genericmsg.message !== undefined && props.genericmsg.message.length > 2){
      console.log("nuova notifica per "+myusername)
      handleNewNotification(
        notification_titles.genericmsg,
        "SUCCESS",
        {text: props.genericmsg.message, info: ""},
        myusername
        );
        props.genericmsg.message="";//reset props
    }
  }, [props.genericmsg])

  useEffect(() => {
    console.log(props)
    if(!props.partystatus.inLobby){
      setInLobby(false)
      if(props.partystatus.leader.length>2){
        handleNewNotification(
          notification_titles.party_req,
          "SUCCESS",
          {text: props.partystatus.leader+" invited you to a party", info: props.partystatus},
          myusername
          );
      }
        //reset props
    }
    if(props.partystatus.inLobby){
      setInLobby(true)
    }
  }, [props.partystatus])

  return (
    <div className="app">
      {!inLobby && <Nav/>}
      {!inLobby && <Banner mainBanner/>}
      {!inLobby && <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//> }
      {!inLobby && <Row title="Top Rated" fetchTitles={request.fetchTopRated} trending/>}
      {!inLobby && <Row title="Action Movies" fetchTitles={request.fetchActionMovies} trending/>}
      {!inLobby && <Row title="Comdey Movies" fetchTitles={request.fetchComedyMovies} trending/>}
      {!inLobby && <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} trending/>}
      {!inLobby && <Row title="Animation Movies" fetchTitles={request.fetchAnimationMovies} trending />}
      {inLobby && <InviteFriendsMovieParty/>}
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  friend: state.friend,
  genericmsg: state.genericmsg,
  partystatus: state.partystatus
});

export default connect(
  mapStateToProps, 
  {}
)(Dashboard);

//export default Dashboard;

/** NOTIFICATION STRUCTURE
 * 
      title: title,
      type: type,
      message: msg, -> {text: "", info: var}
      myusr:usr
 * 
 */