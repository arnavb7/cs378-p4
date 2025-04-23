// Weather API service for Open-Meteo
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
    );
    if (!response.ok) {
      throw new Error('Weather data is unavailable.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchCityCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1&format=json`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`Could not find weather for ${cityName}`);
    }
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name
    };
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    throw error;
  }
};
