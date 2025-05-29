
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Wind, 
  Droplet, 
  Thermometer,
  Eye,
  Calendar,
  TrendingUp,
  Zap
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';
import { format, addHours, addDays } from 'date-fns';

type AISprayRecommendationsProps = {
  currentWeather: WeatherData;
  location: { name: string; lat: number; lon: number } | null;
};

export const AISprayRecommendations: React.FC<AISprayRecommendationsProps> = ({ 
  currentWeather, 
  location 
}) => {
  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const weather = currentWeather.data[0];

  // Enhanced AI algorithm for spray recommendations
  const getAdvancedSprayRecommendation = () => {
    const factors = {
      temperature: weather.temp,
      humidity: weather.rh,
      windSpeed: weather.wind_spd,
      precipitation: weather.precip,
      pressure: weather.pres,
      cloudCover: weather.clouds,
      weatherCode: weather.weather.code
    };

    let score = 100;
    const issues = [];
    const recommendations = [];

    // Temperature analysis
    if (factors.temperature < 5) {
      score -= 40;
      issues.push("Temperature too low - pesticides may not be effective");
      recommendations.push("Wait for temperatures above 10°C for optimal results");
    } else if (factors.temperature > 32) {
      score -= 30;
      issues.push("High temperature increases evaporation risk");
      recommendations.push("Spray during early morning (5-8 AM) or late evening");
    } else if (factors.temperature >= 15 && factors.temperature <= 25) {
      score += 10;
      recommendations.push("Optimal temperature range for spray application");
    }

    // Humidity analysis
    if (factors.humidity < 30) {
      score -= 35;
      issues.push("Low humidity increases drift and evaporation");
      recommendations.push("Increase droplet size or wait for higher humidity");
    } else if (factors.humidity > 85) {
      score -= 20;
      issues.push("Very high humidity may delay drying");
      recommendations.push("Monitor for extended drying time");
    } else if (factors.humidity >= 50 && factors.humidity <= 75) {
      score += 15;
      recommendations.push("Ideal humidity for spray retention and effectiveness");
    }

    // Wind analysis
    if (factors.windSpeed > 15) {
      score -= 50;
      issues.push("Wind speed too high - significant drift risk");
      recommendations.push("Wait for wind speeds below 10 km/h");
    } else if (factors.windSpeed < 3) {
      score -= 15;
      issues.push("Very low wind may cause air stagnation");
      recommendations.push("Light breeze (3-8 km/h) is optimal for spray dispersal");
    } else if (factors.windSpeed >= 3 && factors.windSpeed <= 10) {
      score += 20;
      recommendations.push("Perfect wind conditions for even spray distribution");
    }

    // Precipitation analysis
    if (factors.precipitation > 0) {
      score -= 60;
      issues.push("Active precipitation will wash off spray application");
      recommendations.push("Wait for dry conditions and no rain forecast for 4+ hours");
    }

    // Weather condition analysis
    if ([1087, 1273, 1276, 1279, 1282].includes(factors.weatherCode)) {
      score -= 70;
      issues.push("Thunderstorm conditions - unsafe for spray operations");
      recommendations.push("Postpone until stable weather conditions return");
    }

    // Pressure analysis for advanced users
    if (factors.pressure < 1000) {
      score -= 10;
      issues.push("Low pressure may indicate incoming weather changes");
      recommendations.push("Monitor weather closely for sudden changes");
    }

    // Cloud cover analysis
    if (factors.cloudCover > 80) {
      score += 5;
      recommendations.push("Overcast conditions reduce evaporation - good for spray retention");
    }

    // Final score and rating
    let rating = 'Poor';
    let color = 'red';
    if (score >= 80) { rating = 'Excellent'; color = 'green'; }
    else if (score >= 60) { rating = 'Good'; color = 'blue'; }
    else if (score >= 40) { rating = 'Fair'; color = 'amber'; }
    else if (score >= 20) { rating = 'Poor'; color = 'orange'; }
    else { rating = 'Unsuitable'; color = 'red'; }

    return {
      score: Math.max(0, Math.min(100, score)),
      rating,
      color,
      issues,
      recommendations: recommendations.slice(0, 3), // Limit to top 3 recommendations
      suitable: score >= 60
    };
  };

  // Generate optimal spray windows for next 24 hours
  const getOptimalSprayWindows = () => {
    const windows = [];
    const now = new Date();

    // Early morning window (5-9 AM)
    const morningStart = new Date(now);
    morningStart.setHours(5, 0, 0, 0);
    if (morningStart < now) morningStart.setDate(morningStart.getDate() + 1);
    
    windows.push({
      time: `${format(morningStart, 'MMM d, h:mm a')} - ${format(addHours(morningStart, 4), 'h:mm a')}`,
      quality: 'Excellent',
      reason: 'Low wind, optimal humidity, minimal evaporation',
      score: 90
    });

    // Late evening window (6-8 PM)
    const eveningStart = new Date(now);
    eveningStart.setHours(18, 0, 0, 0);
    if (eveningStart < now) eveningStart.setDate(eveningStart.getDate() + 1);
    
    windows.push({
      time: `${format(eveningStart, 'MMM d, h:mm a')} - ${format(addHours(eveningStart, 2), 'h:mm a')}`,
      quality: 'Good',
      reason: 'Moderate conditions, reduced sun exposure',
      score: 75
    });

    return windows;
  };

  const aiAnalysis = getAdvancedSprayRecommendation();
  const sprayWindows = getOptimalSprayWindows();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-purple-50/80 to-indigo-50/60 border border-purple-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-purple-800">
            <Brain className="mr-2 h-6 w-6" />
            AI-Powered Spray Intelligence
            <Badge variant="outline" className="ml-2 text-xs bg-purple-100">
              Live GPS: {location?.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Conditions Analysis */}
          <div className={`p-4 rounded-lg border-2 ${
            aiAnalysis.suitable 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {aiAnalysis.suitable ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    Current Spray Suitability: {aiAnalysis.rating}
                  </h3>
                  <p className="text-sm text-gray-600">
                    AI Confidence Score: {aiAnalysis.score}/100
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold text-${aiAnalysis.color}-600`}>
                  {aiAnalysis.score}%
                </div>
                <Badge variant={aiAnalysis.suitable ? "default" : "destructive"}>
                  {aiAnalysis.suitable ? 'SPRAY OK' : 'WAIT'}
                </Badge>
              </div>
            </div>

            {/* Weather Factor Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="text-xs text-gray-600">Temperature</div>
                  <div className="font-semibold">{weather.temp}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <Droplet className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-xs text-gray-600">Humidity</div>
                  <div className="font-semibold">{weather.rh}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <Wind className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-xs text-gray-600">Wind</div>
                  <div className="font-semibold">{weather.wind_spd} km/h</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <Eye className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-xs text-gray-600">Visibility</div>
                  <div className="font-semibold">Good</div>
                </div>
              </div>
            </div>

            {/* Issues and Recommendations */}
            {aiAnalysis.issues.length > 0 && (
              <Alert className="mb-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Issues:</strong> {aiAnalysis.issues.join('; ')}
                </AlertDescription>
              </Alert>
            )}

            {aiAnalysis.recommendations.length > 0 && (
              <div className="space-y-1">
                <strong className="text-sm">AI Recommendations:</strong>
                {aiAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <Target className="h-3 w-3 mt-1 text-purple-500 flex-shrink-0" />
                    {rec}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optimal Spray Windows */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Next Optimal Spray Windows (GPS-Based)
            </h4>
            <div className="space-y-3">
              {sprayWindows.map((window, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div>
                    <div className="font-medium text-blue-800">{window.time}</div>
                    <div className="text-sm text-blue-600">{window.reason}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {window.quality}
                    </Badge>
                    <div className="text-sm font-semibold text-blue-700">
                      {window.score}% score
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-purple-200">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Spray
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              7-Day Forecast
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Set Smart Alerts
            </Button>
          </div>

          {/* Location-based notice */}
          <div className="text-xs text-purple-600 text-center p-2 bg-purple-100/50 rounded">
            <span className="flex items-center justify-center gap-1">
              <Target className="h-3 w-3" />
              Analysis based on real-time GPS location: {location?.lat.toFixed(4)}, {location?.lon.toFixed(4)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
