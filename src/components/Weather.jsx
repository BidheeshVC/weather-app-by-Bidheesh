import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';


const Weather = () => {
  const [city, setCity] = useState('Thrissur'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Function to update the current time
  const updateTime = () => {
    setCurrentTime(new Date().toLocaleTimeString()); // Get the current time
  };

  // Set interval to update the time every second
  useEffect(() => {
    const timeInterval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(timeInterval);
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <>
    <div className="weather-container">
      <h1 className="heading">Weather App</h1>

      {/* Display current time */}
      <div className="time-display">
        <p>Current Time: {currentTime}</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {weatherData && <WeatherCard data={weatherData} />}

    </div>
    </>
  );
};

export default Weather;