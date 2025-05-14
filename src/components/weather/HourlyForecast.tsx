
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Wind, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Card className="p-4 bg-white/90 border border-blue-200 shadow-md">
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold mb-4 text-blue-700 flex items-center"
      >
        <Clock className="mr-2 h-5 w-5" /> Today's Hourly Forecast
      </motion.h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex gap-4 pb-4">
          {hours.map((hour, index) => {
            const time = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="inline-block text-center min-w-[100px] p-3 rounded-lg bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-sm font-medium">{time}</span>
                </div>
                <div className="my-2 relative">
                  <img 
                    src={`https:${hour.condition.icon}`}
                    alt={hour.condition.text}
                    className="w-12 h-12 mx-auto"
                    loading="lazy"
                  />
                </div>
                <p className="text-2xl font-bold text-blue-700">{Math.round(hour.temp_c)}°C</p>
                <div className="text-xs text-gray-600 mt-2 line-clamp-1">{hour.condition.text}</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-blue-600">
                  <Wind className="h-3 w-3" />
                  <span className="text-xs">{Math.round(hour.wind_kph)} km/h</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-blue-600">
                  <Droplet className="h-3 w-3" />
                  <span className="text-xs">{hour.chance_of_rain}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default HourlyForecast;
