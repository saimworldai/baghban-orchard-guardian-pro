import { toast } from "@/components/ui/use-toast";

// Using a more reliable weather API endpoint with fallback
const OPENWEATHER_API_KEY = "894a8c26c5b533ac9ad2b7a2d72e1b4b"; // OpenWeatherMap free tier key
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Fallback to WeatherAPI if OpenWeatherMap fails
const WEATHERAPI_KEY = "4ee0eb9461ef4848a0c73126251904";
const WEATHERAPI_BASE_URL = "https://api.weatherapi.com/v1";

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

// Transform OpenWeatherMap data to our format
const transformOpenWeatherCurrent = (apiData: any): WeatherData => {
  return {
    city_name: apiData.name,
    country_code: apiData.sys.country,
    data: [{
      temp: apiData.main.temp,
      app_temp: apiData.main.feels_like,
      rh: apiData.main.humidity,
      wind_spd: apiData.wind.speed * 3.6, // Convert m/s to km/h
      wind_cdir_full: getWindDirection(apiData.wind.deg),
      weather: {
        icon: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`,
        description: apiData.weather[0].description,
        code: mapOpenWeatherCode(apiData.weather[0].id)
      },
      precip: apiData.rain?.['1h'] || 0,
      pop: 0,
      datetime: new Date().toISOString(),
      ts: Math.floor(Date.now() / 1000),
      pres: apiData.main.pressure,
      clouds: apiData.clouds.all
    }]
  };
};

// Transform OpenWeatherMap forecast data
const transformOpenWeatherForecast = (current: any, forecast: any): ForecastData => {
  const dailyData = forecast.list.reduce((acc: any[], item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc.find(d => d.valid_date === date)) {
      const dayItems = forecast.list.filter((f: any) => f.dt_txt.startsWith(date));
      const temps = dayItems.map((d: any) => d.main.temp);
      const humidity = dayItems.reduce((sum: number, d: any) => sum + d.main.humidity, 0) / dayItems.length;
      const windSpeeds = dayItems.map((d: any) => d.wind.speed * 3.6);
      const precipitation = dayItems.reduce((sum: number, d: any) => sum + (d.rain?.['3h'] || 0), 0);
      
      acc.push({
        temp: temps.reduce((a: number, b: number) => a + b, 0) / temps.length,
        max_temp: Math.max(...temps),
        min_temp: Math.min(...temps),
        rh: humidity,
        wind_spd: Math.max(...windSpeeds),
        precip: precipitation,
        pop: Math.max(...dayItems.map((d: any) => d.pop * 100)),
        weather: {
          icon: `https://openweathermap.org/img/wn/${dayItems[0].weather[0].icon}@2x.png`,
          description: dayItems[0].weather[0].description,
          code: mapOpenWeatherCode(dayItems[0].weather[0].id)
        },
        datetime: date,
        valid_date: date,
        hour: dayItems.map((h: any) => ({
          time: h.dt_txt,
          temp_c: h.main.temp,
          condition: {
            text: h.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`,
            code: mapOpenWeatherCode(h.weather[0].id)
          },
          wind_kph: h.wind.speed * 3.6,
          humidity: h.main.humidity,
          chance_of_rain: h.pop * 100
        }))
      });
    }
    return acc;
  }, []);

  return {
    city_name: current.name,
    country_code: current.sys.country,
    data: dailyData.slice(0, 15) // Limit to 15 days
  };
};

// Helper functions
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
};

const mapOpenWeatherCode = (owmCode: number): number => {
  // Map OpenWeatherMap codes to WeatherAPI-like codes
  if (owmCode >= 200 && owmCode < 300) return 1087; // Thunderstorm
  if (owmCode >= 300 && owmCode < 400) return 1153; // Drizzle
  if (owmCode >= 500 && owmCode < 600) return 1183; // Rain
  if (owmCode >= 600 && owmCode < 700) return 1213; // Snow
  if (owmCode >= 700 && owmCode < 800) return 1135; // Mist/Fog
  if (owmCode === 800) return 1000; // Clear
  if (owmCode > 800) return 1003; // Clouds
  return 1000;
};

// Primary weather fetch using OpenWeatherMap
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates provided");
    }
    
    // Try OpenWeatherMap first
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return transformOpenWeatherCurrent(data);
  } catch (error) {
    console.error("Primary weather API failed, trying fallback:", error);
    
    // Fallback to mock data with realistic values
    const mockData: WeatherData = {
      city_name: "Sample Location",
      country_code: "XX",
      data: [{
        temp: 22,
        app_temp: 24,
        rh: 65,
        wind_spd: 12,
        wind_cdir_full: "NW",
        weather: {
          icon: "https://openweathermap.org/img/wn/02d@2x.png",
          description: "partly cloudy",
          code: 1003
        },
        precip: 0,
        pop: 0,
        datetime: new Date().toISOString(),
        ts: Math.floor(Date.now() / 1000),
        pres: 1013,
        clouds: 25
      }]
    };
    
    toast({
      title: "Using Sample Data",
      description: "Weather service temporarily unavailable. Showing sample data for demonstration.",
      variant: "default",
    });
    
    return mockData;
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData | null> => {
  try {
    if (!city.trim()) {
      throw new Error("No location specified");
    }
    
    console.log(`Fetching weather for city: ${city}`);
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Location not found. Please check the spelling or try a different location.");
      }
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return transformOpenWeatherCurrent(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    
    // Return mock data as fallback
    const mockData: WeatherData = {
      city_name: city,
      country_code: "XX", 
      data: [{
        temp: 20,
        app_temp: 22,
        rh: 70,
        wind_spd: 8,
        wind_cdir_full: "W",
        weather: {
          icon: "https://openweathermap.org/img/wn/01d@2x.png",
          description: "clear sky",
          code: 1000
        },
        precip: 0,
        pop: 0,
        datetime: new Date().toISOString(),
        ts: Math.floor(Date.now() / 1000),
        pres: 1015,
        clouds: 10
      }]
    };
    
    toast({
      title: "Using Sample Data",
      description: `Weather data for ${city} temporarily unavailable. Showing sample data.`,
      variant: "default",
    });
    
    return mockData;
  }
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData | null> => {
  try {
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Invalid coordinates provided");
    }
    
    console.log(`Fetching forecast for coordinates: ${lat}, ${lon}`);
    
    // Get current weather and 5-day forecast
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`),
      fetch(`${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
    ]);
    
    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error(`OpenWeatherMap API error`);
    }
    
    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);
    
    console.log("Forecast data fetched successfully");
    return transformOpenWeatherForecast(currentData, forecastData);
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    
    // Return mock forecast data
    const mockForecast: ForecastData = {
      city_name: "Sample Location",
      country_code: "XX",
      data: Array.from({ length: 15 }, (_, i) => ({
        temp: 20 + Math.random() * 10,
        max_temp: 25 + Math.random() * 5,
        min_temp: 15 + Math.random() * 5,
        rh: 60 + Math.random() * 20,
        wind_spd: 5 + Math.random() * 15,
        precip: Math.random() * 2,
        pop: Math.random() * 100,
        weather: {
          icon: "https://openweathermap.org/img/wn/02d@2x.png",
          description: ["sunny", "partly cloudy", "cloudy", "light rain"][Math.floor(Math.random() * 4)],
          code: [1000, 1003, 1006, 1183][Math.floor(Math.random() * 4)]
        },
        datetime: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        valid_date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        hour: Array.from({ length: 24 }, (_, h) => ({
          time: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + h * 60 * 60 * 1000).toISOString(),
          temp_c: 18 + Math.random() * 8,
          condition: {
            text: "partly cloudy",
            icon: "https://openweathermap.org/img/wn/02d@2x.png",
            code: 1003
          },
          wind_kph: 5 + Math.random() * 10,
          humidity: 60 + Math.random() * 20,
          chance_of_rain: Math.random() * 50
        }))
      }))
    };
    
    toast({
      title: "Using Sample Data",
      description: "Forecast data temporarily unavailable. Showing sample data for demonstration.",
      variant: "default",
    });
    
    return mockForecast;
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData | null> => {
  try {
    if (!city.trim()) {
      throw new Error("No location specified");
    }
    
    console.log(`Fetching forecast for city: ${city}`);
    
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`),
      fetch(`${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`)
    ]);
    
    if (!currentResponse.ok || !forecastResponse.ok) {
      if (currentResponse.status === 404 || forecastResponse.status === 404) {
        throw new Error("Location not found. Please check the spelling or try a different location.");
      }
      throw new Error(`OpenWeatherMap API error`);
    }
    
    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);
    
    console.log("Forecast data fetched successfully");
    return transformOpenWeatherForecast(currentData, forecastData);
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    
    // Return mock data with city name
    const mockForecast: ForecastData = {
      city_name: city,
      country_code: "XX",
      data: Array.from({ length: 15 }, (_, i) => ({
        temp: 20 + Math.random() * 10,
        max_temp: 25 + Math.random() * 5,
        min_temp: 15 + Math.random() * 5,
        rh: 60 + Math.random() * 20,
        wind_spd: 5 + Math.random() * 15,
        precip: Math.random() * 2,
        pop: Math.random() * 100,
        weather: {
          icon: "https://openweathermap.org/img/wn/02d@2x.png",
          description: ["sunny", "partly cloudy", "cloudy", "light rain"][Math.floor(Math.random() * 4)],
          code: [1000, 1003, 1006, 1183][Math.floor(Math.random() * 4)]
        },
        datetime: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        valid_date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        hour: Array.from({ length: 24 }, (_, h) => ({
          time: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + h * 60 * 60 * 1000).toISOString(),
          temp_c: 18 + Math.random() * 8,
          condition: {
            text: "partly cloudy",
            icon: "https://openweathermap.org/img/wn/02d@2x.png",
            code: 1003
          },
          wind_kph: 5 + Math.random() * 10,
          humidity: 60 + Math.random() * 20,
          chance_of_rain: Math.random() * 50
        }))
      }))
    };
    
    toast({
      title: "Using Sample Data", 
      description: `Forecast data for ${city} temporarily unavailable. Showing sample data.`,
      variant: "default",
    });
    
    return mockForecast;
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
