
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Wind, Droplet } from 'lucide-react';

interface HourlyForecastProps {
  hours: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    chance_of_rain: number;
  }>;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours }) => {
  return (
    <Card className="p-4 bg-white/90 border border-blue-200">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">Today's Hourly Forecast</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex gap-4 pb-4">
          {hours.map((hour, index) => {
            const time = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={index} className="inline-block text-center min-w-[100px] p-3 rounded-lg bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-sm font-medium">{time}</span>
                </div>
                <img 
                  src={`https:${hour.condition.icon}`}
                  alt={hour.condition.text}
                  className="w-12 h-12 mx-auto my-2"
                />
                <p className="text-2xl font-bold text-blue-700">{Math.round(hour.temp_c)}°C</p>
                <div className="text-xs text-gray-600 mt-2">{hour.condition.text}</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-blue-600">
                  <Wind className="h-3 w-3" />
                  <span className="text-xs">{Math.round(hour.wind_kph)} km/h</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-blue-600">
                  <Droplet className="h-3 w-3" />
                  <span className="text-xs">{hour.chance_of_rain}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default HourlyForecast;
