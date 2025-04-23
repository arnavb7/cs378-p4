import React from 'react';
import { getWeatherDescription, formatDate, formatTime } from '../helpers.js';
import WeatherCard from './WeatherCard';

const WeatherDisplay = ({ weatherData, cityName }) => {
  if (!weatherData) return null;

  const { current_weather, hourly, daily } = weatherData;
  
  return (
    <div className="weather-display">
      <h2>{cityName} Weather</h2>
      
      <div className="current-weather">
        <h3>Current Weather</h3>
        <div className="current-details">
          <p className="temperature">{current_weather.temperature}°C</p>
          <p>{getWeatherDescription(current_weather.weathercode)}</p>
          <p>Wind: {current_weather.windspeed} km/h</p>
        </div>
      </div>
      
      <div className="hourly-forecast">
        <h3>Hourly Forecast</h3>
        <div className="forecast-container">
          {hourly.time.slice(0, 24).map((time, index) => (
            <WeatherCard 
              key={time}
              time={formatTime(time)}
              temperature={hourly.temperature_2m[index]}
              description={getWeatherDescription(hourly.weathercode[index])}
              precipitation={hourly.precipitation[index]}
              windspeed={hourly.windspeed_10m[index]}
            />
          ))}
        </div>
      </div>
      
      <div className="daily-forecast">
        <h3>7-Day Forecast</h3>
        <div className="forecast-container">
          {daily.time.map((date, index) => (
            <div key={date} className="daily-card">
              <h4>{formatDate(date)}</h4>
              <p>{getWeatherDescription(daily.weathercode[index])}</p>
              <p>High: {daily.temperature_2m_max[index]}°C</p>
              <p>Low: {daily.temperature_2m_min[index]}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
