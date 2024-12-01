import axios from 'axios';
import { API_KEY } from '@env'; // Mengimpor API key dari .env
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city = 'Jakarta') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Untuk mendapatkan suhu dalam Celsius
      }
    });

    return {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      cityName: response.data.name,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};