const API_KEY = "38edf32690a1d179a3c3b3120f3041ee"; //tmdb api gateway

const genreMap = new Map(); //req map
genreMap.set("action", 28);
genreMap.set("adventure", 12);
genreMap.set("animation", 16);
genreMap.set("fantasy", 14);
genreMap.set("comedy", 35);
genreMap.set("crime", 80);
genreMap.set("documentary", 99);
genreMap.set("drama", 18);
genreMap.set("family", 10751);
genreMap.set("history", 36);
genreMap.set("horror", 27);
genreMap.set("music", 10402);
genreMap.set("mystery", 9648);
genreMap.set("romance", 10749);
genreMap.set("science_fiction", 878);
genreMap.set("tv_movie", 10770);
genreMap.set("thriller", 53);
genreMap.set("war", 10752);
genreMap.set("western", 37);

const requests = {
  apikey : `?api_key=${API_KEY}`,
  trailerVideoKey : `/videos?api_key=${API_KEY}`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&lenguage=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&lenguage=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "action"
  )}`,
  fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "adventure"
  )}`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "animation"
  )}`,
  fetchFantasyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "fantasy"
  )}`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "comedy"
  )}`,
  fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "crime"
  )}`,
  fetchDocumentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "documentary"
  )}`,
  fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "drama"
  )}`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "family"
  )}`,
  fetchHistoryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "history"
  )}`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "horror"
  )}`,
  fetchMusicMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "music"
  )}`,
  fetchMysteryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "mystery"
  )}`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "romance"
  )}`,
  fetchScienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "science_fiction"
  )}`,
  fetchTVMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "tv_movie"
  )}`,
  fetchThrillerMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "thriller"
  )}`,
  fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "war"
  )}`,
  fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=${genreMap.get(
    "western"
  )}`
};

export default requests;
