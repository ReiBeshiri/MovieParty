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
//url to fetch the movies info from tmdb
import request from "../Requests/requestsTmdb";
import {useNotification} from "../Notification/NotificationProvider";

function Dashboard(props) {
  const { user } = props.auth;
  const myusername = user.name.split(" ")[0];

  const dispatch = useNotification();
  const handleNewNotification = (msg, usr, friendusr) => {
      dispatch({
      type: "SUCCESS",
      message: msg,
      title: "Successful Request",
      usr:usr,
      friendusr:friendusr
      })
  }

  useEffect(() => {
    if(props.friend.friend_username.length > 2){      
      handleNewNotification("richiesta da ", myusername, props.friend.friend_username);
      props.friend.friend_username="";//reset props
      console.log("props resettata " + props.friend.friend_username);
    }      
  }, [props.friend])

  return (
    <div className="app">
      <Nav/>
      <Banner/>
      <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//> 
      <Row title="Top Rated" fetchTitles={request.fetchTopRated} trending/>
      <Row title="Action Movies" fetchTitles={request.fetchActionMovies} trending/>
      <Row title="Comdey Movies" fetchTitles={request.fetchComedyMovies} trending/>
      <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} trending/>
      <Row title="Animation Movies" fetchTitles={request.fetchAnimationMovies} trending />
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  friend: state.friend
});

export default connect(
  mapStateToProps, 
  {}
)(Dashboard);

//export default Dashboard;
