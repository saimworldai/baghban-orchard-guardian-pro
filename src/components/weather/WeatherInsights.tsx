
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Thermometer,
  Wind,
  Droplet
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';

type WeatherInsightsProps = {
  currentWeather: WeatherData;
};

export const WeatherInsights: React.FC<WeatherInsightsProps> = ({ currentWeather }) => {
  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const weather = currentWeather.data[0];

  const getTemperatureInsight = (temp: number, feelsLike: number) => {
    if (temp > 30) return { type: 'warning', message: 'High temperature - stay hydrated and avoid midday sun' };
    if (temp < 10) return { type: 'info', message: 'Cool weather - dress warmly for outdoor activities' };
    if (Math.abs(temp - feelsLike) > 5) return { type: 'info', message: 'Real feel differs significantly from actual temperature' };
    return { type: 'success', message: 'Comfortable temperature conditions' };
  };

  const getHumidityInsight = (humidity: number) => {
    if (humidity > 80) return { type: 'warning', message: 'Very humid - may feel uncomfortable' };
    if (humidity < 30) return { type: 'warning', message: 'Low humidity - consider moisturizing' };
    return { type: 'success', message: 'Optimal humidity levels' };
  };

  const getWindInsight = (windSpeed: number) => {
    if (windSpeed > 25) return { type: 'warning', message: 'Strong winds - secure loose objects' };
    if (windSpeed < 5) return { type: 'info', message: 'Calm conditions - perfect for outdoor activities' };
    return { type: 'success', message: 'Pleasant breeze conditions' };
  };

  const tempInsight = getTemperatureInsight(weather.temp, weather.app_temp);
  const humidityInsight = getHumidityInsight(weather.rh);
  const windInsight = getWindInsight(weather.wind_spd);

  const insights = [
    { ...tempInsight, icon: Thermometer, title: 'Temperature' },
    { ...humidityInsight, icon: Droplet, title: 'Humidity' },
    { ...windInsight, icon: Wind, title: 'Wind' }
  ];

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'success': return 'default';
      default: return 'default';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-amber-600';
      case 'success': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-blue-800">
            <Lightbulb className="mr-2 h-5 w-5" />
            Weather Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Alert variant={getAlertVariant(insight.type)} className="border-l-4">
                <div className="flex items-start gap-3">
                  <insight.icon className={`h-5 w-5 mt-0.5 ${getIconColor(insight.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{insight.title}</span>
                      <Badge variant={insight.type === 'warning' ? 'destructive' : 'secondary'} className="text-xs">
                        {insight.type === 'warning' ? 'Caution' : insight.type === 'success' ? 'Optimal' : 'Info'}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">
                      {insight.message}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
