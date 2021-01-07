import "./App.css";
import React from "react";
//Apply Component Pattern
//Row component
import Row from "./components/Row/Row";
//Banner component
import Banner from "./components/Banner/Banner";
//Navbar component
import Nav from "./components/Nav/Nav"
//url to fetch the movies info from tmdb
import request from "./components/Requests/requestsTmdb";

function DashboardTest() {
  return (
    <div className="app">
      <Nav/>
      <Banner/>
      <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//> 
      <Row title="Top Rated" fetchTitles={request.fetchTopRated} trending/>
      <Row title="Action Movies" fetchTitles={request.fetchActionMovies} trending/>
      <Row title="Comdey Movies" fetchTitles={request.fetchComedyMovies} trending/>
      <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} trending/>
      <Row
        title="Animation Movies"
        fetchTitles={request.fetchAnimationMovies}
      />
    </div>
  );
}

export default DashboardTest;
