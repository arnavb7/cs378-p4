import React from 'react';

const WeatherCard = ({ time, temperature, description, precipitation, windspeed }) => {
  return (
    <div className="weather-card">
      <p className="time">{time}</p>
      <p className="temperature">{temperature}°C</p>
      <p className="description">{description}</p>
      <p className="precipitation">Rain: {precipitation} mm</p>
      <p className="wind">Wind: {windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
