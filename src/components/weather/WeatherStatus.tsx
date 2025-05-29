
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader } from 'lucide-react';

type WeatherStatusProps = {
  loading: boolean;
  currentWeather: any;
};

export const WeatherStatus: React.FC<WeatherStatusProps> = ({ loading, currentWeather }) => {
  if (loading && !currentWeather) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-blue-700">Loading real-time weather intelligence...</p>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Real-time Weather Starting</h3>
        <p className="text-muted-foreground">
          Setting up geolocation-based weather intelligence. Please allow location access for real-time data.
        </p>
      </div>
    );
  }

  return (
    <Alert className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-blue-600 mt-1" />
        <div>
          <AlertTitle className="text-blue-700 font-semibold mb-2">Real-time AI Weather Intelligence</AlertTitle>
          <AlertDescription className="text-blue-600">
            Our advanced real-time system uses your exact geolocation for precise recommendations:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Live GPS-based weather monitoring</li>
              <li>Real-time temperature and humidity tracking</li>
              <li>Current wind speed analysis and drift prediction</li>
              <li>Live precipitation monitoring and forecasting</li>
              <li>Automatic location-based optimal spray windows</li>
            </ul>
            Always follow product-specific guidelines and local regulations.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};
