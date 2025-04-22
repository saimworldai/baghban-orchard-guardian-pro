
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

  const handleEditTask = (taskId: string) => {
    setEditTaskId(taskId);
    setShowSprayForm(true);
  };

  const handleScheduleOnDay = (date: Date) => {
    setSelectedDate(date);
    setEditTaskId(undefined);
    setShowSprayForm(true);
  };

  // Check for network status (for offline functionality demo)
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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Smart Spray Schedule</h1>
      
      {/* Network Status Indicator */}
      {!isOnline && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <h3 className="font-medium text-amber-800">Offline Mode</h3>
            <p className="text-sm text-amber-700">Changes will be saved locally and synced when you're back online</p>
          </div>
        </div>
      )}
      
      {/* Location Selector */}
      <div className="bg-card rounded-lg p-4 shadow">
        <h2 className="text-lg font-medium mb-2">Orchard Location</h2>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">Task List</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Spray Calendar</h2>
            <Button onClick={() => {
              setEditTaskId(undefined);
              setShowSprayForm(true);
            }}>
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                Tasks for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleScheduleOnDay(selectedDate)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add for this day
              </Button>
            </div>
            <SprayScheduleList 
              date={selectedDate}
              onEditTask={handleEditTask}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">All Spray Tasks</h2>
            <Button onClick={() => {
              setEditTaskId(undefined);
              setShowSprayForm(true);
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Spray Task
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">All</Badge>
              <Badge variant="outline" className="cursor-pointer">Upcoming</Badge>
              <Badge variant="outline" className="cursor-pointer">Completed</Badge>
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
          
          <Card className="p-4">
            <SprayScheduleList onEditTask={handleEditTask} />
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <h2 className="text-lg font-medium">Smart Recommendations</h2>
          
          {/* Weather Advisory */}
          <WeatherAdvisory 
            weather={weatherData} 
            isLoading={weatherLoading} 
            onSchedule={handleScheduleOnDay}
          />
          
          {/* Spray Recommendations */}
          <SprayRecommendations weather={weatherData} />
          
          {/* Analytics Summary */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            <h3 className="text-lg font-medium mb-3">Spray Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">This Month</h4>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">4 Sprays</div>
                  <div className="text-green-600 text-sm">↓ 12%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Reduced sprays compared to last month
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Chemical Usage</h4>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">2.3 kg</div>
                  <div className="text-green-600 text-sm">↓ 18%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Better targeting reduced chemical use
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Cost Savings</h4>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">₹2,400</div>
                  <div className="text-green-600 text-sm">↑ 15%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Optimized spray schedule saved costs
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Disease Control</h4>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-green-600 text-sm">↑ 7%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Improved effectiveness rate
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Spray Task Form Modal */}
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
