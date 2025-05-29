
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Locate, Clock, RefreshCw } from 'lucide-react';
import LocationSearch from '@/components/weather/LocationSearch';

type WeatherControlsProps = {
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
  onGetCurrentLocation: () => void;
  onRefresh: () => void;
  onToggleAutoRefresh: () => void;
  isGettingLocation: boolean;
  loading: boolean;
  autoRefresh: boolean;
  lastUpdated: string;
  retryCount: number;
};

export const WeatherControls: React.FC<WeatherControlsProps> = ({
  onLocationSelect,
  onGetCurrentLocation,
  onRefresh,
  onToggleAutoRefresh,
  isGettingLocation,
  loading,
  autoRefresh,
  lastUpdated,
  retryCount
}) => {
  return (
    <div className="space-y-6">
      <LocationSearch onLocationSelect={onLocationSelect} />
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation || loading}
        >
          {isGettingLocation ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Locate className="h-4 w-4" />
          )}
          {isGettingLocation ? "Getting Location..." : "Current Location"}
        </Button>
        
        <Button 
          variant={autoRefresh ? "default" : "outline"}
          className={`flex items-center gap-2 ${autoRefresh ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}`}
          onClick={onToggleAutoRefresh}
        >
          <Clock className="h-4 w-4" />
          Auto-Refresh {autoRefresh ? "On" : "Off"}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-blue-700"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            Updated: {lastUpdated}
          </span>
        )}
        
        {retryCount > 0 && (
          <span className="text-xs text-amber-600">
            Retry #{retryCount}
          </span>
        )}
      </div>
    </div>
  );
};
