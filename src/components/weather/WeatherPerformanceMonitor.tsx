
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Wifi, 
  Database, 
  Clock, 
  Signal,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const WeatherPerformanceMonitor: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    cacheHitRate: 0,
    apiResponseTime: 0,
    dataFreshness: 100,
    connectionQuality: 'excellent' as 'excellent' | 'good' | 'poor'
  });

  useEffect(() => {
    // Simulate performance monitoring
    const updateMetrics = () => {
      setPerformanceMetrics({
        loadTime: Math.random() * 2000 + 500, // 500-2500ms
        cacheHitRate: Math.random() * 100,
        apiResponseTime: Math.random() * 1000 + 200, // 200-1200ms
        dataFreshness: 100 - (Math.random() * 20), // 80-100%
        connectionQuality: Math.random() > 0.7 ? 'excellent' : Math.random() > 0.4 ? 'good' : 'poor'
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-blue-800">
            <Activity className="mr-2 h-5 w-5" />
            Performance Monitor
            <Badge variant="outline" className="ml-2 text-xs">
              LIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Load Time */}
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Load Time</span>
              </div>
              <div className="text-lg font-bold text-blue-800">
                {performanceMetrics.loadTime.toFixed(0)}ms
              </div>
              <Progress value={Math.max(0, 100 - (performanceMetrics.loadTime / 25))} className="h-1 mt-1" />
            </div>

            {/* Cache Hit Rate */}
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Cache Hit</span>
              </div>
              <div className="text-lg font-bold text-green-800">
                {performanceMetrics.cacheHitRate.toFixed(1)}%
              </div>
              <Progress value={performanceMetrics.cacheHitRate} className="h-1 mt-1" />
            </div>

            {/* API Response */}
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Signal className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">API Response</span>
              </div>
              <div className="text-lg font-bold text-purple-800">
                {performanceMetrics.apiResponseTime.toFixed(0)}ms
              </div>
              <Progress value={Math.max(0, 100 - (performanceMetrics.apiResponseTime / 12))} className="h-1 mt-1" />
            </div>

            {/* Connection Quality */}
            <div className="bg-white/60 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Connection</span>
              </div>
              <Badge className={`text-xs ${getQualityColor(performanceMetrics.connectionQuality)}`}>
                {performanceMetrics.connectionQuality.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Data Freshness Indicator */}
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Data Freshness</span>
              </div>
              <span className="text-sm font-bold text-green-800">
                {performanceMetrics.dataFreshness.toFixed(1)}%
              </span>
            </div>
            <Progress value={performanceMetrics.dataFreshness} className="h-2" />
            <div className="text-xs text-gray-600 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
