
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Share2, 
  Download, 
  Bell, 
  Settings,
  Bookmark,
  MapPin
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type QuickActionsProps = {
  weatherData: any;
  location: { name: string } | null;
};

export const QuickActions: React.FC<QuickActionsProps> = ({ weatherData, location }) => {
  const handleShare = async () => {
    if (navigator.share && weatherData) {
      try {
        await navigator.share({
          title: 'Weather Update',
          text: `Current weather in ${location?.name || 'your location'}: ${Math.round(weatherData.data[0].temp)}°C, ${weatherData.data[0].weather.description}`,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(
          `Weather in ${location?.name || 'location'}: ${Math.round(weatherData.data[0].temp)}°C, ${weatherData.data[0].weather.description}`
        );
        toast({
          title: "Copied to clipboard",
          description: "Weather information copied to clipboard"
        });
      }
    }
  };

  const handleSaveLocation = () => {
    if (location) {
      localStorage.setItem('savedWeatherLocation', JSON.stringify(location));
      toast({
        title: "Location Saved",
        description: `${location.name} has been saved as your favorite location`
      });
    }
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Weather alerts feature coming soon!"
    });
  };

  const actions = [
    {
      icon: Share2,
      label: "Share",
      action: handleShare,
      color: "blue"
    },
    {
      icon: Bookmark,
      label: "Save Location",
      action: handleSaveLocation,
      color: "green"
    },
    {
      icon: Bell,
      label: "Alerts",
      action: handleNotifications,
      color: "amber"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <Card className="bg-white/90 border border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-blue-800">
            <Settings className="mr-2 h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className={`flex items-center gap-2 hover:bg-${action.color}-50 border-${action.color}-200`}
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
