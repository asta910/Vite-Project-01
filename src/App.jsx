import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import ConverterPage from './pages/ConverterPage';
import './App.css';

const App = () => {
    return (
            <div className="app-container">
                <WeatherPage />
                <ConverterPage className="convert" />
            </div>
    );
};

export default App;
