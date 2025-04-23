import React, { useState } from 'react';

const CityInput = ({ onAddCity }) => {
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    
    setIsLoading(true);
    try {
      await onAddCity(cityName);
      setCityName('');
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="city-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : '+'}
      </button>
    </form>
  );
};

export default CityInput;
