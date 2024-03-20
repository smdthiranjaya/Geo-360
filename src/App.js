import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage'; // Adjust the import path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
