import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  CloudRain, 
  Wind, 
  Thermometer,
  AlertTriangle,
  Download,
  Share
} from 'lucide-react';
import { getWeatherByCoords } from '@/services/weatherService';
import { SprayScheduleList } from '@/components/spray-schedule/SprayScheduleList';
import { SprayForm } from '@/components/spray-schedule/SprayForm';
import { SprayRecommendations } from '@/components/spray-schedule/SprayRecommendations';
import { WeatherAdvisory } from '@/components/spray-schedule/WeatherAdvisory';
import { useLocationState } from '@/hooks/use-location';
import LocationSearch from '@/components/weather/LocationSearch';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const SpraySchedule = () => {
  const [showSprayForm, setShowSprayForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editTaskId, setEditTaskId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('calendar');
  const { location, setLocation } = useLocationState();
  
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

  const handleEditTask = (taskId: string) => {
    setEditTaskId(taskId);
    setShowSprayForm(true);
  };

  const handleScheduleOnDay = (date: Date) => {
    setSelectedDate(date);
    setEditTaskId(undefined);
    setShowSprayForm(true);
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Your data will be synced automatically",
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Changes will be saved locally and synced when connection returns",
        variant: "destructive",
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Smart Spray Schedule
        </h1>
        <Button 
          variant="outline"
          onClick={() => setShowSprayForm(true)}
          className="bg-white hover:bg-purple-50 border-purple-200"
        >
          <Plus className="mr-2 h-4 w-4 text-purple-600" />
          Add Spray Task
        </Button>
      </div>

      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-lg flex items-center gap-3 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <h3 className="font-medium text-amber-800">Offline Mode</h3>
            <p className="text-sm text-amber-700">Changes will be saved locally and synced when you're back online</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-lg border border-purple-100">
        <h2 className="text-lg font-medium mb-4 text-gray-800">Orchard Location</h2>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white">
          <TabsTrigger value="calendar" className="data-[state=active]:bg-purple-100">Calendar</TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-purple-100">Task List</TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-100">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">
                  Tasks for {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleScheduleOnDay(selectedDate)}
                  className="bg-white hover:bg-purple-50 border-purple-200"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add for this day
                </Button>
              </div>
              <SprayScheduleList 
                date={selectedDate}
                onEditTask={handleEditTask}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">All</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Upcoming</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Completed</Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Share className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
            
            <SprayScheduleList onEditTask={handleEditTask} />
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <WeatherAdvisory 
            weather={weatherData} 
            isLoading={weatherLoading} 
            onSchedule={handleScheduleOnDay}
          />
          <SprayRecommendations weather={weatherData} />
        </TabsContent>
      </Tabs>

      {showSprayForm && (
        <SprayForm 
          selectedDate={selectedDate} 
          editTaskId={editTaskId}
          onClose={() => {
            setShowSprayForm(false);
            setEditTaskId(undefined);
          }} 
        />
      )}
    </div>
  );
};

export default SpraySchedule;
