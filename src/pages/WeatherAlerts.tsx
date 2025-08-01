
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useLocationState } from '@/hooks/use-location';
import { 
  getWeatherByCoords, 
  getForecastByCoords,
  type WeatherData,
  type ForecastData
} from '@/services/weatherService';
import { WeatherBackground } from '@/components/weather/WeatherBackground';
import { WeatherHeader } from '@/components/weather/WeatherHeader';
import { WeatherControls } from '@/components/weather/WeatherControls';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { WeatherStatus } from '@/components/weather/WeatherStatus';
import { AISprayRecommendations } from '@/components/weather/AISprayRecommendations';
import { LiveLocationTracker } from '@/components/weather/LiveLocationTracker';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { FarmWeatherDashboard } from '@/components/weather/FarmWeatherDashboard';
import { CropConditionsWidget } from '@/components/weather/CropConditionsWidget';
import { IrrigationScheduler } from '@/components/weather/IrrigationScheduler';

const WeatherAlertsPage: React.FC = () => {
  const { 
    location, 
    isGettingLocation, 
    setLocation, 
    getCurrentLocation 
  } = useLocationState();
  
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (location && retryCount > 0) {
        toast({
          title: "Connection Restored",
          description: "Fetching latest real-time weather data...",
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

  // Enhanced weather fetching with real-time geolocation integration
  const fetchWeatherData = useCallback(async (lat?: number, lon?: number, retries = 3) => {
    if (!isOnline && retries > 0) {
      toast({
        title: "Offline Mode",
        description: "Using cached weather data",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      let weatherData;
      let forecastData;
      
      // Use provided coordinates or current location
      const coords = lat !== undefined && lon !== undefined 
        ? { lat, lon } 
        : location 
        ? { lat: location.lat, lon: location.lon }
        : null;
      
      if (coords) {
        console.log(`Fetching real-time weather for coordinates: ${coords.lat}, ${coords.lon}`);
        [weatherData, forecastData] = await Promise.all([
          getWeatherByCoords(coords.lat, coords.lon),
          getForecastByCoords(coords.lat, coords.lon)
        ]);
      } else {
        throw new Error("No location available");
      }
      
      if (weatherData && forecastData) {
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLastUpdated(new Date().toLocaleTimeString());
        setRetryCount(0);
        
        // Update location name if we got coordinates
        if (lat !== undefined && lon !== undefined && weatherData.city_name) {
          setLocation({
            lat,
            lon,
            name: weatherData.city_name
          });
        }
        
        toast({
          title: "Real-time Weather Updated",
          description: `Live data for ${weatherData.city_name} loaded successfully`,
        });
      }
    } catch (error) {
      console.error("Error fetching real-time weather data:", error);
      setRetryCount(prev => prev + 1);
      
      if (retries > 0 && isOnline) {
        console.log(`Retrying real-time fetch... ${retries} attempts left`);
        setTimeout(() => fetchWeatherData(lat, lon, retries - 1), 2000);
        return;
      }
      
      toast({
        title: "Real-time Weather Unavailable",
        description: "Using demonstration data. Service will retry automatically.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [location, isOnline, setLocation]);

  const handleLocationSelect = async ({ lat, lon, name }: { lat: number; lon: number; name: string }) => {
    setLocation({ lat, lon, name });
    await fetchWeatherData(lat, lon);
  };

  const handleGetCurrentLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      if (locationData) {
        toast({
          title: "Location Found",
          description: `Getting real-time weather for your current location`,
        });
        await fetchWeatherData(locationData.lat, locationData.lon);
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      toast({
        title: "Location Error", 
        description: "Unable to get your current location. Please select manually or check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    if (location) {
      fetchWeatherData(location.lat, location.lon);
    } else {
      handleGetCurrentLocation();
    }
  };

  // Function to toggle auto-refresh
  const toggleAutoRefresh = () => {
    if (!autoRefresh) {
      // Start auto-refresh every 10 minutes
      const interval = setInterval(() => {
        if (isOnline) {
          handleRefresh();
          toast({
            title: "Auto Refresh",
            description: "Real-time weather data updated automatically",
          });
        }
      }, 10 * 60 * 1000);
      
      setUpdateInterval(interval);
      setAutoRefresh(true);
      
      toast({
        title: "Auto Refresh Enabled",
        description: "Real-time weather will update every 10 minutes",
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

  // Handle live location update with proper function signature
  const handleLiveLocationUpdate = async (locationData: { lat: number; lon: number; name: string }) => {
    await fetchWeatherData(locationData.lat, locationData.lon);
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
    handleGetCurrentLocation();
  }, []);

  const weatherCode = currentWeather?.data?.[0]?.weather?.code;

  return (
    <WeatherBackground weatherCode={weatherCode}>
      <WeatherHeader location={location} isOnline={isOnline} />
      
      <Card className="overflow-hidden border border-white/20 shadow-xl backdrop-blur-md bg-white/80">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Live Location Tracker */}
            <LiveLocationTracker 
              onLocationUpdate={handleLiveLocationUpdate}
              autoTrack={false}
            />

            <WeatherControls
              onLocationSelect={handleLocationSelect}
              onGetCurrentLocation={handleGetCurrentLocation}
              onRefresh={handleRefresh}
              onToggleAutoRefresh={toggleAutoRefresh}
              isGettingLocation={isGettingLocation}
              loading={loading}
              autoRefresh={autoRefresh}
              lastUpdated={lastUpdated}
              retryCount={retryCount}
            />

            <WeatherStatus loading={loading} currentWeather={currentWeather} />

            {/* Weather Alerts */}
            <WeatherAlerts 
              currentWeather={currentWeather}
              location={location}
            />

            {currentWeather && currentWeather.data && (
              <>
                {/* Main Farm Weather Dashboard */}
                <FarmWeatherDashboard 
                  currentWeather={currentWeather}
                  forecast={forecast}
                  location={location}
                  lastUpdated={lastUpdated}
                />

                {/* AI Spray Recommendations */}
                <AISprayRecommendations 
                  currentWeather={currentWeather}
                  location={location}
                />

                {/* Crop Conditions Widget */}
                <CropConditionsWidget 
                  currentWeather={currentWeather}
                  forecast={forecast}
                />

                {/* Irrigation Scheduler */}
                <IrrigationScheduler 
                  currentWeather={currentWeather}
                  forecast={forecast}
                />

                {/* Weekly Forecast */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {forecast?.data.slice(0, 7).map((day, index) => (
                    <ForecastCard key={index} day={day} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </WeatherBackground>
  );
};

export default WeatherAlertsPage;
