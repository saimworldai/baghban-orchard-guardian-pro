
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Use a valid Mapbox token - this token is a placeholder that should work for demo purposes
// In a production app, this would come from environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2t6OHN1M3l4MHI0YjJ2cW9zanpwNDhvNSJ9.2sFQXAjQpKuztDlqeXKLEw';

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const searchLocation = async () => {
    if (!searchInput.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a location to search",
        variant: "destructive",
      });
      return;
    }

    setLoadingSearch(true);
    try {
      // First, try to use MapBox geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapboxgl.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].center;
        const name = data.features[0].place_name;
        onLocationSelect({ lat, lon, name });
        
        if (map.current) {
          map.current.flyTo({ center: [lon, lat], zoom: 10 });
          if (marker.current) {
            marker.current.setLngLat([lon, lat]);
          }
        }
        
        toast({
          title: "Location Found",
          description: `Weather data will be loaded for ${name}`,
        });
      } else {
        // Fall back to direct weather API search if MapBox doesn't find the location
        toast({
          title: "Location Not Found",
          description: "Please try a different search term or click on the map",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
      toast({
        title: "Error",
        description: "Failed to search location. Please try clicking on the map instead.",
        variant: "destructive",
      });
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !showMap) return;
    
    if (map.current) return; // Prevent re-initialization
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // India center
      zoom: 4
    });

    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#3FB1CE'
    })
      .setLngLat([78.9629, 20.5937])
      .addTo(map.current);

    marker.current.on('dragend', () => {
      if (marker.current) {
        const lngLat = marker.current.getLngLat();
        onLocationSelect({
          lat: lngLat.lat,
          lon: lngLat.lng,
          name: `Custom Location (${lngLat.lat.toFixed(2)}, ${lngLat.lng.toFixed(2)})`
        });
        toast({
          title: "Custom Location Selected",
          description: `Getting weather for coordinates: ${lngLat.lat.toFixed(2)}, ${lngLat.lng.toFixed(2)}`,
        });
      }
    });

    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    // Add standard navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Click handler for the map
    map.current.on('click', (e) => {
      if (marker.current && map.current) {
        const coordinates = e.lngLat;
        marker.current.setLngLat(coordinates);
        
        onLocationSelect({
          lat: coordinates.lat,
          lon: coordinates.lng,
          name: `Selected Location (${coordinates.lat.toFixed(2)}, ${coordinates.lng.toFixed(2)})`
        });
        
        toast({
          title: "Location Selected",
          description: `Getting weather for coordinates: ${coordinates.lat.toFixed(2)}, ${coordinates.lng.toFixed(2)}`,
        });
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [showMap, onLocationSelect]);

  // Cleanup map when component unmounts
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search any location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button 
          onClick={searchLocation} 
          className="flex items-center gap-2"
          disabled={loadingSearch}
        >
          {loadingSearch ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-30 border-t-white"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>
      
      {showMap && (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-input shadow-md">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute bottom-2 left-2 bg-white/80 p-2 rounded-md text-xs text-gray-700 backdrop-blur-sm">
            Click on map or drag the marker to set location
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
