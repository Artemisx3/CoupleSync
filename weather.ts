import * as dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

const apiKey = process.env.WEATHER_API_KEY;

async function connectToApiAndPrint() {
    const cities = ['Sofia', 'Gouda'];
    const weatherData = [];

    for (const city of cities) {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            weatherData.push({
                location: `${response.data.location.country}, ${response.data.location.name}`,
                lastUpdated: response.data.current.last_updated,
                weather: response.data.current.condition.text,
                temperature: `${response.data.current.temp_c}°C`,
                humidity: `${response.data.current.humidity}%`
            });
        } catch (err) {
            console.error(`Error connecting to API for ${city}`, err);
        }
    }

    // Print the weather data side by side
    for (let i = 0; i < weatherData.length; i++) {
        const data = weatherData[i];
        console.log(`${data.location}`);
        console.log(`Last Updated At: ${data.lastUpdated}`);
        console.log(`Weather: ${data.weather}`);
        console.log(`Temperature: ${data.temperature}`);
        console.log(`Humidity: ${data.humidity}`);
        if (i < weatherData.length - 1) {
            console.log('-------------------------');
        }
    }
}

export function weather() {
    connectToApiAndPrint()
    ;
}


