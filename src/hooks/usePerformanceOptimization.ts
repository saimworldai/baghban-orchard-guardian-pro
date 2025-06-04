
import { useEffect, useCallback, useState } from 'react';

export const usePerformanceOptimization = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    connectionType: 'unknown'
  });

  // Debounce function for expensive operations
  const useDebounce = (callback: Function, delay: number) => {
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    return useCallback((...args: any[]) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        callback(...args);
      }, delay);

      setDebounceTimer(timer);
    }, [callback, delay, debounceTimer]);
  };

  // Throttle function for high-frequency events
  const useThrottle = (callback: Function, delay: number) => {
    const [isThrottled, setIsThrottled] = useState(false);

    return useCallback((...args: any[]) => {
      if (!isThrottled) {
        callback(...args);
        setIsThrottled(true);
        setTimeout(() => setIsThrottled(false), delay);
      }
    }, [callback, delay, isThrottled]);
  };

  // Lazy loading utility
  const useLazyLoad = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState<Element | null>(null);

    useEffect(() => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, [element, threshold]);

    return { isVisible, setElement };
  };

  // Monitor performance metrics
  useEffect(() => {
    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      setPerformanceMetrics({
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        connectionType: (navigator as any).connection?.effectiveType || 'unknown'
      });
    };

    // Update metrics after page load
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
    }

    return () => window.removeEventListener('load', updateMetrics);
  }, []);

  // Preload critical resources
  const preloadResource = useCallback((url: string, type: 'image' | 'script' | 'style' = 'image') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
  }, []);

  // Image optimization utility
  const optimizeImage = useCallback((src: string, width?: number, height?: number) => {
    if (width && height) {
      return `${src}?w=${width}&h=${height}&q=80&f=webp`;
    }
    return `${src}?q=80&f=webp`;
  }, []);

  // Memory cleanup utility
  const useMemoryCleanup = () => {
    useEffect(() => {
      const cleanup = () => {
        // Clear any caches if needed
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('old-cache')) {
                caches.delete(name);
              }
            });
          });
        }
      };

      // Run cleanup on component unmount
      return cleanup;
    }, []);
  };

  return {
    performanceMetrics,
    useDebounce,
    useThrottle,
    useLazyLoad,
    preloadResource,
    optimizeImage,
    useMemoryCleanup
  };
};
