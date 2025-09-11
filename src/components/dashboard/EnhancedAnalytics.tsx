import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Leaf, Bug, CloudRain, Users, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const cropHealthData = [
  { name: 'Jan', healthy: 85, diseased: 15, treated: 12 },
  { name: 'Feb', healthy: 88, diseased: 12, treated: 10 },
  { name: 'Mar', healthy: 92, diseased: 8, treated: 6 },
  { name: 'Apr', healthy: 78, diseased: 22, treated: 18 },
  { name: 'May', healthy: 95, diseased: 5, treated: 4 },
  { name: 'Jun', healthy: 90, diseased: 10, treated: 8 }
];

const yieldData = [
  { name: 'Tomatoes', yield: 1200, target: 1000, efficiency: 120 },
  { name: 'Peppers', yield: 800, target: 750, efficiency: 107 },
  { name: 'Lettuce', yield: 650, target: 600, efficiency: 108 },
  { name: 'Carrots', yield: 950, target: 900, efficiency: 106 },
  { name: 'Beans', yield: 720, target: 800, efficiency: 90 }
];

const expertConsultationData = [
  { name: 'Disease Diagnosis', count: 45, satisfaction: 4.8 },
  { name: 'Pest Control', count: 32, satisfaction: 4.6 },
  { name: 'Soil Health', count: 28, satisfaction: 4.9 },
  { name: 'Irrigation', count: 23, satisfaction: 4.7 },
  { name: 'Nutrition', count: 19, satisfaction: 4.8 }
];

const weatherImpactData = [
  { name: 'Sunny', crops: 95, yield: 110 },
  { name: 'Cloudy', crops: 88, yield: 95 },
  { name: 'Rainy', crops: 82, yield: 85 },
  { name: 'Storm', crops: 65, yield: 70 }
];

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function EnhancedAnalytics() {
  const [timeRange, setTimeRange] = useState('6m');

  const stats = [
    {
      title: 'Total Diagnoses',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Bug,
      color: 'text-green-600'
    },
    {
      title: 'Crop Health Score',
      value: '92%',
      change: '+5.2%',
      trend: 'up',
      icon: Leaf,
      color: 'text-blue-600'
    },
    {
      title: 'Expert Sessions',
      value: '147',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Weather Alerts',
      value: '23',
      change: '-8.1%',
      trend: 'down',
      icon: CloudRain,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-primary/10 hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg bg-gradient-to-br", 
                      stat.color === 'text-green-600' ? 'from-green-500/10 to-green-600/10' :
                      stat.color === 'text-blue-600' ? 'from-blue-500/10 to-blue-600/10' :
                      stat.color === 'text-purple-600' ? 'from-purple-500/10 to-purple-600/10' :
                      'from-orange-500/10 to-orange-600/10'
                    )}>
                      <Icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      isPositive ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {['1m', '3m', '6m', '1y'].map((range) => (
            <Button
              key={range}
              onClick={() => setTimeRange(range)}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">Crop Health</TabsTrigger>
          <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
          <TabsTrigger value="consultations">Expert Sessions</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Crop Health Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cropHealthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="healthy"
                      stackId="1"
                      stroke="#16a34a"
                      fill="#16a34a"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="diseased"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Treatment Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cropHealthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="treated"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="yield" className="space-y-4">
          <Card className="glass border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Yield vs Target Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="target" fill="#64748b" opacity={0.5} />
                  <Bar dataKey="yield" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Consultation Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expertConsultationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expertConsultationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle>Expert Satisfaction Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expertConsultationData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "text-lg",
                                i < Math.floor(item.satisfaction) ? "text-yellow-400" : "text-gray-300"
                              )}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <Badge variant="secondary">{item.satisfaction}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <Card className="glass border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-orange-600" />
                Weather Impact on Crop Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weatherImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="crops" fill="#3b82f6" />
                  <Bar dataKey="yield" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}