
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

let API_KEY = "";

export const setApiKey = (key: string) => {
  API_KEY = key;
};

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: Array<{
    date: string;
    temperature: number;
    condition: string;
  }>;
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error("API key not set");
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    return {
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      location: response.data.name,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure,
      forecast: [],
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const getForecast = async (city: string) => {
  if (!API_KEY) {
    throw new Error("API key not set");
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    return response.data.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 5)
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
      }));
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw new Error("Failed to fetch forecast data");
  }
};
