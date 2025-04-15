
import React from 'react';
import { Cloud, Sun, Wind, CloudRain, Thermometer } from 'lucide-react';

const WeatherAlerts: React.FC = () => {
  // Placeholder weather data
  const weatherData = {
    location: 'Kashmir Orchard',
    currentTemp: 15,
    forecast: [
      { day: 'Today', icon: Sun, temp: '20°C', alert: null },
      { day: 'Tomorrow', icon: CloudRain, temp: '12°C', alert: 'Light Rain' },
      { day: 'Day After', icon: Wind, temp: '8°C', alert: 'Frost Warning' }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Alerts</h1>
      
      <div className="bg-secondary/10 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Thermometer className="mr-2" /> 
          Current Location: {weatherData.location}
        </h2>
        <p className="text-3xl font-bold">{weatherData.currentTemp}°C</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weatherData.forecast.map((day, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{day.day}</h3>
            <day.icon size={48} className="mx-auto my-2 text-primary" />
            <p className="text-xl">{day.temp}</p>
            {day.alert && (
              <div className="mt-2 bg-red-100 text-red-600 px-2 py-1 rounded">
                {day.alert}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
