
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showMap, setShowMap] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapboxgl.accessToken}`
      );
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
        toast({
          title: "Location Not Found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
      toast({
        title: "Error",
        description: "Failed to search location. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !showMap) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN'; // Replace with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // India center
      zoom: 4
    });

    marker.current = new mapboxgl.Marker({
      draggable: true
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
      }
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [showMap, onLocationSelect]);

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button onClick={searchLocation} className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
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
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-input">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
