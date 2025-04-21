
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

type UseMapboxMapProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  showMap: boolean;
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
  toast: (params: { title: string; description: string; variant?: string }) => void;
};

export function useMapboxMap({ containerRef, showMap, onLocationSelect, toast }: UseMapboxMapProps) {
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || !showMap) return;
    if (map.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2t6OHN1M3l4MHI0YjJ2cW9zanpwNDhvNSJ9.2sFQXAjQpKuztDlqeXKLEw';

    map.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // India
      zoom: 4,
    });

    marker.current = new mapboxgl.Marker({ draggable: true, color: '#3FB1CE' })
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

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
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
  }, [showMap, containerRef, onLocationSelect, toast]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return { map, marker };
}
