import "./App.css";
import React from "react";
//Apply Component Pattern
//Row component
import Row from "./Row/Row";
//Banner component
import Banner from "./Banner/Banner";
//Navbar component
import Nav from "./Nav/Nav"
//url to fetch the movies info from tmdb
import request from "./Requests/requestsTmdb";

function App() {
  return (
    <div className="app">
      <Nav/>
      <Banner/>
      <Row title="Trending Now" fetchTitles={request.fetchTrending} trending /*trending={true}*//> 
      <Row title="Top Rated" fetchTitles={request.fetchTopRated} />
      <Row title="Action Movies" fetchTitles={request.fetchActionMovies} />
      <Row title="Comdey Movies" fetchTitles={request.fetchComedyMovies} />
      <Row title="Fantasy Movies" fetchTitles={request.fetchFantasyMovies} />
      <Row
        title="Animation Movies"
        fetchTitles={request.fetchAnimationMovies}
      />
    </div>
  );
}

export default App;
