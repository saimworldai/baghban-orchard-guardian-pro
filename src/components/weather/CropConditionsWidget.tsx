import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Droplets, 
  Bug, 
  Sprout,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { type WeatherData, type ForecastData } from '@/services/weatherService';

type CropConditionsWidgetProps = {
  currentWeather: WeatherData;
  forecast: ForecastData | null;
};

export const CropConditionsWidget: React.FC<CropConditionsWidgetProps> = ({ 
  currentWeather, 
  forecast 
}) => {
  const weather = currentWeather.data[0];
  
  // Calculate disease risk based on weather conditions
  const calculateDiseaseRisk = () => {
    let risk = 0;
    if (weather.rh > 80) risk += 30;
    if (weather.temp >= 20 && weather.temp <= 30) risk += 20;
    if (weather.precip > 0) risk += 25;
    if (weather.wind_spd < 5) risk += 15;
    
    if (risk >= 70) return { level: 'High', color: 'red', action: 'Monitor closely, consider preventive spray' };
    if (risk >= 40) return { level: 'Moderate', color: 'yellow', action: 'Regular monitoring recommended' };
    return { level: 'Low', color: 'green', action: 'Normal monitoring sufficient' };
  };

  // Calculate pest activity based on temperature and humidity
  const calculatePestActivity = () => {
    if (weather.temp >= 25 && weather.temp <= 35 && weather.rh >= 60) {
      return { level: 'High', color: 'red', description: 'Optimal conditions for pest reproduction' };
    }
    if (weather.temp >= 20 && weather.temp <= 30) {
      return { level: 'Moderate', color: 'yellow', description: 'Some pest activity expected' };
    }
    return { level: 'Low', color: 'green', description: 'Limited pest activity' };
  };

  // Calculate growth rate based on weather
  const calculateGrowthRate = () => {
    let score = 50;
    if (weather.temp >= 20 && weather.temp <= 30) score += 20;
    if (weather.rh >= 60 && weather.rh <= 80) score += 15;
    if (weather.precip > 0 && weather.precip < 10) score += 10;
    if (weather.wind_spd >= 5 && weather.wind_spd <= 15) score += 5;
    
    if (score >= 80) return { rate: 'Excellent', color: 'green', description: 'Optimal growing conditions' };
    if (score >= 60) return { rate: 'Good', color: 'blue', description: 'Favorable conditions' };
    if (score >= 40) return { rate: 'Fair', color: 'yellow', description: 'Adequate conditions' };
    return { rate: 'Poor', color: 'red', description: 'Challenging conditions' };
  };

  const diseaseRisk = calculateDiseaseRisk();
  const pestActivity = calculatePestActivity();
  const growthRate = calculateGrowthRate();

  const cropStages = [
    { name: 'Wheat', stage: 'Grain Filling', days: 15, status: 'good' },
    { name: 'Rice', stage: 'Tillering', days: 8, status: 'excellent' },
    { name: 'Tomato', stage: 'Flowering', days: 22, status: 'fair' },
    { name: 'Cotton', stage: 'Boll Formation', days: 18, status: 'good' }
  ];

  return (
    <div className="space-y-6">
      {/* Crop Health Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Leaf className="h-6 w-6" />
            Crop Health Monitor
            <Badge variant="outline" className="bg-green-100">
              Real-time Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Disease Risk */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border-2 ${
                diseaseRisk.color === 'red' ? 'bg-red-50 border-red-200' :
                diseaseRisk.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`h-5 w-5 ${
                  diseaseRisk.color === 'red' ? 'text-red-600' :
                  diseaseRisk.color === 'yellow' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
                <span className="font-medium">Disease Risk</span>
              </div>
              <div className={`text-xl font-bold ${
                diseaseRisk.color === 'red' ? 'text-red-700' :
                diseaseRisk.color === 'yellow' ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {diseaseRisk.level}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {diseaseRisk.action}
              </div>
            </motion.div>

            {/* Pest Activity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-lg border-2 ${
                pestActivity.color === 'red' ? 'bg-red-50 border-red-200' :
                pestActivity.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bug className={`h-5 w-5 ${
                  pestActivity.color === 'red' ? 'text-red-600' :
                  pestActivity.color === 'yellow' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
                <span className="font-medium">Pest Activity</span>
              </div>
              <div className={`text-xl font-bold ${
                pestActivity.color === 'red' ? 'text-red-700' :
                pestActivity.color === 'yellow' ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {pestActivity.level}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {pestActivity.description}
              </div>
            </motion.div>

            {/* Growth Rate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-lg border-2 ${
                growthRate.color === 'red' ? 'bg-red-50 border-red-200' :
                growthRate.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                growthRate.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`h-5 w-5 ${
                  growthRate.color === 'red' ? 'text-red-600' :
                  growthRate.color === 'yellow' ? 'text-yellow-600' :
                  growthRate.color === 'blue' ? 'text-blue-600' :
                  'text-green-600'
                }`} />
                <span className="font-medium">Growth Rate</span>
              </div>
              <div className={`text-xl font-bold ${
                growthRate.color === 'red' ? 'text-red-700' :
                growthRate.color === 'yellow' ? 'text-yellow-700' :
                growthRate.color === 'blue' ? 'text-blue-700' :
                'text-green-700'
              }`}>
                {growthRate.rate}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {growthRate.description}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Stage Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Crop Development Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cropStages.map((crop, index) => (
              <motion.div
                key={crop.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sprout className={`h-5 w-5 ${
                    crop.status === 'excellent' ? 'text-green-600' :
                    crop.status === 'good' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`} />
                  <div>
                    <div className="font-medium">{crop.name}</div>
                    <div className="text-sm text-muted-foreground">{crop.stage}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    crop.status === 'excellent' ? 'default' :
                    crop.status === 'good' ? 'secondary' :
                    'outline'
                  }>
                    {crop.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {crop.days} days in stage
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Update Stages
            </Button>
            <Button variant="outline" size="sm">
              <Droplets className="h-4 w-4 mr-2" />
              Irrigation Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};