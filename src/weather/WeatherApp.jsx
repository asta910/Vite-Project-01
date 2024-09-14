import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const apiKey = '0857bdfbf9822bcb5f4d0f481d5e160a';

const WeatherApp = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        const defaultLocation = 'Pune';
        fetchWeather(defaultLocation);
        fetchForecast(defaultLocation);
    }, []);

    const fetchWeather = async (location) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod !== 200) {
                displayError('City not found');
            } else {
                setWeatherData(data);
            }
        } catch (error) {
            displayError('Error fetching weather');
        }
    };

    const fetchForecast = async (location) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod !== "200") {
                displayError('City not found');
            } else {
                setForecastData(data);
            }
        } catch (error) {
            displayError('Error fetching forecast');
        }
    };

    const handleSearch = () => {
        if (location.trim() !== '') {
            fetchWeather(location.trim());
            fetchForecast(location.trim());
        }
    };

    const displayError = (message) => {
        // Display error message here
    };

    const displayWeather = () => {
        if (!weatherData) return null;
        return (
            <div id="weatherInfo" className="weather-info">
                <h2>{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
                <p>{new Date().toLocaleDateString()}</p>
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
                    <span>{weatherData.weather[0].main}</span>
                </div>
                <p>Temperature: {`${weatherData.main.temp} °C`}</p>
                <p>Humidity: {`${weatherData.main.humidity} %`}</p>
                <p>Wind Speed: {`${weatherData.wind.speed} m/s`}</p>
            </div>
        );
    };

    const displayForecast = () => {
        if (!forecastData) return null;
        return (
            <div id="forecastInfo" className="forecast-info">
                {forecastData.list.map((item, index) => {
                    if (index % 8 === 0) {
                        const date = new Date(item.dt_txt).toLocaleDateString();
                        return (
                            <div key={index} className="forecast-day">
                                <div className="forecast-date-icon">
                                    <p>{date}</p>
                                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                                    <span>{item.weather[0].main}</span>
                                </div>
                                <div className="forecast-details">
                                    <p>Temperature: {`${item.main.temp} °C`}</p>
                                    <p>Humidity: {`${item.main.humidity} %`}</p>
                                    <p>Wind Speed: {`${item.wind.speed} m/s`}</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="weather-app">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {displayWeather()}
                {displayForecast()}
            </div>
        </div>
    );
};

export default WeatherApp;
