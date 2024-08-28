// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as dotenv from 'dotenv';
// import { remote } from 'electron';

// dotenv.config();
// const apiKey = process.env.WEATHER_API_KEY;
// const citiesFile = path.join(remote.app.getPath('userData'), 'cities.json');

// function WeatherApp() {
//   const [cities, setCities] = useState<string[]>([]);
//   const [weatherData, setWeatherData] = useState<any[]>([]);

//   useEffect(() => {
//     async function loadCities() {
//       try {
//         const data = await fs.promises.readFile(citiesFile, 'utf8');
//         setCities(JSON.parse(data));
//       } catch (err) {
//         if (err.code === 'ENOENT') {
//           setCities([]);
//         } else {
//           console.error('Error loading cities:', err);
//         }
//       }
//     }

//     loadCities();
//   }, []);

//   useEffect(() => {
//     if (cities.length > 0) {
//       fetchWeatherData();
//     }
//   }, [cities]);

//   const fetchWeatherData = async () => {
//     const weatherData: any[] = [];
//     for (const city of cities) {
//       try {
//         const response = await axios.get(
//           `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
//         );
//         weatherData.push({
//           location: `${response.data.location.country}, ${response.data.location.name}`,
//           lastUpdated: response.data.current.last_updated,
//           weather: response.data.current.condition.text,
//           temperature: response.data.current.temp_c,
//           humidity: `${response.data.current.humidity}%`,
//         });
//       } catch (err) {
//         console.error(`Error connecting to API for ${city}. Did you put your API key in .env?`, err);
//       }
//     }
//     setWeatherData(weatherData);
//   };

//   const handleAddCity = () => {
//     const city1 = prompt('Enter the name of the first city:')?.trim();
//     const city2 = prompt('Enter the name of the second city:')?.trim();
//     if (city1 && city2) {
//       const newCities = [city1, city2];
//       setCities(newCities);
//       fs.promises.writeFile(citiesFile, JSON.stringify(newCities, null, 2))
//         .catch(err => console.error('Error saving cities:', err));
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleAddCity}>Add Cities</button>
//       <div>
//         {weatherData.map((data, index) => (
//           <div key={index} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
//             <h2>{data.location}</h2>
//             <p>Last Updated: {data.lastUpdated}</p>
//             <p>Weather: {data.weather}</p>
//             <p style={{ color: getTempColor(data.temperature) }}>
//               {getEmoji(data.temperature)} {data.temperature}°C
//             </p>
//             <p>Humidity: {data.humidity}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function getTempColor(temperature: number) {
//   if (temperature <= 0) return 'blue';
//   if (temperature <= 10) return 'cyan';
//   if (temperature <= 20) return 'green';
//   if (temperature <= 30) return 'yellow';
//   if (temperature <= 40) return 'red';
//   if (temperature <= 50) return 'darkred';
//   return 'black';
// }

// function getEmoji(temperature: number) {
//   if (temperature <= 0) return '❄️';
//   if (temperature <= 10) return '🌬️';
//   if (temperature <= 20) return '🌿';
//   if (temperature <= 30) return '☀️';
//   if (temperature <= 40) return '🔥';
//   if (temperature <= 50) return '🌡️';
//   return '❓❓';
// }

// export default WeatherApp;
