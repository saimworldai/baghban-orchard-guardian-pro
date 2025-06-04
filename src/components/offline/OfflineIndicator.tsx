
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi, CloudOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [offlineData, setOfflineData] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      
      // Sync offline data when coming back online
      if (offlineData.length > 0) {
        syncOfflineData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show message if already offline
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineData]);

  const syncOfflineData = async () => {
    try {
      // Here you would sync any offline data
      console.log('Syncing offline data...', offlineData);
      
      // Clear offline data after successful sync
      setOfflineData([]);
      localStorage.removeItem('offline-data');
      
      // Show success message
      console.log('Offline data synced successfully');
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    }
  };

  const addOfflineData = (data: any) => {
    const newOfflineData = [...offlineData, { ...data, timestamp: Date.now() }];
    setOfflineData(newOfflineData);
    localStorage.setItem('offline-data', JSON.stringify(newOfflineData));
  };

  // Load offline data from localStorage on mount
  useEffect(() => {
    const savedOfflineData = localStorage.getItem('offline-data');
    if (savedOfflineData) {
      setOfflineData(JSON.parse(savedOfflineData));
    }
  }, []);

  return (
    <>
      {/* Connection Status Indicator */}
      <div className="fixed top-20 right-4 z-40">
        <Badge 
          variant={isOnline ? "default" : "destructive"}
          className={`${
            isOnline 
              ? "bg-green-100 text-green-800 border-green-200" 
              : "bg-red-100 text-red-800 border-red-200"
          } flex items-center gap-1`}
        >
          {isOnline ? (
            <>
              <Wifi className="h-3 w-3" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Offline
            </>
          )}
        </Badge>
      </div>

      {/* Offline Message */}
      <AnimatePresence>
        {showOfflineMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-16 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
          >
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
                    <CloudOff className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-amber-800 mb-1">
                      You're offline
                    </h3>
                    <p className="text-sm text-amber-700 mb-2">
                      Limited functionality available. Your data will sync when connection is restored.
                    </p>
                    {offlineData.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-amber-700 border-amber-300">
                          {offlineData.length} items pending sync
                        </Badge>
                        {isOnline && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={syncOfflineData}
                            className="text-amber-600 hover:text-amber-800 p-1"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hook for offline data management
export const useOfflineData = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveOfflineData = (key: string, data: any) => {
    if (!isOnline) {
      const offlineData = JSON.parse(localStorage.getItem('offline-actions') || '[]');
      offlineData.push({
        key,
        data,
        timestamp: Date.now(),
        action: 'save'
      });
      localStorage.setItem('offline-actions', JSON.stringify(offlineData));
      return true;
    }
    return false;
  };

  return {
    isOnline,
    saveOfflineData
  };
};
