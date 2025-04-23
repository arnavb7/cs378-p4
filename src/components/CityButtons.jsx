import React from 'react';

const CityButtons = ({ cities, onSelectCity, selectedCity }) => {
  return (
    <div className="city-buttons">
      {cities.map(city => (
        <button
          key={city.name}
          className={selectedCity === city.name ? 'active' : ''}
          onClick={() => onSelectCity(city)}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CityButtons;
