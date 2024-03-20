import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ weatherData }) => {
  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={8} style={{ height: "700px", width: "70%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {weatherData.map(({ id, city, lat, lng, temperature, humidity, airPressure }) => (
        <Marker key={id} position={[lat, lng]}>
          <Popup>
            <strong>{city}</strong><br />
            Temperature: {temperature}°C<br />
            Humidity: {humidity}%<br />
            Air Pressure: {airPressure} hPa
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
