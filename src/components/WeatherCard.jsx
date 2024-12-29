import React from 'react';
import './WeatherCard.css';


const WeatherCard = ({ data }) => {
  const { name, main, weather, wind, sys } = data;

  return (
    <>
    <div className="weather-card">
      <h1>{name}, {sys.country}</h1>
      <div className="weather-details">
        <div className="temp">
          <h2>{main.temp}°C</h2>
          <p>Feels like {main.feels_like}°C</p>
        </div>
        <div className="info">
          <p><strong>Condition:</strong> {weather[0].main} ({weather[0].description})</p>
          <p><strong>Humidity:</strong> {main.humidity}%</p>
          <p><strong>Pressure:</strong> {main.pressure} hPa</p>
          <p><strong>Wind:</strong> {wind.speed} m/s</p>
        </div>
        <div className="icon">
          <img
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherCard;