import React from 'react';
import MapComponent from '../components/MapComponent';
// Ensure the path to your sample data is correct
import sampleWeatherData from '../data/sampleWeatherData';
import './WeatherPage.css'; // Adjust the path as necessary

const WeatherPage = () => {
    return (
      <div className="weather-page-container">
        <h1>Weather Data</h1>
        <MapComponent weatherData={sampleWeatherData} />
      </div>
    );
  };
  

export default WeatherPage;
