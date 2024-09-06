import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherData {
  location: string;
  lastUpdated: string;
  weather: string;
  temperature: number;
  humidity: string;
}

const CheckWeather: React.FC = () => {
  const [city1, setCity1] = useState<string>('');
  const [city2, setCity2] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadSavedCities();
  }, []);

  const loadSavedCities = () => {
    const savedCity1 = localStorage.getItem('city1');
    const savedCity2 = localStorage.getItem('city2');
    console.log('Loaded cities:', savedCity1, savedCity2);
    if (savedCity1 && savedCity2) {
      setCity1(savedCity1);
      setCity2(savedCity2);
      setStep(3);
      handleCheckWeather(savedCity1, savedCity2);
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
    setStep(1);
    setWeatherData([]);
    console.log('Saved cities deleted successfully');
  };

  const fetchWeather = async (city: string): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
      return {
        location: `${response.data.location.country}, ${response.data.location.name}`,
        lastUpdated: response.data.current.last_updated,
        weather: response.data.current.condition.text,
        temperature: response.data.current.temp_c,
        humidity: `${response.data.current.humidity}%`,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(`Error connecting to API for ${city}:`, err.response?.data || err.message);
        setError(`Failed to fetch weather for ${city}. Error: ${err.response?.data?.error?.message || err.message}`);
      } else {
        console.error(`Unexpected error for ${city}:`, err);
        setError(`An unexpected error occurred while fetching weather for ${city}.`);
      }
      return null;
    }
  };

  const handleNextStep = () => {
    if (step === 1 && city1) {
      setStep(2);
    } else if (step === 2 && city2) {
      setStep(3);
      saveCities();
      handleCheckWeather(city1, city2);
    }
  };

  const handleCheckWeather = async (c1: string, c2: string) => {
    if (c1 && c2) {
      setError('');
      setWeatherData([]);
      const data1 = await fetchWeather(c1);
      const data2 = await fetchWeather(c2);
      const newWeatherData = [data1, data2].filter((data): data is WeatherData => data !== null);
      setWeatherData(newWeatherData);
      if (newWeatherData.length === 0) {
        setError('Failed to fetch weather data for both cities. Please check the city names and try again.');
      } else if (newWeatherData.length === 1) {
        setError(`Successfully fetched weather data for one city. Failed for ${data1 ? c2 : c1}.`);
      }
    } else {
      setError('Please enter both city names.');
    }
  };

  const getTemperatureColor = (temp: number): string => {
    if (temp <= 0) return 'text-blue-500';
    if (temp <= 10) return 'text-cyan-500';
    if (temp <= 20) return 'text-green-500';
    if (temp <= 30) return 'text-yellow-500';
    if (temp <= 40) return 'text-red-500';
    if (temp <= 50) return 'text-red-700';
    return 'text-white';
  };

  const getTemperatureEmoji = (temp: number): string => {
    if (temp <= 0) return '❄️';
    if (temp <= 10) return '🌬️';
    if (temp <= 20) return '🌿';
    if (temp <= 30) return '☀️';
    if (temp <= 40) return '🔥';
    if (temp <= 50) return '🌡️';
    return '❓❓';
  };

  return (
    <div className="weather-check">
      <h1>Weather Check for Two Cities</h1>
      {step === 1 && (
        <div>
          <input
            type="text"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            placeholder="Enter first city name"
          />
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNextStep}>Next</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            placeholder="Enter second city name"
          />
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNextStep}>Check Weather</button>
          </div>
        </div>
      )}
      {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
      {weatherData.map((data, index) => (
        <div key={index} className="weather-card">
          <h2>{data.location}</h2>
          <p>Last Updated: {data.lastUpdated}</p>
          <p>Weather: {data.weather}</p>
          <p className={getTemperatureColor(data.temperature)}>
            Temperature: {getTemperatureEmoji(data.temperature)} {data.temperature}°C
          </p>
          <p>Humidity: {data.humidity}</p>
        </div>
      ))}
      {step === 3 && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={deleteSavedCities} className="delete-button">
            Delete Saved Cities
          </button>
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link to="/" className="go-back-button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default CheckWeather;
