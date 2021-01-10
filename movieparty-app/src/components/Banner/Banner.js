import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "../../utils/Requests/axiosReq"
import req from "../../utils/Requests/requestsTmdb"
import { connect } from "react-redux";
import { friendList } from "../../actions/friendsActions";
import "./Banner.css"

function Banner(props) {
    const IMG_API = "https://image.tmdb.org/t/p/original/";
    const [movieBanner, setMovieBanner] = useState([]);
    const [myfriend, setMyfriends] = useState([]);
    const { user } = props.auth;
    const myusername = user.name.split(" ")[0];

    //changeMainMovieBanner
    async function changeMainMovieBanner(movieId){
        var request = (await axios.get(axios.defaults.baseURL + `/movie/${movieId}` + req.apikey)).data
        setMovieBanner(request);
        return request;
    }
    //fetchDataBanner at load or row banner
    async function fetchDataBanner(){
        var request
        if(props.movieId !== undefined) {//row banner
            request = (await axios.get(axios.defaults.baseURL + `/movie/${props.movieId}` + req.apikey)).data
        } else {//main banner
            var trendingMovies = await axios.get(axios.defaults.baseURL + req.fetchTrending)
            request = trendingMovies.data.results[
                Math.floor(Math.random() * trendingMovies.data.results.length)
            ]
        }
        setMovieBanner(request);
        return request;
    }

    //First load main banner or row banner loads
    useEffect(() => {
        if(props.searchedMovie.mainBannerMovieId == ""){
            fetchDataBanner();
        }
        else if(props.mainBanner && props.searchedMovie.mainBannerMovieId != ""){
            changeMainMovieBanner(props.searchedMovie.mainBannerMovieId);
            props.searchedMovie.mainBannerMovieId = ""//reset props
        }
    }, [props])

    //fetch friend list once at page load
    useEffect(() => {
        fetchFriendList();
    }, []); // <-- empty array means 'run once'
    const fetchFriendList = () => {
        friendList(myusername).then(data => { data.friends.forEach(element => {
            setMyfriends(prevArray => [...prevArray, element])
        })})
    };

    //In banner description
    function suspensionDots(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const parseFriend = (myfriend) =>{
        myfriend.forEach(e => {
            console.log(e.username)
            console.log(e.online)
            document.getElementById('friend__list').innerHTML +=  '<li onclick="console.log(' + `'`+e.username+`'` + ');">' + e.username + ' (' + e.online + ')' + '</li>';            
        })        
    }

    /*useEffect(() => {
        async function changeMainMovieBanner(movieId){
            var request = (await axios.get(axios.defaults.baseURL + `/movie/${movieId}` + req.apikey)).data
            console.log(request)
            setMovieBanner(request);
            return request;
        }
        if(props.mainBanner && props.searchedMovie.mainBannerMovieId != ""){            
            changeMainMovieBanner(props.searchedMovie.mainBannerMovieId);
            props.searchedMovie.mainBannerMovieId = ""//reset props
        }
    }, [props.searchedMovie]);*/

    return (
        <header className="banner"
        /*bg image*/
        /*movieBanner?.backdrop_path the ? handles the undefined values in movieBanner*/
            style={{ 
                backgroundSize: "cover",
                backgroundImage: `url(
                    "${IMG_API}${movieBanner?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >  
            <div className = "banner__contents">
                {/*title*/}
                <h1 className="banner__title">                    
                    {movieBanner?.title || movieBanner?.name || movieBanner?.original_name/*optional chaining, like an if else*/}
                </h1>

                {/*div > 2 buttons*/}
                <div className="banner__buttons">
                    {/*onClick = {props.startYoutubePlayer}*/}
                    <button className="banner__button" onClick = {()=>props.startMoviePartySolo(props.movieId)}>Play1</button>
                    <Link to={
                            {
                                pathname:"/movieparty",
                                myUsername: myusername,
                                friendlist: myfriend,             
                                movieId: movieBanner.id
                            }
                        }
                         className="btn-flat waves-effect">
                        <button className="banner__button" >Play party</button>
                    </Link>
                    <ul id = "friend__list"> </ul>
                </div>
                <h2 className="banner__description"> {suspensionDots(movieBanner?.overview, 150)} </h2>
            </div>

            <div className="banner__fadeBottom"></div>

        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,    
    searchedMovie: state.mainBannerMovieId,
    partystatus: state.partystatus
});

export default connect(
    mapStateToProps,
    {}
)(Banner);

//export default Banner
