import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; 

import rainIcon from './images/rain.png';
import cloudsIcon from './images/clouds.png';
import clearIcon from './images/clear.png';
import drizzleIcon from './images/drizzle.png';
import mistIcon from './images/mist.png';
import searchIcon from './images/search.png';
import humidityIcon from './images/humidity.png';
import windIcon from './images/wind.png';

const WeatherApp = () => {
  const apiKey = '0857bdfbf9822bcb5f4d0f481d5e160a';
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  const defaultCity = 'Pune'; 

  const [weatherData, setWeatherData] = useState({
    city: defaultCity,
    temp: "22ºc",
    humidity: "50%",
    windSpeed: "15 km/h",
    weatherIcon: rainIcon 
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkWeather(defaultCity); 
  }, []);

  const checkWeather = async (city) => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();

      setWeatherData({
        city: data.name,
        temp: Math.round(data.main.temp) + "ºc",
        humidity: data.main.humidity + "%",
        windSpeed: data.wind.speed + "km/h",
        weatherIcon: getWeatherIcon(data.weather[0].main)
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Invalid city name");
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clouds":
        return cloudsIcon;
      case "Clear":
        return clearIcon;
      case "Rain":
        return rainIcon;
      case "Drizzle":
        return drizzleIcon;
      case "Mist":
        return mistIcon;
      default:
        return rainIcon; 
    }
  };

  const handleSearchClick = () => {
    const inputValue = document.querySelector(".search input").value;
    const city = inputValue ? inputValue : defaultCity;
    checkWeather(city);
  };

  return (
    <div className="card">
      <div className="search">
        <input type="text" placeholder="enter city name" spellCheck="false" />
        <button onClick={handleSearchClick}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      <div className="error" style={{ display: errorMessage ? "block" : "none" }}>
        <p>{errorMessage}</p>
      </div>
      <div className="weather" style={{ display: errorMessage ? "none" : "block" }}>
        <img src={weatherData.weatherIcon} className="weather-icon" alt="Weather Icon" />
        <h1 className="temp">{weatherData.temp}</h1>
        <h2 className="city">{weatherData.city}</h2>
        <div className="details">
          <div className="col">
            <img src={humidityIcon} alt="Humidity Icon" />
            <div>
              <p className="humidity">{weatherData.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={windIcon} alt="Wind Icon" />
            <p className="wind">{weatherData.windSpeed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
