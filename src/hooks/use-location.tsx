
import { create } from 'zustand';

type Location = {
  lat: number;
  lon: number;
  name: string;
  timestamp?: number;
  accuracy?: number;
} | null;

type LocationState = {
  location: Location;
  isGettingLocation: boolean;
  lastUpdated: number | null;
  setLocation: (location: Location) => void;
  setIsGettingLocation: (loading: boolean) => void;
  getCurrentLocation: () => Promise<{ lat: number; lon: number; name: string } | null>;
};

export const useLocationState = create<LocationState>((set, get) => ({
  location: null,
  isGettingLocation: false,
  lastUpdated: null,
  setLocation: (location) => set({ 
    location: location ? { ...location, timestamp: Date.now() } : null,
    lastUpdated: Date.now()
  }),
  setIsGettingLocation: (loading) => set({ isGettingLocation: loading }),
  getCurrentLocation: async () => {
    const { setIsGettingLocation, setLocation } = get();
    
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      
      setIsGettingLocation(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const locationData = {
            lat: latitude,
            lon: longitude,
            name: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            accuracy: accuracy
          };
          
          setLocation(locationData);
          setIsGettingLocation(false);
          resolve(locationData);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsGettingLocation(false);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000 // Cache location for 1 minute
        }
      );
    });
  }
}));
