
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Satellite, 
  Navigation, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { useLocationState } from '@/hooks/use-location';
import { toast } from '@/components/ui/use-toast';

type LiveLocationTrackerProps = {
  onLocationUpdate: (location: { lat: number; lon: number; name: string }) => void;
  autoTrack?: boolean;
};

export const LiveLocationTracker: React.FC<LiveLocationTrackerProps> = ({ 
  onLocationUpdate,
  autoTrack = false
}) => {
  const { location, isGettingLocation, getCurrentLocation } = useLocationState();
  const [trackingEnabled, setTrackingEnabled] = useState(autoTrack);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Enhanced geolocation with continuous tracking
  const startLiveTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your device does not support GPS tracking",
        variant: "destructive"
      });
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000 // 30 seconds cache
    };

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy: posAccuracy } = position.coords;
        const newLocation = {
          lat: latitude,
          lon: longitude,
          name: `Live Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        };
        
        onLocationUpdate(newLocation);
        setLastUpdate(new Date());
        setAccuracy(posAccuracy);
        
        toast({
          title: "Location Updated",
          description: `GPS accuracy: ${posAccuracy?.toFixed(0)}m`,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({
          title: "Location Error",
          description: getGeolocationErrorMessage(error),
          variant: "destructive"
        });
      },
      options
    );

    setWatchId(id);
    setTrackingEnabled(true);
  };

  const stopLiveTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setTrackingEnabled(false);
    
    toast({
      title: "Live Tracking Stopped",
      description: "GPS tracking has been disabled"
    });
  };

  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access denied. Please enable location permissions.";
      case error.POSITION_UNAVAILABLE:
        return "Location information unavailable. Check GPS signal.";
      case error.TIMEOUT:
        return "Location request timed out. Trying again...";
      default:
        return "Unknown location error occurred.";
    }
  };

  const handleOneTimeLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      if (locationData) {
        onLocationUpdate(locationData);
        setLastUpdate(new Date());
        toast({
          title: "Location Found",
          description: "Weather data updated for your current location"
        });
      }
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get your current location",
        variant: "destructive"
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const getLocationStatus = () => {
    if (isGettingLocation) return { icon: RefreshCw, text: "Getting location...", color: "blue" };
    if (trackingEnabled) return { icon: Satellite, text: "Live tracking active", color: "green" };
    if (location) return { icon: CheckCircle, text: "Location set", color: "blue" };
    return { icon: AlertTriangle, text: "No location", color: "amber" };
  };

  const status = getLocationStatus();
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-green-50/80 to-blue-50/60 border border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-green-800">
            <Navigation className="mr-2 h-5 w-5" />
            Live GPS Location Tracker
            <Badge variant="outline" className="ml-2 text-xs">
              {trackingEnabled ? 'LIVE' : 'MANUAL'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className={`flex items-center gap-3 p-3 rounded-lg bg-${status.color}-50 border border-${status.color}-200`}>
            <StatusIcon className={`h-5 w-5 text-${status.color}-600 ${isGettingLocation || trackingEnabled ? 'animate-spin' : ''}`} />
            <div className="flex-1">
              <div className="font-medium text-gray-800">{status.text}</div>
              {location && (
                <div className="text-sm text-gray-600">
                  {location.name}
                </div>
              )}
            </div>
            {accuracy && (
              <Badge variant="outline" className="text-xs">
                ±{accuracy.toFixed(0)}m
              </Badge>
            )}
          </div>

          {/* Location Details */}
          {location && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/60 p-2 rounded">
                <div className="text-gray-600">Latitude</div>
                <div className="font-semibold">{location.lat.toFixed(6)}</div>
              </div>
              <div className="bg-white/60 p-2 rounded">
                <div className="text-gray-600">Longitude</div>
                <div className="font-semibold">{location.lon.toFixed(6)}</div>
              </div>
            </div>
          )}

          {/* Last Update */}
          {lastUpdate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleOneTimeLocation}
              disabled={isGettingLocation}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Get Location
            </Button>

            {!trackingEnabled ? (
              <Button
                onClick={startLiveTracking}
                variant="default"
                size="sm"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Satellite className="h-4 w-4" />
                Start Live Tracking
              </Button>
            ) : (
              <Button
                onClick={stopLiveTracking}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                <Zap className="h-4 w-4" />
                Stop Tracking
              </Button>
            )}
          </div>

          {/* Permission Notice */}
          {!location && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Enable location access for real-time weather monitoring based on your exact GPS coordinates.
                This provides the most accurate spray recommendations for your specific location.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
