
import React from 'react';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Sun, 
  AlertTriangle, 
  Check
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WeatherData, getSprayRecommendation } from '@/services/weatherService';

type WeatherAdvisoryProps = {
  weather: WeatherData | null;
  isLoading: boolean;
};

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weather Advisory</CardTitle>
          <CardDescription>
            Analyzing current weather conditions...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-6">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weather Advisory</CardTitle>
          <CardDescription>
            Select a location to view spray recommendations
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const currentWeather = weather.data[0];
  const recommendation = getSprayRecommendation(
    currentWeather.weather.code,
    currentWeather.wind_spd,
    currentWeather.precip,
    currentWeather.rh,
    currentWeather.temp
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weather Advisory for {weather.city_name}</CardTitle>
        <CardDescription>
          Based on current weather conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-md">
            <Thermometer className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm text-muted-foreground">Temperature</span>
            <span className="font-medium">{currentWeather.temp}°C</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-md">
            <Wind className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm text-muted-foreground">Wind</span>
            <span className="font-medium">{currentWeather.wind_spd} km/h</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-md">
            <CloudRain className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm text-muted-foreground">Precipitation</span>
            <span className="font-medium">{currentWeather.precip} mm</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-md">
            <Sun className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="font-medium">{currentWeather.rh}%</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-md flex items-start gap-3 ${
          recommendation.recommended ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
        }`}>
          {recommendation.recommended ? (
            <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <h4 className="font-medium mb-1">
              {recommendation.recommended ? 'Spraying Recommended' : 'Not Ideal for Spraying'}
            </h4>
            <p className="text-sm">{recommendation.reason}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
