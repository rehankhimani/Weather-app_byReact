"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./weather.css";

interface WeatherData {
  location: { name: string };
  current: {
    temp_c: number;
    condition: { text: string };
    humidity: number;
    wind_kph: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState("Lahore");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

const fetchWeather = async () => {
    try {
      const API_KEY = "0fd51a59be544521a41130012251205";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      if (data.location && data.current) {
        setWeatherData(data);
      } else {
        alert("City not found");
      }
    } catch {
      alert("Error fetching weather");
    }}
    [city];

  useEffect(() => {
    fetchWeather();
  }, []);

  const getBackground = () => {
    const condition = weatherData?.current.condition.text.toLowerCase() || "";
    if (condition.includes("rain")) return "rain.jpg";
    return "sunny.jpg";
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(/${getBackground()})` }}
    >
      <div className="card-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>
            <img src="Icons/SearchIcon.png" alt="Search" />
          </button>
        </div>

        {weatherData && (
          <div className="weather-info">
            <h1>{weatherData.current.temp_c}°C</h1>
            <h3>{weatherData.location.name}</h3>
            <p>{weatherData.current.condition.text}</p>

            <div className="info-cards">
              <div className="info-card">
                <img src="Icons/weather.png" alt="Humidity" />
                <p>{weatherData.current.humidity}%</p>
                <span>Humidity</span>
              </div>
              <div className="info-card">
                <img src="Icons/wind.png" alt="Wind" />
                <p>{weatherData.current.wind_kph} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
