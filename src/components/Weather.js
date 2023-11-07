import React, {useState} from "react";
import axios from "axios";

const Weather = () => {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState("");

    function getCityName(e) {
        if(e.key === "Enter"){
            fetchData(cityName);
            setCityName("");
        }
    }

    function fetchData(cityName) {
        const Api_Key = "910e7d30370c6fe574bb443f65a0fd8e";

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api_Key}`)
        .then(response => {
            console.log(response);
            setWeatherData(response);
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="container">
            <input className="search" type="text" placeholder="Enter City" onKeyDown={getCityName} onChange={(e) => setCityName(e.target.value)}  value={cityName}/>
            {
               weatherData !== "" &&
                <div className="weather">
                    <h2> {weatherData.data.name} </h2>
                    <h1> {((weatherData.data.main.temp - 273.15)* 9/5 + 32).toFixed(1)} <sup> o </sup> F </h1>
                    <p> {weatherData.data.weather[0].description} </p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}.png`} alt="Icon Image" />
                </div>
            }
            
        </div>
    )
}

export default Weather;
