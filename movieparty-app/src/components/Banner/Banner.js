import React, {useState, useEffect} from 'react'
import axios from "../Requests/axiosReq"
import req from "../Requests/requestsTmdb"
import { connect } from "react-redux";
import { friendList } from "../../actions/friendsActions";
import "./Banner.css"

function Banner(props) {
    //baseurl/movie/464052?api_key=38edf32690a1d179a3c3b3120f3041ee&lenguage=en-US
    const IMG_API = "https://image.tmdb.org/t/p/original/";
    const [movieBanner, setMovieBanner] = useState([]);
    const [myfriend, setMyfriends] = useState([]);
    const { user } = props.auth;
    const myusername = user.name.split(" ")[0];

    useEffect(() => {
       async function fetchDataBanner(){
        var request
        if(props.movieId !== undefined) {
            console.log(props.movieId)
            request = (await axios.get(axios.defaults.baseURL + `/movie/${props.movieId}` + req.apikey)).data
        } else {
            var trendingMovies = await axios.get(axios.defaults.baseURL + req.fetchTrending)
            request = trendingMovies.data.results[
                Math.floor(Math.random() * trendingMovies.data.results.length)
            ]
            console.log(request)
        }
        setMovieBanner(request);
        return request;
       }
       fetchDataBanner();
    }, [props])

    useEffect(() => {
        fetchFriendList();
      }, []); // <-- empty array means 'run once'
    
    useEffect(() => {
        console.log(myfriend.length)
        //myfriend.forEach(e => console.log(e))
      }, [myfriend])

    const fetchFriendList = () => {
        friendList(myusername).then(data => { data.friends.forEach(element => {
            setMyfriends(prevArray => [...prevArray, element.username])
        })})
    };

    function suspensionDots(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const parseFriend = (myfriend) =>{
        myfriend.forEach(e => {
            console.log(e)
            var str1 = '<li onclick="console.log('
            var str2_4 = e
            var str3 = ');">'
            var str5 = '</li>'
            document.getElementById('friend__list').innerHTML +=  str1 + `'`+str2_4+`'` + str3 + str2_4 + str5;            
        })        
    }

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
                    <button className="banner__button"  onClick = {()=>parseFriend(myfriend)}>Play party</button>
                    <ul id = "friend__list"> </ul>
                </div>
                {/*description                                                                                {()=&gtconsole.log(`hello`)}      '<div onclick="alert(2);test(123);">Text</div>';*/}
                <h2 className="banner__description"> {suspensionDots(movieBanner?.overview, 150)} </h2>
            </div>

            <div className="banner__fadeBottom"></div>

        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {}
)(Banner);

//export default Banner
