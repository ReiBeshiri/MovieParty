import axios from "axios";

const tmdbRequest = axios.create({
  //url base used to get data from tmdb api
  baseURL: "https://api.themoviedb.org/3"
});

export default tmdbRequest;
