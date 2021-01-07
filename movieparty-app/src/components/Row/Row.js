import React, { useState, useEffect } from "react";
import axios from "../Requests/axiosReq";
import "./Row.css" //import css in this component
import YouTube from "react-youtube";
import requestsTmdbMovieTrailer from "../Requests/requestsTmdb";
//Banner component
import Banner from "../Banner/Banner";
import MovieParty from "../MovieParty/MovieParty";

function Row({ title, fetchTitles, trending}) {
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  //title and fetchTitles are given from App.js
  const [movies, setMovies] = useState([]); //react setter variable, init to empty list

  //trailer id
  const [bannerId, setBannerId] = useState("");

  //Youtube trailer Url
  const [moviePartyUrlSolo, setMoviePartyUrlSolo] = useState("");

  //MovieParty
  const [moviePartyUrl, setMoviePartyUrl] = useState("");

  //lambda function to add listener every time Row func is called using useEffect react function
  useEffect(() => {
    //inner function
    async function fetchMovieData() {
      //async func to get data from tmdb, promise to get the movies
      const request = await axios.get(axios.defaults.baseURL + fetchTitles);
      setMovies(request.data.results);
      return request;
    }
    fetchMovieData();
  }, [fetchTitles]); //"[fetchTitles]" as a listener attached, every changes rerun this func, is the variable used outside the block

  //yt player options
  const opts = {
    height: "400",//400
    width: "80%",
    playerVars: {
      autoplay: 0,
    },
  }

  const handleClick = (e) => {
    if(bannerId){
      setBannerId(""); /*if trailer was playing stop */
      setMoviePartyUrlSolo("");
      setMoviePartyUrl("");
    } else {              
      setBannerId(e.id);
      setMoviePartyUrlSolo("");
      setMoviePartyUrl("");
    }
    console.log("prova2")
  }

  function startMovieParty(movieId){
    console.log("prova")
    setBannerId("");
    setMoviePartyUrlSolo("");
    start_MoviePartyTrailer(movieId);
  }

  function startMoviePartySolo(movieId){
    setBannerId("");
    setMoviePartyUrl("");
    start_trailer(movieId);
  }

  function start_MoviePartyTrailer(movieId){
    //define async function to get movie trailers
    async function fetchMovieTrailer(){
      /**function from movie-trailer api, search url from movie id */
      const ytUrl = await axios.get( axios.defaults.baseURL + "/movie/" + movieId + requestsTmdbMovieTrailer.trailerVideoKey)
      setMoviePartyUrl(String(ytUrl.data.results[0].key)); //add undefined key conrtrol
      return ytUrl;
    }
    //set movie trailers
    if(moviePartyUrl !== ""){
      setMoviePartyUrl(""); /*if trailer was playing stop */
    } else {              
      /*set trailer to yt trailer */
      fetchMovieTrailer();        
    }
  }

  function start_trailer(movieId){
    //define async function to get movie trailers
    async function fetchMovieTrailer(){
      /**function from movie-trailer api, search url from movie id */
      const ytUrl = await axios.get( axios.defaults.baseURL + "/movie/" + movieId + requestsTmdbMovieTrailer.trailerVideoKey)
      setMoviePartyUrlSolo(String(ytUrl.data.results[0].key)); //add undefined key conrtrol
      return ytUrl;
    }
    //set movie trailers
    if(moviePartyUrlSolo !== ""){
      setMoviePartyUrlSolo(""); /*if trailer was playing stop */
    } else {              
      /*set trailer to yt trailer */
      fetchMovieTrailer();        
    }
  }

  return (
    <div className="row">
      <h4>{title /*gets the title from App.js Row title="name"*/}</h4>

      <div className="row__posters">
        {movies.map(e => (
          <img 
            key={e.id} //optimization caching movies 
            onClick= {() => handleClick(e)}
            className={`row__poster ${trending && "row__posterTrending"}` /*if it is a trending row add classname*/}
            src={`${IMG_API}${trending ? e.poster_path : e.backdrop_path}`} 
            alt={e.title}>              
          </img>
        ))}
      </div>
      {bannerId !== "" && <Banner movieId={bannerId} startMoviePartySolo = {startMoviePartySolo} startMovieParty = {startMovieParty}/> /**if it as the trailer add yt component */}
      {moviePartyUrlSolo !== "" && <YouTube videoId={moviePartyUrlSolo} opts={opts}/> /**if it as the trailer add yt component */}
      {moviePartyUrl !== "" && <MovieParty trailerUrl={moviePartyUrl} opts={opts}/> /**if it as the trailer add yt component */}
    </div>
  );
}

export default Row;
