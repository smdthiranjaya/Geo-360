import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import './WeatherPage.css';
import logo from '../assets/logo.png';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [weatherStats, setWeatherStats] = useState({
        temperature: { max: 0, min: 0, avg: 0 },
        humidity: { max: 0, min: 0, avg: 0 },
        airPressure: { max: 0, min: 0, avg: 0 },
        windSpeed: { max: 0, min: 0, avg: 0 }
    });

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('https://safe-hollows-21457-d3665684dacd.herokuapp.com/api/weather', {
                    headers: {
                        'X-API-Key': 'geo360apisecret'
                    }
                });
                if (!response.ok) {
                    throw new Error('Weather data fetch failed');
                }
                const { data } = await response.json();
                const formattedData = data.map(item => ({
                    id: item.id,
                    city: item.attributes.city,
                    lat: item.attributes.latitude,
                    lng: item.attributes.longitude,
                    temperature: item.attributes.temperature,
                    humidity: item.attributes.humidity,
                    airPressure: item.attributes.air_pressure,
                    wind_speed: item.attributes.wind_speed,
                    weatherDescriptions: item.attributes.weather_descriptions,
                    observationTime: item.attributes.observation_time,
                    weatherIcons: item.attributes.weather_icons,
                    isDay: item.attributes.is_day,
                }));
                setWeatherData(formattedData);
                calculateStats(formattedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const calculateStats = (data) => {
            const initValues = { max: -Infinity, min: Infinity, sum: 0, count: 0 };
            const stats = data.reduce((acc, { temperature, humidity, airPressure, wind_speed }) => {
                ['temperature', 'humidity', 'airPressure', 'wind_speed'].forEach(key => {
                    const value = key === 'temperature' ? temperature : key === 'humidity' ? humidity : key === 'airPressure' ? airPressure : wind_speed;
                    acc[key].max = Math.max(acc[key].max, value);
                    acc[key].min = Math.min(acc[key].min, value);
                    acc[key].sum += value;
                    acc[key].count += 1;
                });
                return acc;
            }, { temperature: { ...initValues }, humidity: { ...initValues }, airPressure: { ...initValues }, wind_speed: { ...initValues } });

            setWeatherStats({
                temperature: { max: stats.temperature.max, min: stats.temperature.min, avg: stats.temperature.sum / stats.temperature.count },
                humidity: { max: stats.humidity.max, min: stats.humidity.min, avg: stats.humidity.sum / stats.humidity.count },
                airPressure: { max: stats.airPressure.max, min: stats.airPressure.min, avg: stats.airPressure.sum / stats.airPressure.count },
                windSpeed: { max: stats.wind_speed.max, min: stats.wind_speed.min, avg: stats.wind_speed.sum / stats.wind_speed.count }
            });
        };

        fetchWeatherData();

        const interval = setInterval(fetchWeatherData, 300000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="weather-page-container">
            <div className="page-header">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Geo 360 Live</h1>
            </div>
            <div className="weather-stats">
                <h2>Last 24 Hours</h2>
                <div className="stat-group">
                    <h3>Temperature (°C)</h3>
                    <p><span role="img" aria-label="Maximum">🔺</span> Max: {weatherStats.temperature.max.toFixed(1)}</p>
                    <p><span role="img" aria-label="Minimum">🔻</span> Min: {weatherStats.temperature.min.toFixed(1)}</p>
                    <p><span role="img" aria-label="Average">🔍</span> Avg: {weatherStats.temperature.avg.toFixed(1)}</p>
                </div>
                <div className="stat-group">
                    <h3>Humidity (%)</h3>
                    <p><span role="img" aria-label="Maximum">🔺</span> Max: {weatherStats.humidity.max.toFixed(1)}</p>
                    <p><span role="img" aria-label="Minimum">🔻</span> Min: {weatherStats.humidity.min.toFixed(1)}</p>
                    <p><span role="img" aria-label="Average">🔍</span> Avg: {weatherStats.humidity.avg.toFixed(1)}</p>
                </div>
                <div className="stat-group">
                    <h3>Air Pressure (hPa)</h3>
                    <p><span role="img" aria-label="Maximum">🔺</span> Max: {weatherStats.airPressure.max.toFixed(1)}</p>
                    <p><span role="img" aria-label="Minimum">🔻</span> Min: {weatherStats.airPressure.min.toFixed(1)}</p>
                    <p><span role="img" aria-label="Average">🔍</span> Avg: {weatherStats.airPressure.avg.toFixed(1)}</p>
                </div>
                <div className="stat-group">
                    <h3>Wind Speed (km/h)</h3>
                    <p><span role="img" aria-label="Maximum">🔺</span> Max: {weatherStats.windSpeed.max.toFixed(1)}</p>
                    <p><span role="img" aria-label="Minimum">🔻</span> Min: {weatherStats.windSpeed.min.toFixed(1)}</p>
                    <p><span role="img" aria-label="Average">🔍</span> Avg: {weatherStats.windSpeed.avg.toFixed(1)}</p>
                </div>
            </div>
            <MapComponent weatherData={weatherData} />
        </div>
    );
     
    
};

export default WeatherPage;
