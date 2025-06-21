
import React, { useState, useRef } from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280'%3ELoading...%3C/text%3E%3C/svg%3E"
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { useLazyLoad, optimizeImage } = usePerformanceOptimization();
  const { isVisible, setElement } = useLazyLoad();

  const optimizedSrc = optimizeImage(src, width, height);

  React.useEffect(() => {
    if (imgRef.current) {
      setElement(imgRef.current);
    }
  }, [setElement]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={imgRef}>
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      {isVisible && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
      
      {hasError && (
        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
