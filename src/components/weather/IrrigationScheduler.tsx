import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Droplets, 
  Calendar, 
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Zap,
  Timer
} from 'lucide-react';
import { type WeatherData, type ForecastData } from '@/services/weatherService';
import { format, addDays } from 'date-fns';

type IrrigationSchedulerProps = {
  currentWeather: WeatherData;
  forecast: ForecastData | null;
};

export const IrrigationScheduler: React.FC<IrrigationSchedulerProps> = ({ 
  currentWeather, 
  forecast 
}) => {
  const [selectedField, setSelectedField] = useState('field1');
  const weather = currentWeather.data[0];

  // Calculate irrigation need based on weather and crop requirements
  const calculateIrrigationNeed = () => {
    let waterNeed = 0;
    
    // Base water requirement
    if (weather.temp > 30) waterNeed += 30;
    else if (weather.temp > 25) waterNeed += 20;
    else if (weather.temp > 20) waterNeed += 10;
    
    // Adjust for humidity
    if (weather.rh < 50) waterNeed += 20;
    else if (weather.rh < 70) waterNeed += 10;
    
    // Adjust for wind (increases evaporation)
    if (weather.wind_spd > 15) waterNeed += 15;
    else if (weather.wind_spd > 10) waterNeed += 10;
    
    // Reduce if recent precipitation
    if (weather.precip > 5) waterNeed -= 40;
    else if (weather.precip > 0) waterNeed -= 20;
    
    return Math.max(0, Math.min(100, waterNeed));
  };

  // Generate irrigation schedule for next 7 days
  const generateIrrigationSchedule = () => {
    const schedule = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      const forecastDay = forecast?.data[i];
      
      let needIrrigation = false;
      let reason = '';
      let priority = 'low';
      
      if (forecastDay) {
        if (forecastDay.precip < 2 && forecastDay.max_temp > 28) {
          needIrrigation = true;
          reason = 'High temperature, low precipitation';
          priority = 'high';
        } else if (forecastDay.precip < 5 && forecastDay.max_temp > 25) {
          needIrrigation = true;
          reason = 'Moderate water requirement';
          priority = 'medium';
        } else if (forecastDay.precip > 10) {
          reason = 'Natural rainfall expected';
        } else {
          reason = 'Adequate moisture levels';
        }
      } else {
        // Fallback for current day
        if (i === 0) {
          const currentNeed = calculateIrrigationNeed();
          if (currentNeed > 60) {
            needIrrigation = true;
            reason = 'High water stress conditions';
            priority = 'high';
          } else if (currentNeed > 30) {
            needIrrigation = true;
            reason = 'Moderate irrigation needed';
            priority = 'medium';
          }
        }
      }
      
      schedule.push({
        date,
        needIrrigation,
        reason,
        priority,
        recommendedTime: needIrrigation ? '5:00 AM - 7:00 AM' : null,
        waterAmount: needIrrigation ? (priority === 'high' ? '25-30mm' : '15-20mm') : null
      });
    }
    return schedule;
  };

  const irrigationNeed = calculateIrrigationNeed();
  const schedule = generateIrrigationSchedule();

  const fields = [
    { id: 'field1', name: 'North Field', crop: 'Wheat', area: '2.5 acres', lastIrrigated: '2 days ago' },
    { id: 'field2', name: 'South Field', crop: 'Rice', area: '1.8 acres', lastIrrigated: '1 day ago' },
    { id: 'field3', name: 'East Field', crop: 'Tomatoes', area: '1.2 acres', lastIrrigated: '3 days ago' },
  ];

  const selectedFieldData = fields.find(f => f.id === selectedField);

  return (
    <div className="space-y-6">
      {/* Current Irrigation Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Droplets className="h-6 w-6" />
            Smart Irrigation System
            <Badge variant="outline" className="bg-blue-100">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Field Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {fields.map((field) => (
              <motion.div
                key={field.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedField === field.id 
                    ? 'border-blue-300 bg-blue-100' 
                    : 'border-gray-200 bg-white hover:border-blue-200'
                }`}
                onClick={() => setSelectedField(field.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{field.name}</div>
                <div className="text-sm text-muted-foreground">{field.crop} • {field.area}</div>
                <div className="text-xs text-blue-600 mt-1">Last: {field.lastIrrigated}</div>
              </motion.div>
            ))}
          </div>

          {/* Current Status */}
          <div className={`p-4 rounded-lg border-2 ${
            irrigationNeed > 70 ? 'bg-red-50 border-red-200' :
            irrigationNeed > 40 ? 'bg-yellow-50 border-yellow-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {irrigationNeed > 70 ? (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                ) : irrigationNeed > 40 ? (
                  <Clock className="h-6 w-6 text-yellow-600" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedFieldData?.name} Irrigation Status
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Current water stress level: {irrigationNeed}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={
                  irrigationNeed > 70 ? "destructive" :
                  irrigationNeed > 40 ? "default" :
                  "secondary"
                }>
                  {irrigationNeed > 70 ? 'URGENT' : 
                   irrigationNeed > 40 ? 'NEEDED' : 'OPTIMAL'}
                </Badge>
              </div>
            </div>

            {irrigationNeed > 40 && (
              <Alert className="mb-3">
                <Droplets className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recommendation:</strong> Irrigate {selectedFieldData?.name} within the next 24 hours. 
                  Apply 20-25mm during early morning hours for optimal water uptake.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{weather.temp}°C</div>
                <div className="text-xs text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{weather.rh}%</div>
                <div className="text-xs text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{weather.wind_spd}</div>
                <div className="text-xs text-muted-foreground">Wind km/h</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{weather.precip}</div>
                <div className="text-xs text-muted-foreground">Rain mm</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Irrigation Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            7-Day Irrigation Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  day.needIrrigation 
                    ? day.priority === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-yellow-50 border-yellow-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    day.needIrrigation 
                      ? day.priority === 'high' 
                        ? 'bg-red-100' 
                        : 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}>
                    {day.needIrrigation ? (
                      <Droplets className={`h-4 w-4 ${
                        day.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {format(day.date, 'EEE, MMM d')}
                      {index === 0 && <Badge variant="outline" className="ml-2 text-xs">Today</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">{day.reason}</div>
                    {day.recommendedTime && (
                      <div className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                        <Timer className="h-3 w-3" />
                        {day.recommendedTime}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {day.needIrrigation ? (
                    <div>
                      <Badge variant={day.priority === 'high' ? "destructive" : "default"}>
                        Irrigate
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {day.waterAmount}
                      </div>
                    </div>
                  ) : (
                    <Badge variant="secondary">
                      Skip
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Auto Schedule
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Manual Override
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Usage History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};