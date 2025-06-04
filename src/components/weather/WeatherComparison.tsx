
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplet, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Search,
  X
} from 'lucide-react';

type WeatherData = {
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
    pres: number;
    clouds: number;
  }>;
};

type WeatherComparisonProps = {
  currentWeather: WeatherData;
};

export const WeatherComparison: React.FC<WeatherComparisonProps> = ({ currentWeather }) => {
  const [comparisonCity, setComparisonCity] = useState('');
  const [comparisonWeather, setComparisonWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock comparison data - in real app, this would fetch from weather API
  const mockComparisonData: WeatherData = {
    city_name: comparisonCity || 'Toronto',
    country_code: 'CA',
    data: [{
      temp: 18,
      app_temp: 20,
      rh: 72,
      wind_spd: 15,
      wind_cdir_full: 'Northwest',
      weather: {
        icon: '02d',
        description: 'Few clouds',
        code: 801
      },
      precip: 0.2,
      pres: 1015,
      clouds: 25
    }]
  };

  const handleSearch = async () => {
    if (!comparisonCity.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setComparisonWeather(mockComparisonData);
      setLoading(false);
    }, 1000);
  };

  const clearComparison = () => {
    setComparisonWeather(null);
    setComparisonCity('');
  };

  const getComparisonIcon = (value1: number, value2: number) => {
    if (value1 > value2) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (value1 < value2) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getComparisonColor = (value1: number, value2: number, reverse = false) => {
    const isHigher = value1 > value2;
    if (reverse) {
      return isHigher ? 'text-red-600' : 'text-green-600';
    }
    return isHigher ? 'text-green-600' : 'text-red-600';
  };

  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const current = currentWeather.data[0];
  const comparison = comparisonWeather?.data[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-purple-800 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Weather Comparison
            </span>
            {comparisonWeather && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearComparison}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!comparisonWeather ? (
            <div className="space-y-4">
              <p className="text-purple-700 text-sm">
                Compare current weather conditions with another location
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter city name (e.g., Toronto, London)"
                  value={comparisonCity}
                  onChange={(e) => setComparisonCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={loading || !comparisonCity.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Location Headers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <h3 className="font-semibold text-purple-800">{currentWeather.city_name}</h3>
                  <p className="text-sm text-purple-600">{currentWeather.country_code}</p>
                  <Badge className="mt-1 bg-purple-100 text-purple-800">Current Location</Badge>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-purple-800">{comparisonWeather.city_name}</h3>
                  <p className="text-sm text-purple-600">{comparisonWeather.country_code}</p>
                  <Badge className="mt-1 bg-pink-100 text-pink-800">Comparison</Badge>
                </div>
              </div>

              {/* Weather Metrics Comparison */}
              <div className="space-y-4">
                {/* Temperature */}
                <div className="grid grid-cols-3 gap-4 items-center p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <div className="text-center">
                    <span className={`text-lg font-bold ${getComparisonColor(current.temp, comparison!.temp)}`}>
                      {Math.round(current.temp)}°C
                    </span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <span className={`text-lg font-bold ${getComparisonColor(comparison!.temp, current.temp)}`}>
                      {Math.round(comparison!.temp)}°C
                    </span>
                    {getComparisonIcon(current.temp, comparison!.temp)}
                  </div>
                </div>

                {/* Wind Speed */}
                <div className="grid grid-cols-3 gap-4 items-center p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Wind Speed</span>
                  </div>
                  <div className="text-center">
                    <span className={`text-lg font-bold ${getComparisonColor(current.wind_spd, comparison!.wind_spd, true)}`}>
                      {Math.round(current.wind_spd)} km/h
                    </span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <span className={`text-lg font-bold ${getComparisonColor(comparison!.wind_spd, current.wind_spd, true)}`}>
                      {Math.round(comparison!.wind_spd)} km/h
                    </span>
                    {getComparisonIcon(current.wind_spd, comparison!.wind_spd)}
                  </div>
                </div>

                {/* Humidity */}
                <div className="grid grid-cols-3 gap-4 items-center p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Humidity</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-purple-700">
                      {current.rh}%
                    </span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-purple-700">
                      {comparison!.rh}%
                    </span>
                    {getComparisonIcon(current.rh, comparison!.rh)}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3 bg-purple-100 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Comparison Summary</h4>
                <p className="text-sm text-purple-700">
                  {currentWeather.city_name} is{' '}
                  {current.temp > comparison!.temp ? 'warmer' : current.temp < comparison!.temp ? 'cooler' : 'the same temperature'} as{' '}
                  {comparisonWeather.city_name} by {Math.abs(current.temp - comparison!.temp).toFixed(1)}°C.
                  Wind conditions are {current.wind_spd > comparison!.wind_spd ? 'windier' : 'calmer'} with a difference of{' '}
                  {Math.abs(current.wind_spd - comparison!.wind_spd).toFixed(1)} km/h.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
