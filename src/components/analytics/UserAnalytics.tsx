
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { Activity, Clock, Zap, Globe } from 'lucide-react';

export function UserAnalytics() {
  const { performanceMetrics } = usePerformanceOptimization();

  const metrics = [
    {
      title: 'Load Time',
      value: `${Math.round(performanceMetrics.loadTime)}ms`,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Render Time',
      value: `${Math.round(performanceMetrics.renderTime)}ms`,
      icon: Zap,
      color: 'text-green-600'
    },
    {
      title: 'Memory Usage',
      value: `${Math.round(performanceMetrics.memoryUsage / 1024 / 1024)}MB`,
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'Connection',
      value: performanceMetrics.connectionType,
      icon: Globe,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
              <div>
                <p className="text-xs text-gray-600">{metric.title}</p>
                <p className="font-semibold text-sm">{metric.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
