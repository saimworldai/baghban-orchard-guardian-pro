
import React from 'react';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Sun, 
  AlertTriangle, 
  Check,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WeatherData, getSprayRecommendation } from '@/services/weatherService';
import { format, addDays } from 'date-fns';

type WeatherAdvisoryProps = {
  weather: WeatherData | null;
  isLoading: boolean;
  onSchedule?: (date: Date) => void;
};

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ 
  weather, 
  isLoading,
  onSchedule 
}) => {
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

  // Generate a 5-day forecast for spray suitability (mock data)
  const sprayForecast = [
    { date: new Date(), suitable: recommendation.recommended, reason: recommendation.reason, time: '6:00 AM - 9:00 AM' },
    { date: addDays(new Date(), 1), suitable: true, reason: 'Low wind, no precipitation', time: '6:00 AM - 10:00 AM' },
    { date: addDays(new Date(), 2), suitable: false, reason: 'High wind speeds forecast', time: 'Not recommended' },
    { date: addDays(new Date(), 3), suitable: false, reason: 'Rain forecast', time: 'Not recommended' },
    { date: addDays(new Date(), 4), suitable: true, reason: 'Ideal conditions', time: '5:00 AM - 11:00 AM' },
  ];

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
        
        <div className="mt-6">
          <h4 className="font-medium mb-3">5-Day Spray Window Forecast</h4>
          <div className="space-y-3">
            {sprayForecast.map((day, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center p-3 rounded-md ${
                  day.suitable 
                    ? 'bg-green-50 text-green-800 border border-green-100' 
                    : 'bg-muted/10 text-muted-foreground border border-muted/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <h5 className="font-medium">{format(day.date, 'EEE, MMM d')}</h5>
                    <p className="text-sm">{day.suitable ? day.time : day.reason}</p>
                  </div>
                </div>
                {day.suitable && onSchedule && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => onSchedule(day.date)}
                  >
                    Schedule
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-muted-foreground">
          Data updated {format(new Date(), 'MMM d, h:mm a')}
        </div>
      </CardFooter>
    </Card>
  );
};
