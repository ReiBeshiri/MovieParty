import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import store from "../../store";
import {RESET} from "../../reducers/types"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { leaveRoom } from '../../socket/socket';
import Row from "./Row/Row";
import Banner from "./Banner/Banner";
import Nav from "./Nav/Nav"
import request from "../../utils/Requests/requestsTmdb"; //url to fetch the movies info from tmdb
import {useNotification} from "../Notification/NotificationProvider";
import {notification_titles} from "../Notification/NotificationTitle";
import {userBadgeList} from "../../actions/usersActions"

function Dashboard(props) {
  const { user } = props.auth;
  const myusername = user.name.split(" ")[0];
  const [inParty, setInParty] = useState(false);

  const dispatch = useNotification();

  console.log(props)

  useEffect(()=>{
    leaveRoom()
    store.dispatch({
      type: RESET,
      payload: {}
    })
  },[])

  useEffect(()=>{
    if(props.badges.username === ""){userBadgeList(myusername)}
  },[props.badges.username])

  useEffect(() => {
    if(props.friend.friend_username !== undefined && props.friend.friend_username.length > 2){
      dispatch({
        title: notification_titles.friend_req,
        type: "SUCCESS", //success or error or ecc..
        message: {text: "richiesta da ", info: props.friend.friend_username},
        myusr: myusername
      });
      props.friend.friend_username=undefined;//reset props
    }      
  }, [props.friend.friend_username,myusername,dispatch])

  useEffect(() => {
    if(props.friend.friend_accepted !== undefined && props.friend.friend_accepted.length > 2){
      dispatch({
        title: notification_titles.friend_req_accepted,
        type: "SUCCESS",
        message: {text:"ora sei amico con ", info: props.friend.friend_accepted},
        myusr: myusername
      });
      props.friend.friend_accepted=undefined;//reset props
    }
  }, [props.friend.friend_accepted,myusername,dispatch])

  useEffect(() => {
    if(props.genericmsg.message !== undefined && props.genericmsg.message.length > 2){
      dispatch({
        title: notification_titles.genericmsg,
        type: "SUCCESS",
        message: {text: props.genericmsg.message, info: ""},
        myusr: myusername
      });
      props.genericmsg.message=undefined;//reset props
    }
  }, [props.genericmsg,myusername,dispatch])

  
  useEffect(()=>{
    setInParty(props.partystatus.inLobby)
    if(!props.partystatus.inLobby){
      props.partystatus.movieparty_isStarted = false
      props.partystatus.room=undefined
      props.partystatus.leader=myusername
    }
    console.log("psuh movie party " + (inParty && !props.partystatus.movieparty_isStarted))
  },[props.partystatus.inLobby])

  useEffect(() => {
    if(!props.partystatus.leader!==myusername && props.partystatus.room!==undefined){
      if(props.partystatus.leader.length>2){
        dispatch({
          title: notification_titles.party_req,
          type: "SUCCESS",
          message: {text: props.partystatus.leader+" invited you to a party", info: props.partystatus},
          myusr: myusername
        });
      }
        //reset props
    }
  }, [props.partystatus.room])

  return (
    <div className="app">
      <Nav/>
      <Banner mainBanner/>
      <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//>
      <Row title="Top Rated" fetchTitles={request.fetchTopRated} trending/>
      <Row title="Action Movies" fetchTitles={request.fetchActionMovies} trending/>
      <Row title="Comedy Movies" fetchTitles={request.fetchComedyMovies} trending/>
      <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} trending/>
      <Row title="Animation Movies" fetchTitles={request.fetchAnimationMovies} trending />
      {inParty /*&& !props.partystatus.movieparty_isStarted*/ && props.history.push("/movieparty")}
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
  partystatus: state.partystatus,
  badges: state.badges
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