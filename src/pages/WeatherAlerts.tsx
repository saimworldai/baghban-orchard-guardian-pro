
import React from 'react';
import { Cloud, Sun, Wind, CloudRain, Thermometer, CloudLightning, MapPin, ArrowUpDown, Umbrella, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeatherAlerts: React.FC = () => {
  // Placeholder weather data
  const weatherData = {
    location: 'Kashmir Orchard',
    currentTemp: 15,
    forecast: [
      { day: 'Today', icon: Sun, temp: '20°C', alert: null, high: 22, low: 14, wind: '5 km/h' },
      { day: 'Tomorrow', icon: CloudRain, temp: '12°C', alert: 'Light Rain', high: 15, low: 10, wind: '12 km/h' },
      { day: 'Day After', icon: Wind, temp: '8°C', alert: 'Frost Warning', high: 9, low: 2, wind: '20 km/h' },
      { day: 'Thursday', icon: CloudLightning, temp: '11°C', alert: 'Thunderstorm', high: 14, low: 8, wind: '25 km/h' },
      { day: 'Friday', icon: Sun, temp: '18°C', alert: null, high: 20, low: 12, wind: '8 km/h' }
    ]
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
        
        <Card className="overflow-hidden border border-blue-200 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b border-blue-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="h-5 w-5" /> 
                <span>Current Location: {weatherData.location}</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" /> Updated 5 min ago
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
                  <ArrowUpDown className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-lg font-semibold">65%</p>
                </div>
                <div className="text-center">
                  <Wind className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="text-lg font-semibold">8 km/h</p>
                </div>
                <div className="text-center">
                  <Umbrella className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Precipitation</p>
                  <p className="text-lg font-semibold">0%</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-blue-800">5-Day Forecast</h2>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlerts;
