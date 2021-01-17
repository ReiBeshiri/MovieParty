import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Row from "./Row/Row";
import Banner from "./Banner/Banner";
import Nav from "./Nav/Nav"
import request from "../../utils/Requests/requestsTmdb"; //url to fetch the movies info from tmdb
import {useNotification} from "../Notification/NotificationProvider";
import {notification_titles} from "../Notification/NotificationTitle";

function Dashboard(props) {
  const { user } = props.auth;
  const myusername = user.name.split(" ")[0];
  const [inParty, setInParty] = useState(false);

  const dispatch = useNotification();
  const handleNewNotification = (title, type, msg, usr) => {
      dispatch({
      title: title,
      type: type,
      message: msg, //structured data
      myusr:usr
      })
  }

  console.log(props)

  useEffect(() => {
    if(props.friend.friend_username !== undefined && props.friend.friend_username.length > 2){
      handleNewNotification(
        notification_titles.friend_req,
        "SUCCESS", //success or error or ecc..
        {text: "richiesta da ", info: props.friend.friend_username},
        myusername);
      props.friend.friend_username=undefined;//reset props
    }      
  }, [props.friend.friend_username])

  useEffect(() => {
    if(props.friend.friend_accepted !== undefined && props.friend.friend_accepted.length > 2){
      handleNewNotification(
        notification_titles.friend_req_accepted,
        "SUCCESS",
        {text:"ora sei amico con ", info: props.friend.friend_accepted},
        myusername
        );
      props.friend.friend_accepted=undefined;//reset props
    }
  }, [props.friend.friend_accepted])

  useEffect(() => {
    if(props.genericmsg.message !== undefined && props.genericmsg.message.length > 2){
      handleNewNotification(
        notification_titles.genericmsg,
        "SUCCESS",
        {text: props.genericmsg.message, info: ""},
        myusername
        );
        props.genericmsg.message=undefined;//reset props
    }
  }, [props.genericmsg])

  useEffect(() => {
    if(!props.partystatus.inLobby && props.partystatus.leader!==myusername){
      setInParty(false)
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
      setInParty(true)
    }
  }, [props.partystatus.inLobby])

  return (
    <div className="app">
      <Nav/>
      <Banner mainBanner/>
      <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//>
      <Row title="Top Rated" fetchTitles={request.fetchTopRated} trending/>
      <Row title="Action Movies" fetchTitles={request.fetchActionMovies} trending/>
      <Row title="Comdey Movies" fetchTitles={request.fetchComedyMovies} trending/>
      <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} trending/>
      <Row title="Animation Movies" fetchTitles={request.fetchAnimationMovies} trending />
      {inParty && props.history.push("/movieparty")}
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