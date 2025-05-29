
import React from 'react';

// High-quality background images for different weather conditions
const bgImages = {
  clear: "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  clouds: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  rain: "url('https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  snow: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  thunderstorm: "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  default: "url('https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
};

type WeatherBackgroundProps = {
  weatherCode?: number;
  children: React.ReactNode;
};

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode, children }) => {
  const getBackgroundForWeather = (code?: number) => {
    if (!code) return bgImages.default;
    if (code >= 200 && code < 300) return bgImages.thunderstorm;
    if (code >= 300 && code < 600) return bgImages.rain;
    if (code >= 600 && code < 700) return bgImages.snow;
    if (code >= 801) return bgImages.clouds;
    if (code === 800) return bgImages.clear;
    return bgImages.default;
  };

  const bgImage = getBackgroundForWeather(weatherCode);

  return (
    <div className="min-h-screen py-8 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out" style={{ backgroundImage: bgImage }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/40 backdrop-blur-[2px] z-0"></div>
      <div className="container mx-auto px-4 space-y-8 relative z-10">
        {children}
      </div>
    </div>
  );
};
