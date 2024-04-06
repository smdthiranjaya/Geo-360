import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';

// Define the main App functional component
function App() {
  return (
    // Use the Router component to enable routing within the app
    <Router>
      <Routes>
      // Define the Routes for your application
        <Route path="/" element={<WeatherPage />} />
        {}
      </Routes>
    </Router>
  );
}

// Export the App component for use in index.js or other parts of the app
export default App;
