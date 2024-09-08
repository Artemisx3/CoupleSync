import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface WeatherData {
  location: string;
  lastUpdated: string;
  weather: string;
  temperature: number;
  humidity: string;
}

const CheckWeather: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [city1, setCity1] = useState<string>('');
  const [city2, setCity2] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    const savedApiKey = localStorage.getItem('weatherApiKey');
    const savedCity1 = localStorage.getItem('city1');
    const savedCity2 = localStorage.getItem('city2');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedCity1 && savedCity2 && savedApiKey) {
      setCity1(savedCity1);
      setCity2(savedCity2);
      handleCheckWeather(savedCity1, savedCity2, savedApiKey);
    }
  };

  const saveApiKey = () => {
    if (tempApiKey) {
      setApiKey(tempApiKey);
      localStorage.setItem('weatherApiKey', tempApiKey);
      setTempApiKey('');
      console.log('API key saved successfully');
    } else {
      setError('Please enter a valid API key');
    }
  };

  const saveCities = () => {
    localStorage.setItem('city1', city1);
    localStorage.setItem('city2', city2);
    console.log('Cities saved successfully');
  };

  const deleteSavedCities = () => {
    localStorage.removeItem('city1');
    localStorage.removeItem('city2');
    setCity1('');
    setCity2('');
    setWeatherData([]);
    setError('');
    console.log('Saved cities deleted successfully');
  };

  const fetchWeather = async (city: string, key: string): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`);
      return {
        location: `${response.data.location.country}, ${response.data.location.name}`,
        lastUpdated: response.data.current.last_updated,
        weather: response.data.current.condition.text,
        temperature: response.data.current.temp_c,
        humidity: `${response.data.current.humidity}%`,
      };
    } catch (err) {
      console.error(`Error fetching weather for ${city}:`, err);
      return null;
    }
  };

  const handleCheckWeather = async (c1: string, c2: string, key: string) => {
    if (c1 && c2 && key) {
      setLoading(true);
      setError('');
      setWeatherData([]);
      const data1 = await fetchWeather(c1, key);
      const data2 = await fetchWeather(c2, key);
      const newWeatherData = [data1, data2].filter((data): data is WeatherData => data !== null);
      setWeatherData(newWeatherData);
      setLoading(false);
      if (newWeatherData.length === 0) {
        setError('Failed to fetch weather data. Please check your internet connection and try again.');
      } else if (newWeatherData.length === 1) {
        setError(`Successfully fetched weather data for one city. Failed for ${data1 ? c2 : c1}.`);
      }
    } else {
      setError('Please enter both city names and ensure you have a valid API key.');
    }
  };

  const refreshWeather = () => {
    if (city1 && city2 && apiKey) {
      handleCheckWeather(city1, city2, apiKey);
    }
  };

  return (
    <div className="weather-check">
      <h1>Weather Check for Two Cities</h1>
      {!apiKey && (
        <div className="api-key-setup">
          <input
            type="text"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="Enter your WeatherAPI key"
          />
          <button onClick={saveApiKey}>Save API Key</button>
          <p>
            Don't have an API key? Get one from{' '}
            <a href="https://www.weatherapi.com/my/" target="_blank" rel="noopener noreferrer">
              WeatherAPI.com
            </a>
          </p>
        </div>
      )}
      {apiKey && (
        <>
          {!weatherData.length && (
            <div className="city-inputs">
              <input
                type="text"
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
                placeholder="Enter first city name"
              />
              <input
                type="text"
                value={city2}
                onChange={(e) => setCity2(e.target.value)}
                placeholder="Enter second city name"
              />
              <button onClick={() => { saveCities(); refreshWeather(); }}>Check Weather</button>
            </div>
          )}
          {weatherData.length > 0 && (
            <div className="weather-controls">
              <p>Showing weather for: {city1} and {city2}</p>
              <div>
                <button onClick={refreshWeather}>Refresh Weather</button>
                <button onClick={() => {
                  deleteSavedCities();
                  setWeatherData([]);
                }}>Change Cities</button>
              </div>
            </div>
          )}
        </>
      )}
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
      <div className="weather-cards">
        {weatherData.map((data, index) => (
          <div key={index} className="weather-card" onClick={refreshWeather}>
            <h2>{data.location}</h2>
            <p>Last Updated: {data.lastUpdated}</p>
            <p>Weather: {data.weather}</p>
            <p>Temperature: {data.temperature}°C</p>
            <p>Humidity: {data.humidity}</p>
          </div>
        ))}
      </div>
      <div className="settings">
        <button onClick={() => { 
          setApiKey(''); 
          setTempApiKey('');
          localStorage.removeItem('weatherApiKey'); 
          setWeatherData([]);
          setError('');
        }}>
          Change API Key
        </button>
      </div>
      <Link to="/" className="go-back-link">Go Back</Link>
    </div>
  );
};

export default CheckWeather;
