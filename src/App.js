import React, { useState } from "react";
import "./App.css";
import { getWeatherData } from "./api/weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (error) {
      alert("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Mock Daily Data Based on Current Weather
  const generateForecast = () => {
    if (!weather) return [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return [...Array(5)].map((_, i) => {
      const dayIndex = (today.getDay() + i) % 7; // Get day of the week
      return {
        day: daysOfWeek[dayIndex],
        temp: Math.round(weather.main.temp + i - 2), // Vary temperature slightly
        icon: "04d", // Cloudy icon for all days
        description: "Few Clouds", // Cloudy description for all days
      };
    });
  };

  const forecast = generateForecast();

  return (
    <div className="app">
      {/* Header for Weather Forecast */}
      <h1 className="forecast-header">Weather Forecast</h1>

      {/* Current Weather */}
      <div className="weather-card">
        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <>
            <h2 className="city-name">{weather.name}</h2>
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            <p className="description">{weather.weather[0].description}</p>
            <div className="additional-info">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} km/h</span>
              <span>Pressure: {weather.main.pressure} hPa</span>
            </div>
            {/* Stylish Date */}
            <div className="weather-date">
              {new Date(weather.dt * 1000).toLocaleString('en-US', {
                weekday: 'long', // Full day name
                year: 'numeric',
                month: 'short',  // Abbreviated month
                day: 'numeric',
              })}
            </div>
          </>
        ) : (
          <p>Enter a city to get started!</p>
        )}
      </div>

      {/* Daily Forecast */}
      {weather && (
        <div className="forecast-slider">
          {forecast.map((forecastItem, i) => (
            <div className="forecast-item" key={i}>
              <h3>{forecastItem.day}</h3>
              <img
                src={`http://openweathermap.org/img/wn/${forecastItem.icon}@2x.png`}
                alt="cloud icon"
                width={40}
              />
              <p className="forecast-temp">{forecastItem.temp}°C</p>
            </div>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={city}
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
