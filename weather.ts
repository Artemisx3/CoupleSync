import * as dotenv from 'dotenv';
import axios from 'axios';
import * as colors from 'colors';

dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;

async function connectToApiAndPrint() {
    const cities = ['Sofia', 'Gouda'];
    const weatherData: any[] = [];

    for (const city of cities) {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            weatherData.push({
                location: `${response.data.location.country}, ${response.data.location.name}`,
                lastUpdated: response.data.current.last_updated,
                weather: response.data.current.condition.text,
                temperature: response.data.current.temp_c, // Store as number
                humidity: `${response.data.current.humidity}%`
            });
        } catch (err) {
            console.error(`Error connecting to API for ${city}`, err);
        }
    }

    //I love Hana so so so much
    // Print the weather data side by side
    for (let i = 0; i < weatherData.length; i++) {
        const data = weatherData[i];
        let tempColor: (text: string) => string;
        let emoji: string;

        // Determine color based on temperature
        if (data.temperature <= 0) {
            tempColor = colors.blue;
            emoji = '❄️ '; 
        } else if (data.temperature <= 10) {
            tempColor = colors.cyan;
            emoji = '🌬️ ';
        } else if (data.temperature <= 20) {
            tempColor = colors.green;
            emoji = '🌿 ';
        } else if (data.temperature <= 30) {
            tempColor = colors.yellow;
            emoji = '☀️ ';
        } else if (data.temperature <= 40) {
            tempColor = colors.red;
            emoji = '🔥 '; 
        } else if (data.temperature <= 50) {
            tempColor = colors.bgRed;
            emoji = '🌡️ '; 

        } else {
            tempColor = colors.white; // Default color for very high temperatures
            emoji = "❓❓ "
        }

        // Print data with colored temperature
        console.log(`${data.location}`);
        console.log(`Last Updated At: ${data.lastUpdated}`);
        console.log(`Weather: ${data.weather}`);
        console.log(`Temperature: ${tempColor(`${emoji} ${data.temperature}°C`)}`);
        console.log(`Humidity: ${data.humidity}`);
        if (i < weatherData.length - 1) {
            console.log('-------------------------');
        }
    }
}

export async function weather(): Promise<void> {
    await connectToApiAndPrint();
}
