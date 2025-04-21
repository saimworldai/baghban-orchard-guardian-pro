
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  CloudRain, 
  Wind, 
  Thermometer,
  AlertTriangle
} from 'lucide-react';
import { getWeatherByCoords } from '@/services/weatherService';
import { SprayScheduleList } from '@/components/spray-schedule/SprayScheduleList';
import { SprayForm } from '@/components/spray-schedule/SprayForm';
import { SprayRecommendations } from '@/components/spray-schedule/SprayRecommendations';
import { WeatherAdvisory } from '@/components/spray-schedule/WeatherAdvisory';
import { useLocationState } from '@/hooks/use-location';
import LocationSearch from '@/components/weather/LocationSearch';
import { format } from 'date-fns';

const SpraySchedule = () => {
  const [showSprayForm, setShowSprayForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { location, setLocation } = useLocationState();
  
  // Fetch current weather data for spray recommendations
  const { data: weatherData, isLoading: weatherLoading } = useQuery({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => location ? getWeatherByCoords(location.lat, location.lon) : null,
    enabled: !!location,
  });

  const handleLocationSelect = (selectedLocation: { lat: number; lon: number; name: string }) => {
    setLocation(selectedLocation);
    toast({
      title: "Location Updated",
      description: `Weather data loaded for ${selectedLocation.name}`,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Smart Spray Schedule</h1>
      
      {/* Location Selector */}
      <div className="bg-card rounded-lg p-4 shadow">
        <h2 className="text-lg font-medium mb-2">Orchard Location</h2>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </div>
      
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">Task List</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Spray Calendar</h2>
            <Button onClick={() => setShowSprayForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Spray Task
            </Button>
          </div>
          
          <div className="bg-card p-4 rounded-lg shadow">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </div>
          
          <div className="bg-card p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">
              Tasks for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <SprayScheduleList date={selectedDate} />
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">All Spray Tasks</h2>
            <Button onClick={() => setShowSprayForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Spray Task
            </Button>
          </div>
          <SprayScheduleList />
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <h2 className="text-lg font-medium">Smart Recommendations</h2>
          
          {/* Weather Advisory */}
          <WeatherAdvisory weather={weatherData} isLoading={weatherLoading} />
          
          {/* Spray Recommendations */}
          <SprayRecommendations weather={weatherData} />
        </TabsContent>
      </Tabs>
      
      {/* Spray Task Form Modal */}
      {showSprayForm && (
        <SprayForm 
          selectedDate={selectedDate} 
          onClose={() => setShowSprayForm(false)} 
        />
      )}
    </div>
  );
};

export default SpraySchedule;
