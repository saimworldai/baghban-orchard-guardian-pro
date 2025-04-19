
import { toast } from "@/components/ui/use-toast";

const API_KEY = "4ee0eb9461ef4848a0c73126251904";
const BASE_URL = "https://api.weatherbit.io/v2.0";

export interface WeatherData {
  city_name: string;
  country_code: string;
  data: Array<{
    temp: number;
    app_temp: number;
    rh: number; // Relative humidity
    wind_spd: number;
    wind_cdir_full: string;
    weather: {
      icon: string;
      description: string;
      code: number;
    };
    precip: number;
    pop: number; // Probability of precipitation
    datetime: string;
    ts: number;
    pres: number; // Pressure
    clouds: number;
  }>;
}

export interface ForecastData {
  city_name: string;
  country_code: string;
  data: Array<{
    temp: number;
    max_temp: number;
    min_temp: number;
    rh: number;
    wind_spd: number;
    precip: number;
    pop: number;
    weather: {
      icon: string;
      description: string;
      code: number;
    };
    datetime: string;
    valid_date: string;
  }>;
}

// Get weather by coordinates
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    const response = await fetch(
      `${BASE_URL}/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch current weather data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

// Get weather by city name
export const getWeatherByCity = async (city: string): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for city: ${city}`);
    const response = await fetch(
      `${BASE_URL}/current?city=${encodeURIComponent(city)}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch current weather data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

// Get 5-day forecast by coordinates
export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData | null> => {
  try {
    console.log(`Fetching forecast for coordinates: ${lat}, ${lon}`);
    const response = await fetch(
      `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&key=${API_KEY}&days=5`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Forecast data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch forecast data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

// Get 5-day forecast by city name
export const getForecastByCity = async (city: string): Promise<ForecastData | null> => {
  try {
    console.log(`Fetching forecast for city: ${city}`);
    const response = await fetch(
      `${BASE_URL}/forecast/daily?city=${encodeURIComponent(city)}&key=${API_KEY}&days=5`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Forecast data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch forecast data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

// Get spray recommendation based on weather
export const getSprayRecommendation = (
  weatherCode: number,
  windSpeed: number,
  precipitation: number,
  humidity: number,
  temperature: number
): { recommended: boolean; reason: string } => {
  // Weather codes: https://www.weatherbit.io/api/codes
  
  // Check for adverse weather conditions first
  if (weatherCode >= 200 && weatherCode < 300) {
    return { recommended: false, reason: "Thunderstorm activity - unsafe for spraying operations" };
  }
  
  if (weatherCode >= 300 && weatherCode < 400) {
    return { recommended: false, reason: "Drizzle conditions - spraying may be ineffective due to wash-off" };
  }
  
  if (weatherCode >= 500 && weatherCode < 600) {
    return { recommended: false, reason: "Rain forecasted - spraying ineffective due to wash-off" };
  }
  
  if (weatherCode >= 600 && weatherCode < 700) {
    return { recommended: false, reason: "Snow or freezing conditions - postpone spraying until temperatures rise" };
  }
  
  if (weatherCode >= 700 && weatherCode < 800) {
    return { recommended: false, reason: "Foggy/misty conditions - reduced visibility and coverage issues" };
  }
  
  // Check other parameters
  if (windSpeed > 15) {
    return { recommended: false, reason: "Wind speed too high (>15 km/h) - risk of spray drift" };
  }
  
  if (precipitation > 0) {
    return { recommended: false, reason: "Precipitation expected - risk of wash-off" };
  }
  
  if (humidity < 40) {
    return { recommended: false, reason: "Humidity too low (<40%) - increased risk of spray evaporation" };
  }
  
  if (temperature > 30) {
    return { recommended: false, reason: "Temperature too high (>30°C) - increased evaporation and reduced effectiveness" };
  }
  
  if (temperature < 10) {
    return { recommended: false, reason: "Temperature too low (<10°C) - reduced effectiveness of many pesticides" };
  }
  
  // Good conditions
  return { 
    recommended: true, 
    reason: "Optimal conditions for spray application - suitable temperature, humidity, and wind conditions"
  };
};

// Map weather code to appropriate Lucide icon name
export const getWeatherIcon = (code: number) => {
  // Weather codes: https://www.weatherbit.io/api/codes
  if (code >= 200 && code < 300) return "CloudLightning"; // Thunderstorm
  if (code >= 300 && code < 400) return "CloudDrizzle"; // Drizzle
  if (code >= 500 && code < 600) return "CloudRain"; // Rain
  if (code >= 600 && code < 700) return "CloudSnow"; // Snow
  if (code >= 700 && code < 800) return "Cloud"; // Fog/Atmosphere
  if (code === 800) return "Sun"; // Clear sky
  if (code > 800 && code < 900) return "CloudSun"; // Clouds
  return "Cloud"; // Default
};

// Format day from datetime string (YYYY-MM-DD)
export const formatDay = (datetime: string): string => {
  const date = new Date(datetime);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
};
