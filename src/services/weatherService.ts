import { toast } from "@/components/ui/use-toast";

const API_KEY = "4ee0eb9461ef4848a0c73126251904";
const BASE_URL = "https://api.weatherapi.com/v1";

export interface WeatherData {
  city_name: string;
  country_code: string;
  data: Array<{
    temp: number;
    app_temp: number;
    rh: number;
    wind_spd: number;
    wind_cdir_full: string;
    weather: {
      icon: string;
      description: string;
      code: number;
    };
    precip: number;
    pop: number;
    datetime: string;
    ts: number;
    pres: number;
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
    hour: Array<{
      time: string;
      temp_c: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_kph: number;
      humidity: number;
      chance_of_rain: number;
    }>;
  }>;
}

const transformCurrentWeather = (apiData: any): WeatherData => {
  try {
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
        pop: 0,
        datetime: apiData.location.localtime,
        ts: new Date(apiData.location.localtime).getTime() / 1000,
        pres: apiData.current.pressure_mb,
        clouds: apiData.current.cloud
      }]
    };
  } catch (error) {
    console.error("Error transforming weather data:", error, apiData);
    throw new Error("Failed to process weather data");
  }
};

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
      valid_date: day.date,
      hour: day.hour.map((h: any) => ({
        time: h.time,
        temp_c: h.temp_c,
        condition: {
          text: h.condition.text,
          icon: h.condition.icon,
          code: h.condition.code
        },
        wind_kph: h.wind_kph,
        humidity: h.humidity,
        chance_of_rain: h.chance_of_rain
      }))
    }))
  };
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates provided");
    }
    
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
      description: error instanceof Error ? error.message : "Failed to fetch current weather data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData | null> => {
  try {
    if (!city.trim()) {
      throw new Error("No location specified");
    }
    
    console.log(`Fetching weather for city: ${city}`);
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      
      if (errorData.error && errorData.error.code === 1006) {
        throw new Error("Location not found. Please check the spelling or try a different location.");
      }
      
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return transformCurrentWeather(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch current weather data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData | null> => {
  try {
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates provided");
    }
    
    console.log(`Fetching forecast for coordinates: ${lat}, ${lon}`);
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=15&aqi=no&alerts=no`
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
      description: error instanceof Error ? error.message : "Failed to fetch forecast data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData | null> => {
  try {
    if (!city.trim()) {
      throw new Error("No location specified");
    }
    
    console.log(`Fetching forecast for city: ${city}`);
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=15&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      
      if (errorData.error && errorData.error.code === 1006) {
        throw new Error("Location not found. Please check the spelling or try a different location.");
      }
      
      throw new Error(`Weather API error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Forecast data fetched successfully:", data);
    return transformForecastData(data);
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch forecast data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const getSprayRecommendation = (
  weatherCode: number,
  windSpeed: number,
  precipitation: number,
  humidity: number,
  temperature: number
): { recommended: boolean; reason: string } => {
  if ([1087, 1273, 1276, 1279, 1282].includes(weatherCode)) {
    return { recommended: false, reason: "Thunderstorm activity - unsafe for spraying operations" };
  }
  
  if ([1063, 1150, 1153, 1180, 1183, 1240].includes(weatherCode)) {
    return { recommended: false, reason: "Rain or drizzle conditions - spraying may be ineffective due to wash-off" };
  }
  
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(weatherCode)) {
    return { recommended: false, reason: "Snow or freezing conditions - postpone spraying until temperatures rise" };
  }
  
  if ([1030, 1135, 1147].includes(weatherCode)) {
    return { recommended: false, reason: "Foggy/misty conditions - reduced visibility and coverage issues" };
  }
  
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
  
  return { 
    recommended: true, 
    reason: "Optimal conditions for spray application - suitable temperature, humidity, and wind conditions"
  };
};

export const getWeatherIcon = (code: number) => {
  if ([1000].includes(code)) return "Sun";
  
  if ([1003].includes(code)) return "CloudSun";
  
  if ([1006, 1009].includes(code)) return "Cloud";
  
  if ([1030, 1135, 1147].includes(code)) return "Cloud";
  
  if ([1063, 1150, 1153, 1180, 1183, 1240].includes(code)) return "CloudDrizzle";
  
  if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return "CloudRain";
  
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return "CloudSnow";
  
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "CloudLightning";
  
  return "Cloud";
};

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
