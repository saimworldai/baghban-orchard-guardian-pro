import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  Cloud,
  Sun,
  Activity,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { type WeatherData, type ForecastData } from '@/services/weatherService';

type FarmWeatherDashboardProps = {
  currentWeather: WeatherData;
  forecast: ForecastData | null;
  location: { name: string; lat: number; lon: number } | null;
  lastUpdated: string;
};

export const FarmWeatherDashboard: React.FC<FarmWeatherDashboardProps> = ({ 
  currentWeather, 
  forecast,
  location,
  lastUpdated 
}) => {
  const weather = currentWeather.data[0];
  
  // Calculate heat index for farmer safety
  const calculateHeatIndex = (temp: number, humidity: number) => {
    if (temp < 27) return temp;
    const hi = -42.379 + 2.04901523 * temp + 10.14333127 * humidity 
      - 0.22475541 * temp * humidity - 0.00683783 * temp * temp
      - 0.05481717 * humidity * humidity + 0.00122874 * temp * temp * humidity
      + 0.00085282 * temp * humidity * humidity - 0.00000199 * temp * temp * humidity * humidity;
    return Math.round(hi);
  };

  const heatIndex = calculateHeatIndex(weather.temp, weather.rh);
  
  // Determine work safety level
  const getWorkSafetyLevel = () => {
    if (heatIndex > 40) return { level: 'Extreme Danger', color: 'red', icon: '🚨' };
    if (heatIndex > 32) return { level: 'Danger', color: 'orange', icon: '⚠️' };
    if (heatIndex > 27) return { level: 'Caution', color: 'yellow', icon: '⚡' };
    return { level: 'Safe', color: 'green', icon: '✅' };
  };

  const workSafety = getWorkSafetyLevel();

  const weatherCards = [
    {
      title: 'Temperature',
      value: `${weather.temp}°C`,
      subtitle: `Feels like ${weather.app_temp}°C`,
      icon: <Thermometer className="h-6 w-6" />,
      color: weather.temp > 30 ? 'text-red-500' : weather.temp < 10 ? 'text-blue-500' : 'text-orange-500',
      bg: 'from-orange-50 to-red-50'
    },
    {
      title: 'Wind Speed',
      value: `${weather.wind_spd} km/h`,
      subtitle: weather.wind_cdir_full,
      icon: <Wind className="h-6 w-6" />,
      color: weather.wind_spd > 15 ? 'text-red-500' : 'text-green-500',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Humidity',
      value: `${weather.rh}%`,
      subtitle: weather.rh > 80 ? 'Very High' : weather.rh < 40 ? 'Low' : 'Optimal',
      icon: <Droplet className="h-6 w-6" />,
      color: 'text-blue-500',
      bg: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Pressure',
      value: `${weather.pres} hPa`,
      subtitle: weather.pres > 1020 ? 'High' : weather.pres < 1000 ? 'Low' : 'Normal',
      icon: <Gauge className="h-6 w-6" />,
      color: 'text-purple-500',
      bg: 'from-purple-50 to-indigo-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Farm Weather Center</h2>
              <div className="flex items-center gap-2 text-green-100">
                <MapPin className="h-4 w-4" />
                <span>{location?.name || 'Current Location'}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Updated {lastUpdated}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{weather.temp}°C</div>
              <div className="text-green-100">{weather.weather.description}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Safety Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-4 rounded-lg border-2 ${
          workSafety.color === 'red' ? 'bg-red-50 border-red-300 text-red-800' :
          workSafety.color === 'orange' ? 'bg-orange-50 border-orange-300 text-orange-800' :
          workSafety.color === 'yellow' ? 'bg-yellow-50 border-yellow-300 text-yellow-800' :
          'bg-green-50 border-green-300 text-green-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{workSafety.icon}</span>
          <div>
            <h3 className="font-semibold">Field Work Safety: {workSafety.level}</h3>
            <p className="text-sm">Heat Index: {heatIndex}°C • Take appropriate precautions</p>
          </div>
        </div>
      </motion.div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br ${card.bg} border-0 shadow-md hover:shadow-lg transition-shadow`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={card.color}>
                    {card.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Live
                  </Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.subtitle}</div>
                  <div className="text-xs text-muted-foreground mt-1">{card.title}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Farm Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Today's Farm Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">UV Index</span>
              </div>
              <div className="text-lg font-bold text-blue-700">
                {weather.clouds < 30 ? 'High' : weather.clouds < 70 ? 'Moderate' : 'Low'}
              </div>
              <div className="text-sm text-blue-600">
                {weather.clouds < 30 ? 'Use sun protection' : 'Good for outdoor work'}
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Growing Conditions</span>
              </div>
              <div className="text-lg font-bold text-green-700">
                {weather.temp >= 15 && weather.temp <= 30 && weather.rh >= 40 ? 'Excellent' : 'Good'}
              </div>
              <div className="text-sm text-green-600">
                Temperature and humidity optimal
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">Rain Forecast</span>
              </div>
              <div className="text-lg font-bold text-purple-700">
                {weather.precip > 0 ? 'Active' : 'None'}
              </div>
              <div className="text-sm text-purple-600">
                {weather.precip > 0 ? `${weather.precip}mm detected` : 'Clear conditions'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};