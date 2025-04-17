
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, CloudRain, Thermometer, CloudLightning, MapPin, ArrowUpDown, Umbrella, Clock, Droplet, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const WeatherAlerts: React.FC = () => {
  const [location, setLocation] = useState('Kashmir Orchard');
  
  // Placeholder weather data - in a real app you would fetch this from a weather API
  const weatherData = {
    location: location,
    currentTemp: 15,
    humidity: 65,
    windSpeed: 8,
    precipitation: 0,
    lastUpdated: '5 min ago',
    forecast: [
      { 
        day: 'Today', 
        icon: Sun, 
        temp: '20°C', 
        alert: null, 
        high: 22, 
        low: 14, 
        wind: '5 km/h',
        humidity: 60,
        sprayRecommendation: { 
          recommended: true, 
          reason: 'Optimal conditions for preventive fungicide application'
        }
      },
      { 
        day: 'Tomorrow', 
        icon: CloudRain, 
        temp: '12°C', 
        alert: 'Light Rain', 
        high: 15, 
        low: 10, 
        wind: '12 km/h',
        humidity: 85,
        sprayRecommendation: { 
          recommended: false, 
          reason: 'Rain forecasted - spraying ineffective due to wash-off'
        }
      },
      { 
        day: 'Day After', 
        icon: Wind, 
        temp: '8°C', 
        alert: 'Frost Warning', 
        high: 9, 
        low: 2, 
        wind: '20 km/h',
        humidity: 50,
        sprayRecommendation: { 
          recommended: false, 
          reason: 'Frost warning - postpone spraying until temperatures rise'
        }
      },
      { 
        day: 'Thursday', 
        icon: CloudLightning, 
        temp: '11°C', 
        alert: 'Thunderstorm', 
        high: 14, 
        low: 8, 
        wind: '25 km/h',
        humidity: 90,
        sprayRecommendation: { 
          recommended: false, 
          reason: 'Thunderstorm approaching - unsafe for spraying operations'
        }
      },
      { 
        day: 'Friday', 
        icon: Sun, 
        temp: '18°C', 
        alert: null, 
        high: 20, 
        low: 12, 
        wind: '8 km/h',
        humidity: 55,
        sprayRecommendation: { 
          recommended: true, 
          reason: 'Ideal conditions for spray application - low wind, no rain'
        }
      }
    ]
  };

  // Locations the user can select from
  const locations = [
    'Kashmir Orchard', 
    'Himachal Apple Farm', 
    'Uttarakhand Highlands', 
    'Kinnaur Valley'
  ];

  // Change location handler
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwLTYuNjI3LTUuMzczLTEyLTEyLTEydjZjMy4zMTQgMCA2IDIuNjg2IDYgNmg2eiIgZmlsbD0iIzAwOTRmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] bg-repeat opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4">
            Weather Alerts
          </h1>
          <p className="text-muted-foreground">
            Stay informed about weather conditions affecting your orchard with real-time updates and forecasts
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
            <select 
              value={location}
              onChange={handleLocationChange}
              className="w-full pl-10 py-2 pr-8 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/90 shadow-sm"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Card className="overflow-hidden border border-blue-200 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b border-blue-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="h-5 w-5" /> 
                <span>Current Location: {weatherData.location}</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" /> Updated {weatherData.lastUpdated}
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex items-center justify-between p-4 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-6">
                <Sun size={64} className="text-amber-500" />
                <div>
                  <p className="text-muted-foreground">Current Temperature</p>
                  <p className="text-5xl font-bold text-blue-700">{weatherData.currentTemp}°C</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <Droplet className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-lg font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="text-center">
                  <Wind className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="text-lg font-semibold">{weatherData.windSpeed} km/h</p>
                </div>
                <div className="text-center">
                  <Umbrella className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Precipitation</p>
                  <p className="text-lg font-semibold">{weatherData.precipitation}%</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-blue-800">5-Day Forecast & Spray Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-5 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <h3 className="text-lg font-semibold text-blue-700">{day.day}</h3>
                  <day.icon size={48} className="mx-auto my-3 text-blue-500" />
                  <p className="text-2xl font-bold">{day.temp}</p>
                  
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>H: {day.high}°</span>
                    <span>L: {day.low}°</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-blue-600">
                    <Wind className="h-3 w-3" />
                    <span>{day.wind}</span>
                  </div>
                  
                  {day.alert && (
                    <div className="mt-3 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-100">
                      {day.alert}
                    </div>
                  )}
                  
                  <div className={`mt-3 ${day.sprayRecommendation.recommended ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'} px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5`}>
                    {day.sprayRecommendation.recommended ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <span>
                      {day.sprayRecommendation.recommended ? 'Spray Recommended' : 'Spray Not Recommended'}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-xs text-muted-foreground">
                    {day.sprayRecommendation.reason}
                  </p>
                </div>
              ))}
            </div>
            
            <Alert className="mt-8 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-700">Spray Schedule Information</AlertTitle>
              <AlertDescription className="text-blue-600">
                Spray recommendations are based on weather conditions, disease risk factors, and optimal application timing. Always follow product-specific guidelines and safety precautions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlerts;
