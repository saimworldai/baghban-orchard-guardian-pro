
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Zap,
  Bell,
  X,
  Settings
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';

type WeatherAlert = {
  id: string;
  type: 'severe' | 'warning' | 'watch' | 'info';
  title: string;
  description: string;
  icon: React.ElementType;
  timestamp: Date;
  priority: number;
};

type WeatherAlertsProps = {
  currentWeather: WeatherData | null;
  location: { name: string; lat: number; lon: number } | null;
};

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ 
  currentWeather, 
  location 
}) => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Generate alerts based on weather conditions
  useEffect(() => {
    if (!currentWeather?.data?.[0] || !alertsEnabled) {
      setAlerts([]);
      return;
    }

    const weather = currentWeather.data[0];
    const newAlerts: WeatherAlert[] = [];

    // Temperature alerts
    if (weather.temp > 35) {
      newAlerts.push({
        id: 'high-temp',
        type: 'warning',
        title: 'Extreme Heat Warning',
        description: `Temperature ${weather.temp}°C - Avoid spraying during peak hours`,
        icon: Thermometer,
        timestamp: new Date(),
        priority: 3
      });
    } else if (weather.temp < 5) {
      newAlerts.push({
        id: 'low-temp',
        type: 'warning',
        title: 'Low Temperature Alert',
        description: `Temperature ${weather.temp}°C - Spray effectiveness may be reduced`,
        icon: Thermometer,
        timestamp: new Date(),
        priority: 2
      });
    }

    // Wind alerts
    if (weather.wind_spd > 15) {
      newAlerts.push({
        id: 'high-wind',
        type: 'severe',
        title: 'High Wind Warning',
        description: `Wind speed ${weather.wind_spd} km/h - Spraying not recommended`,
        icon: Wind,
        timestamp: new Date(),
        priority: 4
      });
    } else if (weather.wind_spd > 10) {
      newAlerts.push({
        id: 'moderate-wind',
        type: 'watch',
        title: 'Moderate Wind Advisory',
        description: `Wind speed ${weather.wind_spd} km/h - Exercise caution when spraying`,
        icon: Wind,
        timestamp: new Date(),
        priority: 2
      });
    }

    // Precipitation alerts
    if (weather.precip > 0) {
      newAlerts.push({
        id: 'precipitation',
        type: 'severe',
        title: 'Precipitation Alert',
        description: 'Active precipitation detected - Postpone spray operations',
        icon: CloudRain,
        timestamp: new Date(),
        priority: 5
      });
    }

    // Weather condition alerts
    if ([1087, 1273, 1276, 1279, 1282].includes(weather.weather.code)) {
      newAlerts.push({
        id: 'thunderstorm',
        type: 'severe',
        title: 'Thunderstorm Warning',
        description: 'Severe weather conditions - All outdoor activities unsafe',
        icon: Zap,
        timestamp: new Date(),
        priority: 5
      });
    }

    // Filter out dismissed alerts and sort by priority
    const filteredAlerts = newAlerts
      .filter(alert => !dismissedAlerts.has(alert.id))
      .sort((a, b) => b.priority - a.priority);

    setAlerts(filteredAlerts);
  }, [currentWeather, alertsEnabled, dismissedAlerts]);

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'severe': return 'border-red-500 bg-red-50 text-red-800';
      case 'warning': return 'border-orange-500 bg-orange-50 text-orange-800';
      case 'watch': return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'info': return 'border-blue-500 bg-blue-50 text-blue-800';
      default: return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'severe': return 'destructive';
      case 'warning': return 'secondary';
      case 'watch': return 'outline';
      case 'info': return 'default';
      default: return 'outline';
    }
  };

  if (!alerts.length && alertsEnabled) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-green-700">
            <Bell className="h-5 w-5" />
            <span className="font-medium">All Clear</span>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              No active weather alerts
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center text-red-800">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Weather Alerts
              {alerts.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {alerts.length}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className="text-red-600 hover:text-red-800"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AnimatePresence>
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Alert className={`${getAlertColor(alert.type)} border-l-4`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <alert.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <AlertDescription className="text-sm">
                          {alert.description}
                        </AlertDescription>
                        <div className="text-xs opacity-75 mt-1">
                          {location?.name} • {alert.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="text-current hover:bg-black/10 p-1 h-auto ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
              </motion.div>
            ))}
          </AnimatePresence>

          {!alertsEnabled && (
            <div className="text-center text-gray-500 py-4">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Weather alerts are disabled</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlertsEnabled(true)}
                className="mt-2"
              >
                Enable Alerts
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
