import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import ConverterPage from './pages/ConverterPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/weather" element={<WeatherPage />} />
                    <Route path="/converter" element={<ConverterPage />} />
                </Routes>
                <WeatherPage/>
            </div>
        </Router>
    );
};

export default App;
