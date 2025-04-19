
import { toast } from "@/components/ui/use-toast";

const API_KEY = "4ee0eb9461ef4848a0c73126251904";
const BASE_URL = "https://api.weatherapi.com/v1";

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

// Transform WeatherAPI.com data to match our interface
const transformCurrentWeather = (apiData: any): WeatherData => {
  return {
    city_name: apiData.location.name,
    country_code: apiData.location.country,
    data: [{
      temp: apiData.current.temp_c,
      app_temp: apiData.current.feelslike_c,
      rh: apiData.current.humidity,
      wind_spd: apiData.current.wind_kph,
      wind_cdir_full: apiData.current.wind_dir,
      weather: {
        icon: apiData.current.condition.icon,
        description: apiData.current.condition.text,
        code: apiData.current.condition.code
      },
      precip: apiData.current.precip_mm,
      pop: 0, // WeatherAPI.com doesn't provide probability of precipitation in current weather
      datetime: apiData.location.localtime,
      ts: new Date(apiData.location.localtime).getTime() / 1000,
      pres: apiData.current.pressure_mb,
      clouds: apiData.current.cloud
    }]
  };
};

// Transform WeatherAPI.com forecast data to match our interface
const transformForecastData = (apiData: any): ForecastData => {
  return {
    city_name: apiData.location.name,
    country_code: apiData.location.country,
    data: apiData.forecast.forecastday.map((day: any) => ({
      temp: day.day.avgtemp_c,
      max_temp: day.day.maxtemp_c,
      min_temp: day.day.mintemp_c,
      rh: day.day.avghumidity,
      wind_spd: day.day.maxwind_kph,
      precip: day.day.totalprecip_mm,
      pop: day.day.daily_chance_of_rain,
      weather: {
        icon: day.day.condition.icon,
        description: day.day.condition.text,
        code: day.day.condition.code
      },
      datetime: day.date,
      valid_date: day.date
    }))
  };
};

// Get weather by coordinates
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return transformCurrentWeather(data);
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
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return transformCurrentWeather(data);
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
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Forecast data fetched successfully:", data);
    return transformForecastData(data);
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
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Forecast data fetched successfully:", data);
    return transformForecastData(data);
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
  // Weather codes for WeatherAPI.com are different from Weatherbit
  // Reference: https://www.weatherapi.com/docs/weather_conditions.json
  
  // Check for adverse weather conditions first
  // Thunderstorm, rain, snow, freezing conditions
  if ([1087, 1273, 1276, 1279, 1282].includes(weatherCode)) {
    return { recommended: false, reason: "Thunderstorm activity - unsafe for spraying operations" };
  }
  
  // Rain, drizzle
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(weatherCode)) {
    return { recommended: false, reason: "Rain or drizzle conditions - spraying may be ineffective due to wash-off" };
  }
  
  // Snow, sleet
  if ([1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1261, 1264].includes(weatherCode)) {
    return { recommended: false, reason: "Snow or freezing conditions - postpone spraying until temperatures rise" };
  }
  
  // Fog, mist
  if ([1030, 1135, 1147].includes(weatherCode)) {
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

// Map weather code to appropriate Lucide icon name for WeatherAPI.com codes
export const getWeatherIcon = (code: number) => {
  // Clear or sunny
  if ([1000].includes(code)) return "Sun";
  
  // Partly cloudy
  if ([1003].includes(code)) return "CloudSun";
  
  // Cloudy, overcast
  if ([1006, 1009].includes(code)) return "Cloud";
  
  // Fog, mist
  if ([1030, 1135, 1147].includes(code)) return "Cloud";
  
  // Drizzle, patchy rain
  if ([1063, 1150, 1153, 1180, 1183, 1240].includes(code)) return "CloudDrizzle";
  
  // Rain, heavy rain
  if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return "CloudRain";
  
  // Snow, sleet
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return "CloudSnow";
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "CloudLightning";
  
  // Default
  return "Cloud";
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
