import React, { useState, useEffect } from "react";
import axios from "../Requests/axiosReq";
import "./Row.css" //import css in this component
import YouTube from "react-youtube";
import requestsTmdbMovieTrailer from "../Requests/requestsTmdb";

function Row({ title, fetchTitles, trending}) {
  const IMG_API = "https://image.tmdb.org/t/p/original/";

  //title and fetchTitles are given from App.js
  const [movies, setMovies] = useState([]); //react setter variable, init to empty list

  //trailer url
  const [trailerUrl, setTrailerUrl] = useState("");

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
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = (e) => {
    //define async function to get movie trailers
    async function fetchMovieTrailer(){
      /**function from movie-trailer api, search url from movie id */
      const ytUrl = await axios.get( axios.defaults.baseURL + "/movie/" + e.id + requestsTmdbMovieTrailer.trailerVideoKey)
      //console.log(ytUrl.data.results[0].key)
      setTrailerUrl(String(ytUrl.data.results[0].key)); //add undefined key conrtrol
      return ytUrl;
    }
    //set movie trailers
    if(trailerUrl){
      setTrailerUrl(""); /*if trailer was playing stop */
    } else {              
        /*set trailer to yt trailer */
        fetchMovieTrailer();
    }
  }

  return (
    <div className="row">
      <h2>{title /*gets the title from App.js Row title="name"*/}</h2>

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
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> /**if it as the trailer add yt component */}
    </div>
  );
}

export default Row;
