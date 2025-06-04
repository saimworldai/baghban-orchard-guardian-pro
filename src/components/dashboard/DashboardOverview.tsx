
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Thermometer, 
  Droplet, 
  Wind, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Zap,
  Users,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real app, this would come from your weather service
  const dashboardData = {
    weather: {
      temp: 24,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      sprayWindow: 'Optimal'
    },
    alerts: [
      { id: 1, type: 'warning', message: 'High wind expected tomorrow', priority: 'medium' },
      { id: 2, type: 'info', message: 'Perfect spray conditions today 2-4 PM', priority: 'low' }
    ],
    upcomingTasks: [
      { id: 1, task: 'Apple Tree Spray - Block A', time: '14:00', status: 'pending' },
      { id: 2, task: 'Expert Consultation', time: '16:30', status: 'confirmed' }
    ],
    recentActivity: [
      { id: 1, action: 'Disease scan completed', result: 'No issues detected', time: '2 hours ago' },
      { id: 2, action: 'Spray application', result: 'Block B completed', time: 'Yesterday' }
    ]
  };

  const quickActions = [
    { label: 'Weather Alerts', icon: Thermometer, route: '/weather-alerts', color: 'blue' },
    { label: 'Disease Detection', icon: Activity, route: '/disease-detection', color: 'green' },
    { label: 'Expert Consultation', icon: Users, route: '/expert-consultation', color: 'purple' },
    { label: 'Spray Schedule', icon: Calendar, route: '/spray-schedule', color: 'orange' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-amber-200 bg-amber-50 text-amber-800';
      case 'error': return 'border-red-200 bg-red-50 text-red-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-2">Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}!</h1>
        <p className="text-green-100">Welcome to your Orchard Management Dashboard</p>
        <div className="text-sm text-green-100 mt-2">
          {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
        </div>
      </motion.div>

      {/* Quick Weather Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-blue-800">Current Conditions</span>
              <Badge className="bg-green-100 text-green-800">
                {dashboardData.weather.sprayWindow}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Thermometer className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">{dashboardData.weather.temp}°C</p>
                  <p className="text-sm text-blue-600">{dashboardData.weather.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplet className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">{dashboardData.weather.humidity}%</p>
                  <p className="text-sm text-blue-600">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">{dashboardData.weather.windSpeed} km/h</p>
                  <p className="text-sm text-blue-600">Wind Speed</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button 
                  onClick={() => navigate('/weather-alerts')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer hover:shadow-lg transition-all duration-300 border-${action.color}-200 hover:border-${action.color}-300`}
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-6 text-center">
                  <action.icon className={`h-12 w-12 mx-auto mb-3 text-${action.color}-600`} />
                  <h3 className="font-medium text-gray-800">{action.label}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <p className="text-sm font-medium">{alert.message}</p>
                </div>
              ))}
              {dashboardData.alerts.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>No active alerts</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{task.task}</p>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.result}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
