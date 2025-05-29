
import React from 'react';

export const weatherThumbnails = {
  temperature: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=300&h=200&fit=crop",
  humidity: "https://images.unsplash.com/photo-1514632595-4944383f2737?w=300&h=200&fit=crop",
  wind: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
  pressure: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=300&h=200&fit=crop",
  visibility: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
  uv: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=200&fit=crop",
  precipitation: "https://images.unsplash.com/photo-1438449805896-28a666819a20?w=300&h=200&fit=crop",
  clouds: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop"
};

export const getWeatherThumbnail = (type: keyof typeof weatherThumbnails): string => {
  return weatherThumbnails[type] || weatherThumbnails.clouds;
};
