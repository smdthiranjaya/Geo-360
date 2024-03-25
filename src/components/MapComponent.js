import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../assets/marker.gif';

const MapComponent = ({ weatherData }) => {
  console.log(weatherData);
  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={8} style={{ height: "700px", width: "70%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {weatherData.map(({ id, city, lat, lng, temperature, humidity, airPressure, wind_speed, weatherDescriptions, observationTime, weatherIcons, isDay }) => {
        // Define a custom icon for each marker using its weatherIcons
        const dynamicIcon = new L.Icon({
          iconUrl: weatherIcons, // This dynamically sets the icon based on weatherIcons
          iconSize: [30, 30], // Size of the icon
          iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
          popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
        });

        return (
          <Marker key={id} position={[lat, lng]} icon={dynamicIcon}>
            <Popup>
              <strong>{city}      <img src={markerIcon} alt="weather icon" style={{ width: "20px" }} /> </strong><br /><br />
              Daytime: {isDay ? 'Yes' : 'No'}<br />
              Temperature: {temperature}°C<br />
              Humidity: {humidity}%<br />
              Air Pressure: {airPressure} hPa<br />
              Wind Speed: {wind_speed} km/h<br />
              Weather: {weatherDescriptions}<br />
              Observation Time: {observationTime}<br />
              
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
  
};

export default MapComponent;
