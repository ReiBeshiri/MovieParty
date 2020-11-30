import React, {useState, useEffect} from 'react'
import axios from "../Requests/axiosReq"
import req from "../Requests/requestsTmdb"
import "./Banner.css"

function Banner() {
    const IMG_API = "https://image.tmdb.org/t/p/original/";
    const [movieBanner, setMovieBanner] = useState([]);

    useEffect(() => {
       async function fetchDataBanner(){
        const request = await axios.get(axios.defaults.baseURL + req.fetchTrending)
        setMovieBanner(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ]
        );
        return request;
       }
       fetchDataBanner();
    }, [])

    function suspensionDots(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
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
                    <button className="banner__button">Play</button>
                    <button className="banner__button">Play party</button>
                </div>

                {/*description*/}
                <h2 className="banner__description"> {suspensionDots(movieBanner?.overview, 150)} </h2>
            </div>

            <div className="banner__fadeBottom"></div>

        </header>
    )
}

export default Banner
