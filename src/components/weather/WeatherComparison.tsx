
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Thermometer, Droplets, Wind } from "lucide-react";
import { type WeatherData } from '@/services/weatherService';

export interface WeatherComparisonProps {
  currentWeather: WeatherData | null;
  location: {
    lat: number;
    lon: number;
    name: string;
    timestamp?: number;
    accuracy?: number;
  } | null;
}

export function WeatherComparison({ currentWeather, location }: WeatherComparisonProps) {
  // Early return if no weather data
  if (!currentWeather?.data?.[0] || !location) {
    return null;
  }

  const weather = currentWeather.data[0];

  const getConditionColor = (condition?: string) => {
    if (!condition) return 'bg-gray-100 text-gray-800';
    
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'bg-yellow-100 text-yellow-800';
      case 'cloudy':
      case 'overcast':
        return 'bg-gray-100 text-gray-800';
      case 'rainy':
      case 'rain':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Current Weather - {location.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="font-semibold">{Math.round(weather.temp)}°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold">{weather.rh}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="font-semibold">{Math.round(weather.wind_spd)} km/h</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Condition</p>
            <Badge className={getConditionColor(weather.weather?.description)}>
              {weather.weather?.description || 'Unknown'}
            </Badge>
          </div>
        </div>
        
        {(weather.uv || weather.vis || weather.pres) && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            {weather.uv && (
              <div>
                <p className="text-sm text-gray-600">UV Index</p>
                <p className="font-semibold">{weather.uv}</p>
              </div>
            )}
            {weather.vis && (
              <div>
                <p className="text-sm text-gray-600">Visibility</p>
                <p className="font-semibold">{weather.vis} km</p>
              </div>
            )}
            {weather.pres && (
              <div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="font-semibold">{weather.pres} hPa</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
