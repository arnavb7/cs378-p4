import React, { useState, useEffect } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';
import CityButtons from '../components/CityButtons';
import CityInput from '../components/CityInput';
import ErrorMessage from '../components/ErrorMessage';
import { fetchWeatherData, fetchCityCoordinates } from '..//api';

const Home = () => {
  // Default cities
  const defaultCities = [
    { name: 'Austin', latitude: 30.2672, longitude: -97.7431 },
    { name: 'Dallas', latitude: 32.7767, longitude: -96.7970 },
    { name: 'Houston', latitude: 29.7604, longitude: -95.3698 }
  ];
  
  const [cities, setCities] = useState(defaultCities);
  const [selectedCity, setSelectedCity] = useState(defaultCities[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load weather data for the selected city
  useEffect(() => {
    const loadWeatherData = async () => {
      if (!selectedCity) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchWeatherData(selectedCity.latitude, selectedCity.longitude);
        setWeatherData(data);
      } catch (err) {
        setError(`Failed to load weather data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadWeatherData();
  }, [selectedCity]);
  
  // Handle city selection
  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };
  
  // Handle adding a new city
  const handleAddCity = async (cityName) => {
    try {
      const cityData = await fetchCityCoordinates(cityName);
      
      // Check if city already exists
      if (cities.some(city => city.name === cityData.name)) {
        setError(`${cityData.name} is already in your list`);
        return;
      }
      
      const newCity = {
        name: cityData.name,
        latitude: cityData.latitude,
        longitude: cityData.longitude
      };
      
      setCities([...cities, newCity]);
      setSelectedCity(newCity);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  return (
    <div className="home-page">
      <h1>Weather App</h1>
      
      <CityButtons 
        cities={cities} 
        onSelectCity={handleSelectCity} 
        selectedCity={selectedCity?.name}
      />
      
      <CityInput onAddCity={handleAddCity} />
      
      <ErrorMessage message={error} onClear={() => setError(null)} />
      
      {loading ? (
        <div className="loading">Loading weather data...</div>
      ) : (
        <WeatherDisplay weatherData={weatherData} cityName={selectedCity?.name} />
      )}
    </div>
  );
};

export default Home;
