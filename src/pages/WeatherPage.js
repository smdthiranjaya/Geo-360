import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import './WeatherPage.css';
import logo from '../assets/logo.png';

const WeatherPage = () => {
    // Initialize state for weather data and statistical information
    const [weatherData, setWeatherData] = useState([]);
    const [weatherStats, setWeatherStats] = useState({
        temperature: { max: 0, min: 0, avg: 0 },
        humidity: { max: 0, min: 0, avg: 0 },
        airPressure: { max: 0, min: 0, avg: 0 },
        windSpeed: { max: 0, min: 0, avg: 0 }
    });
    // Initialize state for user input (email and city for subscription)
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    
    // List of cities for the subscription dropdown
    const cities = ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Trincomalee', 'Vavuniya', 'Anuradhapura', 'Puttalam', 'Polonnaruwa', 'Batticaloa', 'Kurunegala', 'Ratnapura', 'Nuwara Eliya', 'Badulla', 'Pottuvil'];
  
    // handleSubmit function to process subscription form submissions
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
         // Fetch request to subscribe user to weather updates
        const response = await fetch('https://www.geo360live.tech/api/subscribe', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, city }),
        });
        
        if (response.ok) {
          alert('Subscription successful!');
          setEmail('');
          setCity('');
        } else {
          alert('Subscription failed. Please try again.');
        }
      } catch (error) {
        console.error('Error subscribing:', error);
        alert('An error occurred. Please try again.');
      }
    };

    // useEffect hook to fetch weather data and update stats on component mount and at intervals
    useEffect(() => {
        // Async function to fetch weather data from API
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('https://www.geo360live.tech/api/weather', {
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

        // Set an interval to refresh weather data every 5 minutes
        const interval = setInterval(fetchWeatherData, 300000); 

        return () => clearInterval(interval);
    }, []);

    // Render the WeatherPage component with weather statistics, map, and subscription form
    return (
        <div className="weather-page-container">
            <div className="page-header">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Geo 360 Live</h1>
            </div>
            <div className="content-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <div className="weather-data" style={{ flex: 1 }}>
                    <MapComponent weatherData={weatherData} />
                </div>
                <div className="content-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="weather-stats2">
                    <h2>Subscribe to Weather Updates</h2>
                    <h5>Catch up on your daily city weather updates, including max, min, and average updates.</h5>
                    <form onSubmit={handleSubmit}>
                        <div >
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                requiredv
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <select id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
                                <option value="">Select a city</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
      );
      
     
    
};

export default WeatherPage;
