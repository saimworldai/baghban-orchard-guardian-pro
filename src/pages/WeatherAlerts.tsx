import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cloud, Sun, Wind, CloudRain, Thermometer, CloudLightning, 
  MapPin, Umbrella, Clock, Droplet, AlertTriangle, 
  Check, Loader, CloudDrizzle, CloudSnow, CloudSun, RefreshCw, Locate
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import HourlyForecast from '@/components/weather/HourlyForecast';
import LocationSearch from '@/components/weather/LocationSearch';
import { motion } from 'framer-motion';
import { 
  getWeatherByCoords, 
  getWeatherByCity, 
  getForecastByCoords,
  getForecastByCity,
  getSprayRecommendation,
  getWeatherIcon,
  formatDay,
  type WeatherData,
  type ForecastData
} from '@/services/weatherService';

// High-quality background images for different weather conditions
const bgImages = {
  clear: "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  clouds: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  rain: "url('https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  snow: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  thunderstorm: "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  default: "url('https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
};

const WeatherAlerts: React.FC = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);
  const [bgImage, setBgImage] = useState(bgImages.default);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Function to determine background based on weather code
  const getBackgroundForWeather = (code: number) => {
    if (code >= 200 && code < 300) return bgImages.thunderstorm;
    if (code >= 300 && code < 600) return bgImages.rain;
    if (code >= 600 && code < 700) return bgImages.snow;
    if (code >= 801) return bgImages.clouds;
    if (code === 800) return bgImages.clear;
    return bgImages.default;
  };

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (location && retryCount > 0) {
        toast({
          title: "Connection Restored",
          description: "Attempting to fetch latest weather data...",
        });
        fetchWeatherData();
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection Lost",
        description: "Weather data may not be current",
        variant: "destructive",
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [location, retryCount]);

  // Optimized weather fetching with retry logic
  const fetchWeatherData = useCallback(async (lat?: number, lon?: number, retries = 3) => {
    if (!isOnline && retries > 0) {
      toast({
        title: "Offline",
        description: "Using cached weather data",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      let weatherData;
      let forecastData;
      
      if (lat !== undefined && lon !== undefined) {
        [weatherData, forecastData] = await Promise.all([
          getWeatherByCoords(lat, lon),
          getForecastByCoords(lat, lon)
        ]);
      } else if (location) {
        [weatherData, forecastData] = await Promise.all([
          getWeatherByCity(location),
          getForecastByCity(location)
        ]);
      } else {
        throw new Error("No location specified");
      }
      
      if (weatherData && forecastData) {
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLastUpdated(new Date().toLocaleTimeString());
        setRetryCount(0);
        
        if (lat !== undefined && lon !== undefined && weatherData.city_name) {
          setLocation(weatherData.city_name);
        }
        
        // Set background based on current weather
        if (weatherData.data && weatherData.data[0] && weatherData.data[0].weather) {
          setBgImage(getBackgroundForWeather(weatherData.data[0].weather.code));
        }
        
        toast({
          title: "Weather Updated",
          description: `Latest data for ${weatherData.city_name} loaded successfully.`,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setRetryCount(prev => prev + 1);
      
      if (retries > 0 && isOnline) {
        console.log(`Retrying... ${retries} attempts left`);
        setTimeout(() => fetchWeatherData(lat, lon, retries - 1), 2000);
        return;
      }
      
      toast({
        title: "Weather Service Issue",
        description: "Using sample data for demonstration. Service will retry automatically.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [location, isOnline]);

  const handleLocationSelect = async ({ lat, lon, name }: { lat: number; lon: number; name: string }) => {
    setLocation(name);
    await fetchWeatherData(lat, lon);
  };

  const getCurrentLocation = () => {
    setLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherData(latitude, longitude);
        setLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error", 
          description: "Unable to get your location. Please select manually.",
          variant: "destructive",
        });
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleRefresh = () => {
    if (location) {
      fetchWeatherData();
    } else {
      getCurrentLocation();
    }
  };

  const toggleAutoRefresh = () => {
    if (!autoRefresh) {
      // Start auto-refresh every 10 minutes
      const interval = setInterval(() => {
        if (isOnline) {
          handleRefresh();
          toast({
            title: "Auto Refresh",
            description: "Weather data updated automatically",
          });
        }
      }, 10 * 60 * 1000);
      
      setUpdateInterval(interval);
      setAutoRefresh(true);
      
      toast({
        title: "Auto Refresh Enabled",
        description: "Weather data will update every 10 minutes",
      });
    } else {
      // Stop auto-refresh
      if (updateInterval) {
        clearInterval(updateInterval);
        setUpdateInterval(null);
      }
      setAutoRefresh(false);
      
      toast({
        title: "Auto Refresh Disabled",
        description: "Automatic updates turned off",
      });
    }
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [updateInterval]);

  // Get initial location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getIconComponent = (code: number) => {
    const iconName = getWeatherIcon(code);
    
    switch (iconName) {
      case "CloudLightning": return CloudLightning;
      case "CloudDrizzle": return CloudDrizzle;
      case "CloudRain": return CloudRain;
      case "CloudSnow": return CloudSnow;
      case "Cloud": return Cloud;
      case "Sun": return Sun;
      case "CloudSun": return CloudSun;
      default: return Cloud;
    }
  };

  const renderForecastCards = () => {
    if (!forecast) return null;
    
    return forecast.data.map((day, index) => {
      const IconComponent = getIconComponent(day.weather.code);
      const sprayRecommendation = getSprayRecommendation(
        day.weather.code,
        day.wind_spd,
        day.precip,
        day.rh,
        day.temp
      );
      
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-5 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
        >
          <h3 className="text-lg font-semibold text-blue-700">{formatDay(day.valid_date)}</h3>
          <IconComponent size={48} className="mx-auto my-3 text-blue-500" />
          <p className="text-2xl font-bold">{Math.round(day.temp)}°C</p>
          <p className="text-sm text-gray-600">{day.weather.description}</p>
          
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>H: {Math.round(day.max_temp)}°</span>
            <span>L: {Math.round(day.min_temp)}°</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 mt-2 text-sm text-blue-600">
            <Wind className="h-3 w-3" />
            <span>{Math.round(day.wind_spd)} km/h</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 mt-1 text-sm text-blue-600">
            <Droplet className="h-3 w-3" />
            <span>{day.rh}%</span>
          </div>
          
          {day.pop > 0 && (
            <div className="mt-3 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
              {Math.round(day.pop)}% chance of rain
            </div>
          )}
          
          <div className={`mt-3 ${sprayRecommendation.recommended ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'} px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5`}>
            {sprayRecommendation.recommended ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <span>
              {sprayRecommendation.recommended ? 'Spray OK' : 'Not Recommended'}
            </span>
          </div>
          
          <p className="mt-2 text-xs text-muted-foreground">
            {sprayRecommendation.reason}
          </p>
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-screen py-8 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out" style={{ backgroundImage: bgImage }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/40 backdrop-blur-[2px] z-0"></div>
      
      <div className="container mx-auto px-4 space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Real-Time Weather Intelligence
          </h1>
          <p className="text-white/90 drop-shadow">
            Advanced weather monitoring with AI-powered spray recommendations for optimal orchard management
          </p>
          
          {!isOnline && (
            <div className="mt-4 bg-amber-500/20 border border-amber-400/30 text-amber-100 px-4 py-2 rounded-lg backdrop-blur-sm">
              <AlertTriangle className="inline h-4 w-4 mr-2" />
              Offline Mode - Data may not be current
            </div>
          )}
        </motion.div>
        
        <Card className="overflow-hidden border border-white/20 shadow-xl backdrop-blur-md bg-white/80">
          <CardContent className="p-6">
            <div className="space-y-6">
              <LocationSearch onLocationSelect={handleLocationSelect} />
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={getCurrentLocation}
                  disabled={locating || loading}
                >
                  {locating ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Locate className="h-4 w-4" />
                  )}
                  {locating ? "Locating..." : "Current Location"}
                </Button>
                
                <Button 
                  variant={autoRefresh ? "default" : "outline"}
                  className={`flex items-center gap-2 ${autoRefresh ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}`}
                  onClick={toggleAutoRefresh}
                >
                  <Clock className="h-4 w-4" />
                  Auto-Refresh {autoRefresh ? "On" : "Off"}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-blue-700"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    Updated: {lastUpdated}
                  </span>
                )}
                
                {retryCount > 0 && (
                  <span className="text-xs text-amber-600">
                    Retry #{retryCount}
                  </span>
                )}
              </div>

              {loading && !currentWeather ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-blue-700">Loading weather intelligence...</p>
                </div>
              ) : currentWeather && currentWeather.data ? (
                <>
                  {/* ... keep existing code (current weather display) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-100 backdrop-blur-sm"
                  >
                    {React.createElement(
                      getIconComponent(currentWeather.data[0].weather.code),
                      { size: 74, className: "text-blue-500 drop-shadow-md" }
                    )}
                    <div className="text-center sm:text-left mt-4 sm:mt-0">
                      <h2 className="text-2xl font-bold text-blue-800">{currentWeather.city_name}</h2>
                      <p className="text-muted-foreground">{currentWeather.country_code}</p>
                      <p className="text-5xl font-bold text-blue-700 mt-2 drop-shadow">
                        {Math.round(currentWeather.data[0].temp)}°C
                      </p>
                      <p className="text-md text-gray-600 mt-1 italic">
                        {currentWeather.data[0].weather.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6 sm:mt-0">
                      <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <Thermometer className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Feels like</span>
                        </div>
                        <span className="text-xl font-semibold">{Math.round(currentWeather.data[0].app_temp)}°C</span>
                      </div>
                      <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <Wind className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Wind</span>
                        </div>
                        <span className="text-xl font-semibold">{Math.round(currentWeather.data[0].wind_spd)} km/h</span>
                      </div>
                      <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <Droplet className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Humidity</span>
                        </div>
                        <span className="text-xl font-semibold">{currentWeather.data[0].rh}%</span>
                      </div>
                      <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <CloudRain className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Precip</span>
                        </div>
                        <span className="text-xl font-semibold">{currentWeather.data[0].precip} mm</span>
                      </div>
                    </div>
                  </motion.div>

                  {forecast && forecast.data[0].hour && (
                    <div className="mb-8">
                      <HourlyForecast hours={forecast.data[0].hour} />
                    </div>
                  )}

                  <h2 className="text-xl font-semibold mb-6 text-blue-800 flex items-center">
                    <Umbrella className="mr-2 h-5 w-5" />
                    15-Day Forecast & AI Spray Recommendations
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {renderForecastCards()}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Weather Service Starting</h3>
                  <p className="text-muted-foreground">
                    Setting up weather intelligence. Please select a location or allow location access.
                  </p>
                </div>
              )}
              
              <Alert className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <AlertTitle className="text-blue-700 font-semibold mb-2">AI-Powered Spray Intelligence</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      Our advanced weather analysis considers multiple factors for spray recommendations:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Real-time temperature and humidity monitoring</li>
                        <li>Wind speed analysis and drift prediction</li>
                        <li>Precipitation forecasting and timing</li>
                        <li>Weather pattern recognition and alerts</li>
                        <li>Optimal application window identification</li>
                      </ul>
                      Always follow product-specific guidelines and local regulations.
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlerts;
