
import React, { useRef, useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { LocationSearchInput } from './LocationSearchInput';
import { LocationMiniMap } from './LocationMiniMap';
import { useMapboxMap } from './useMapboxMap';

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);

  // Use mapbox logic encapsulated in hook
  useMapboxMap({ 
    containerRef: mapContainer, 
    showMap, 
    onLocationSelect, 
    toast: (params) => {
      toast({
        title: params.title,
        description: params.description,
        variant: params.variant as "default" | "destructive" | undefined
      });
    }
  });

  const searchLocation = useCallback(async () => {
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
      // Mapbox geocoding API
      const mapboxToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2t6OHN1M3l4MHI0YjJ2cW9zanpwNDhvNSJ9.2sFQXAjQpKuztDlqeXKLEw';
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapboxToken}`
      );
      if (!response.ok) throw new Error(`Geocoding API error: ${response.status}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].center;
        const name = data.features[0].place_name;
        onLocationSelect({ lat, lon, name });

        toast({
          title: "Location Found",
          description: `Weather data will be loaded for ${name}`,
        });
      } else {
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
  }, [searchInput, onLocationSelect]);

  return (
    <div className="w-full space-y-4">
      <LocationSearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        loading={loadingSearch}
        onSearch={searchLocation}
        showMap={showMap}
        onToggleMap={() => setShowMap((m) => !m)}
      />
      <LocationMiniMap showMap={showMap} mapContainer={mapContainer} />
    </div>
  );
};

export default LocationSearch;
