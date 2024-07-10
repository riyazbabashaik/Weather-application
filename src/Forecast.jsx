import React, { useEffect, useState } from 'react'
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";
import haze from './assets/haze.mp4';
import cloud from './assets/cloud.mp4';
import fog from './assets/fog.mp4';
import snow from './assets/snow.mp4';
import rain from './assets/rain.mp4'
function Forecast() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const api_key = '5577b1be5de4823b619cd047abf6e86c'
    const qdata = location
    const weatherIcons={
        Clear: "CLEAR_DAY" ,
        Clouds: "CLOUDY",
        Rain: "RAIN",
        Snow: "SNOW",
        Haze: "CLEAR_DAY",
        Mist: "FOG",
        Fog: "FOG",
    }
    const weatherIcon= data.weather ? weatherIcons[data.weather[0].main]: null
    const videos={
        Clear: haze ,
        Clouds: cloud,
        Rain: rain,
        Snow: snow,
        Haze: haze,
        Mist: fog,
        Fog:fog,
    }
    const video = data.weather ? videos[data.weather[0].main]  : null
    const currDate = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day}, ${date} ${month} ${year} `;
    };
    useEffect(() => {
        const fetchDefaultData = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=hyderabad&units=Metric&appid=${api_key}`;
                const res = await fetch(url);
                const searchData = await res.json();
                setData(searchData);
                console.log(searchData)
            } catch (error) {
                console.log(error);
                setData("");
            }
        };
        fetchDefaultData();
    }, [api_key]);


    const search = async () => {
        try {
            if (qdata.trim() !== "") {
                console.log(qdata);
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${qdata}&units=Metric&appid=${api_key}`;
                const res = await fetch(url);
                const searchData = await res.json();
                console.log(searchData);
                setData(searchData);
                setLocation("")
            }
        }
        catch (error) {
            console.log(error);
            setData("");
            setLocation("");
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search();
            setLocation("");
        }
    }
    const defaults = {
        color: "white",
        size: 112,
        animate: true,
    };
    return (
        <div className="App">
            <video src={video} typeof='video.mp4' autoPlay loop muted/>
            <nav className='nav'>
            <img id="log" src="favicon1.png" alt="" />
                <h1 style={{ fontSize: '50px' }}>Weather Application</h1>
                <div className="search">
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        type='text'
                        placeholder='Search Location'
                        value={location}
                        style={{
                            position: 'relative',
                            paddingRight: '30px',
                        }}

                    ></input>
                    <img src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                        alt='search'
                        onClick={search}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </nav>
            <div className="location-cover">
                <div className="location">
                    <h1><i className="fa-solid fa-location-dot"/> {data.name ? data.name : "Inavlid Location"}</h1>
                </div>
            </div>
            <div className="top">

                <div className="main">
                    <div className="heading">
                        <h1>
                            Current Weather
                        </h1>
                    </div>
                    <div className="main-top">
                        <div className="info">

                            <p>
                                Current Time:
                            </p>
                            <p>
                                <Clock format="HH:mm:ss a" interval={1000} ticking={true}  />
                            </p>
                            <p>{currDate(new Date())}</p>
                            <p>
                                Feels Like: {data.main ? `${Math.floor(data.main.feels_like)}°C` : null}
                            </p>
                        </div>
                        <div className="temp">
                            <h1>
                                {data.main ? `${Math.floor(data.main.temp)}°C` : "NA"}
                            </h1>
                        </div>
                        <div className="sum">
                            <div>
                                <ReactAnimatedWeather
                                    icon={weatherIcon}
                                    color={defaults.color}
                                    size={defaults.size}
                                    animate={defaults.animate}
                                />
                            </div>
                            <h1>
                                {data.weather ? `${data.weather[0].main}` : 'NA'}
                            </h1>
                        </div>
                    </div>
                    <div className="main-bottom">
                        <div className="wind" >
                            <p> <i className="fa-solid fa-wind"></i> wind speed: {data.wind ? `${data.wind.speed}` : 'NA'} m/s</p>

                        </div>
                        <div className="humidity" >
                            <p><i className="fa-solid fa-droplet"></i>  Humidity: {data.main ? `${data.main.humidity}` : 'NA'} %</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="bottom">
                <div className="day1">
                    <p>temperture</p>
                    <p>Overall: </p>
                    {data.weather ? `${data.weather[0].main}` : 'NA'}
                </div>
                <div className="day2">
                    <p>temperture</p>
                    <p>Overall</p>
                </div>
                <div className="day3">
                    <p>temperture</p>
                    <p>Overall</p>
                </div>
                <div className="day4">
                    <p>temperture</p>
                    <p>Overall</p>
                </div>
                <div className="day5">
                    <p>temperture</p>
                    <p>Overall</p>
                </div>
            </div> */}
        </div>      
    );
}
export default Forecast;