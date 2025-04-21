
import React from 'react';

type LocationMiniMapProps = {
  showMap: boolean;
  mapContainer: React.RefObject<HTMLDivElement>;
};

export function LocationMiniMap({ showMap, mapContainer }: LocationMiniMapProps) {
  if (!showMap) return null;
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-input shadow-md">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-2 left-2 bg-white/80 p-2 rounded-md text-xs text-gray-700 backdrop-blur-sm">
        Click on map or drag the marker to set location
      </div>
    </div>
  );
}
