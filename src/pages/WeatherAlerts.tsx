
import React, { useState, useEffect } from 'react';
import { 
  Cloud, Sun, Wind, CloudRain, Thermometer, CloudLightning, 
  MapPin, ArrowUpDown, Umbrella, Clock, Droplet, AlertTriangle, 
  Check, Loader, CloudDrizzle, CloudSnow, CloudSun, RefreshCw, Locate
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
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

const WeatherAlerts: React.FC = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Locations the user can select from
  const locations = [
    'Kashmir Orchard', 
    'Himachal Apple Farm', 
    'Uttarakhand Highlands', 
    'Kinnaur Valley'
  ];

  // Function to get user's current location
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
        fetchWeatherData(latitude, longitude);
        setLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error",
          description: "Unable to get your current location. Please try selecting a location manually.",
          variant: "destructive",
        });
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Fetch weather data based on coordinates or city
  const fetchWeatherData = async (lat?: number, lon?: number) => {
    setLoading(true);
    try {
      let weatherData;
      let forecastData;
      
      if (lat !== undefined && lon !== undefined) {
        // Fetch by coordinates
        weatherData = await getWeatherByCoords(lat, lon);
        forecastData = await getForecastByCoords(lat, lon);
      } else if (location) {
        // Fetch by city name
        weatherData = await getWeatherByCity(location);
        forecastData = await getForecastByCity(location);
      } else {
        throw new Error("No location specified");
      }
      
      if (weatherData && forecastData) {
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLastUpdated(new Date().toLocaleTimeString());
        
        // If fetched by coordinates, update the location state
        if (lat !== undefined && lon !== undefined) {
          setLocation(weatherData.city_name);
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Change location handler
  const handleLocationChange = (value: string) => {
    setLocation(value);
    fetchWeatherData();
  };

  // Refresh weather data
  const handleRefresh = () => {
    if (location) {
      fetchWeatherData();
    } else {
      getCurrentLocation();
    }
  };

  // Get icon component based on weather code
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

  // Load initial data
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Create weather forecast cards
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
        <div 
          key={index} 
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
              {day.pop}% chance of rain
            </div>
          )}
          
          <div className={`mt-3 ${sprayRecommendation.recommended ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'} px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5`}>
            {sprayRecommendation.recommended ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <span>
              {sprayRecommendation.recommended ? 'Spray Recommended' : 'Spray Not Recommended'}
            </span>
          </div>
          
          <p className="mt-2 text-xs text-muted-foreground">
            {sprayRecommendation.reason}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwLTYuNjI3LTUuMzczLTEyLTEyLTEydjZjMy4zMTQgMCA2IDIuNjg2IDYgNmg2eiIgZmlsbD0iIzAwOTRmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] bg-repeat opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4">
            Weather Alerts
          </h1>
          <p className="text-muted-foreground">
            Stay informed about weather conditions affecting your orchard with real-time updates and forecasts
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={getCurrentLocation}
            disabled={locating}
          >
            {locating ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Locate className="h-4 w-4" />
            )}
            {locating ? "Getting Location..." : "Use Current Location"}
          </Button>
          
          <div className="relative w-full max-w-md">
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-full pl-10">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-700"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <Card className="overflow-hidden border border-blue-200 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b border-blue-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="h-5 w-5" /> 
                <span>
                  {currentWeather ? currentWeather.city_name : "Loading location..."}
                  {currentWeather?.country_code && `, ${currentWeather.country_code}`}
                </span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" /> 
                {lastUpdated ? `Updated ${lastUpdated}` : "Updating..."}
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {loading && !currentWeather ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                <p className="text-blue-700">Loading weather data...</p>
              </div>
            ) : currentWeather && currentWeather.data ? (
              <>
                <div className="flex items-center justify-between p-4 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-6">
                    {React.createElement(
                      getIconComponent(currentWeather.data[0].weather.code),
                      { size: 64, className: "text-blue-500" }
                    )}
                    <div>
                      <p className="text-muted-foreground">Current Temperature</p>
                      <p className="text-5xl font-bold text-blue-700">
                        {Math.round(currentWeather.data[0].temp)}°C
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {currentWeather.data[0].weather.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <Droplet className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="text-lg font-semibold">{currentWeather.data[0].rh}%</p>
                    </div>
                    <div className="text-center">
                      <Wind className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-muted-foreground">Wind</p>
                      <p className="text-lg font-semibold">{Math.round(currentWeather.data[0].wind_spd)} km/h</p>
                    </div>
                    <div className="text-center">
                      <Umbrella className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-muted-foreground">Precipitation</p>
                      <p className="text-lg font-semibold">{currentWeather.data[0].precip} mm</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-blue-800">5-Day Forecast & Spray Schedule</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {renderForecastCards()}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Weather Data Available</h3>
                <p className="text-muted-foreground">
                  Please select a location or enable location services to view weather data.
                </p>
              </div>
            )}
            
            <Alert className="mt-8 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-700">Spray Schedule Information</AlertTitle>
              <AlertDescription className="text-blue-600">
                Spray recommendations are based on weather conditions, disease risk factors, and optimal application timing. Always follow product-specific guidelines and safety precautions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlerts;
