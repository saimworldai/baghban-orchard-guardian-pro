
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Brain, 
  CloudRain, 
  Users, 
  Calendar,
  TrendingUp,
  Award,
  Leaf,
  Bell,
  ArrowRight,
  Sparkles,
  Activity,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

const quickActions = [
  {
    title: "Disease Detection",
    description: "Scan your crops with AI",
    icon: Brain,
    color: "from-purple-500 to-indigo-600",
    link: "/disease-detection",
    bgColor: "from-purple-100 to-indigo-100"
  },
  {
    title: "Weather Alerts",
    description: "Real-time weather monitoring",
    icon: CloudRain,
    color: "from-blue-500 to-cyan-600",
    link: "/weather-alerts",
    bgColor: "from-blue-100 to-cyan-100"
  },
  {
    title: "Expert Consultation",
    description: "Get professional advice",
    icon: Users,
    color: "from-emerald-500 to-green-600",
    link: "/expert-consultation",
    bgColor: "from-emerald-100 to-green-100"
  },
  {
    title: "Spray Schedule",
    description: "Optimize your spray timing",
    icon: Calendar,
    color: "from-amber-500 to-yellow-600",
    link: "/spray-schedule",
    bgColor: "from-amber-100 to-yellow-100"
  }
];

const stats = [
  { 
    label: "Yield Increase", 
    value: "45%", 
    icon: TrendingUp, 
    color: "text-green-600",
    bg: "bg-green-100"
  },
  { 
    label: "Cost Savings", 
    value: "30%", 
    icon: Award, 
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  { 
    label: "Pesticide Reduction", 
    value: "25%", 
    icon: Leaf, 
    color: "text-emerald-600",
    bg: "bg-emerald-100"
  },
  { 
    label: "Active Alerts", 
    value: "3", 
    icon: Bell, 
    color: "text-orange-600",
    bg: "bg-orange-100"
  }
];

const recentActivities = [
  {
    title: "Disease detected in Block A",
    time: "2 hours ago",
    type: "alert",
    icon: Brain,
    color: "text-red-600"
  },
  {
    title: "Weather alert: Rain expected",
    time: "4 hours ago",
    type: "weather",
    icon: CloudRain,
    color: "text-blue-600"
  },
  {
    title: "Spray schedule updated",
    time: "6 hours ago",
    type: "schedule",
    icon: Calendar,
    color: "text-green-600"
  },
  {
    title: "Expert consultation completed",
    time: "1 day ago",
    type: "consultation",
    icon: Users,
    color: "text-purple-600"
  }
];

export function EnhancedDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-800 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Farmer!</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your orchard is thriving. Here's what's happening today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <Sparkles className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
              <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => navigate(action.link)}
            >
              <Card className="bg-white/80 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-full h-32 bg-gradient-to-br ${action.color} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/15 rounded-full"></div>
                    
                    {/* Main Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <action.icon className="h-12 w-12 text-white drop-shadow-lg" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                    {action.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-gray-50 transition-colors"
                  >
                    Open
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-lg border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-white shadow-md">
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Analytics */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-lg border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  Quick Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                      <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">98.5%</div>
                      <div className="text-sm text-gray-600">Crop Health</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                      <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">87%</div>
                      <div className="text-sm text-gray-600">Efficiency</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    onClick={() => navigate('/analytics')}
                  >
                    View Full Analytics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
