import * as dotenv from 'dotenv';
import axios from 'axios';
import colors from 'colors/safe';
import * as fs from 'fs';
import * as readline from 'readline';
import {main, rl} from './app'
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;
const citiesFile = 'cities.json';

function askForCities(): Promise<string[]> {
    return new Promise((resolve) => {
        const cities: string[] = [];

        rl.question('Enter the name of the first city: ', (city1) => {
            const city1Trimmed = city1.trim();
            cities.push(city1Trimmed);
     
            rl.question('Enter the name of the second city: ', (city2) => {
                const city2Trimmed = city2.trim();
                cities.push(city2Trimmed);
                resolve(cities);
            });
        });
    });
}


function loadCities(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      
        fs.readFile(citiesFile, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve([]);
                } else {
                    reject(err);
                }
            } else {
                try {
                    const cities = JSON.parse(data);
                    resolve(cities);
                } catch (parseErr) {
                    reject(parseErr);
                }
            }
        });
    });
}



function saveCities(cities: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(citiesFile, JSON.stringify(cities, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function connectToApiAndPrint(cities: string[]) {
    const weatherData: any[] = [];

    for (const city of cities) {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            weatherData.push({
                location: `${response.data.location.country}, ${response.data.location.name}`,
                lastUpdated: response.data.current.last_updated,
                weather: response.data.current.condition.text,
                temperature: response.data.current.temp_c,
                humidity: `${response.data.current.humidity}%`
            });
        } catch (err) {
            console.error(`Error connecting to API for ${city}. Did you put your API key in .env?`);
        }
    }

    for (let i = 0; i < weatherData.length; i++) {
        const data = weatherData[i];
        let tempColor: (text: string) => string;
        let emoji: string;

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
            tempColor = colors.white;
            emoji = "❓❓ ";
        }

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
    try {
        let cities = await loadCities();

        if(cities.length > 1){
            await connectToApiAndPrint(cities);
        }
        else if (cities.length === 0) {
            cities = await askForCities();
            await saveCities(cities);
        }

        await connectToApiAndPrint(cities);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

export const ShowingTheWeather = async () => {
    console.clear();
    await weather();
    // console.log(colors.yellow("\nPress Enter to go back..."));
        console.clear();
        main(); // Ensure this calls the main menu function
}
