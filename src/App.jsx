import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import ConverterPage from './pages/ConverterPage';
import './App.css';

const App = () => {
    return (
            <div className="app-container">
                <div className='c1'>
                    <WeatherPage />
                </div>
                <div className="c2">
                    <ConverterPage className="convert" />
                </div>
                
            </div>
    );
};

export default App;
