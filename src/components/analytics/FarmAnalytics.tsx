
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Droplets, 
  Bug, 
  Calendar,
  Download,
  Share2,
  AlertTriangle
} from 'lucide-react';

export const FarmAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock analytics data
  const yieldData = [
    { month: 'Jan', yield: 2400, target: 2800, efficiency: 85 },
    { month: 'Feb', yield: 2700, target: 2800, efficiency: 96 },
    { month: 'Mar', yield: 3100, target: 3000, efficiency: 103 },
    { month: 'Apr', yield: 2900, target: 3200, efficiency: 91 },
    { month: 'May', yield: 3400, target: 3500, efficiency: 97 },
    { month: 'Jun', yield: 3800, target: 3600, efficiency: 106 }
  ];

  const sprayData = [
    { week: 'Week 1', applications: 3, cost: 450, effectiveness: 92 },
    { week: 'Week 2', applications: 2, cost: 300, effectiveness: 89 },
    { week: 'Week 3', applications: 4, cost: 600, effectiveness: 95 },
    { week: 'Week 4', applications: 1, cost: 150, effectiveness: 88 }
  ];

  const diseaseData = [
    { name: 'Apple Scab', value: 35, color: '#ef4444' },
    { name: 'Powdery Mildew', value: 25, color: '#f97316' },
    { name: 'Fire Blight', value: 20, color: '#eab308' },
    { name: 'Cedar Rust', value: 15, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const costAnalysis = [
    { category: 'Spraying', current: 2400, lastMonth: 2800, savings: 400 },
    { category: 'Labor', current: 3200, lastMonth: 3100, savings: -100 },
    { category: 'Equipment', current: 800, lastMonth: 900, savings: 100 },
    { category: 'Consultation', current: 500, lastMonth: 600, savings: 100 }
  ];

  const totalSavings = costAnalysis.reduce((sum, item) => sum + item.savings, 0);
  const totalCurrent = costAnalysis.reduce((sum, item) => sum + item.current, 0);

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Farm Analytics</h2>
          <p className="text-gray-600">Insights and trends for your orchard performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Savings</p>
                <p className="text-2xl font-bold text-green-700">${totalSavings}</p>
                <p className="text-xs text-green-600">vs last month</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Spray Efficiency</p>
                <p className="text-2xl font-bold text-blue-700">94%</p>
                <p className="text-xs text-blue-600">average this month</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Disease Prevention</p>
                <p className="text-2xl font-bold text-orange-700">87%</p>
                <p className="text-xs text-orange-600">success rate</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Bug className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Yield Efficiency</p>
                <p className="text-2xl font-bold text-purple-700">96%</p>
                <p className="text-xs text-purple-600">of target</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="yield" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
            <TabsTrigger value="spray">Spray Tracking</TabsTrigger>
            <TabsTrigger value="disease">Disease Patterns</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="yield" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Yield Performance vs Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stackId="1" 
                      stroke="#e5e7eb" 
                      fill="#f3f4f6" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="yield" 
                      stackId="2" 
                      stroke="#10b981" 
                      fill="#34d399" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spray" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="mr-2 h-5 w-5 text-blue-600" />
                  Spray Applications & Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sprayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#3b82f6" />
                    <Bar dataKey="effectiveness" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disease" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bug className="mr-2 h-5 w-5 text-orange-600" />
                  Disease Detection Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={diseaseData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {diseaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {diseaseData.map((disease, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: disease.color }}
                          />
                          <span className="font-medium">{disease.name}</span>
                        </div>
                        <Badge variant="outline">{disease.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                  Cost Analysis & Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costAnalysis.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{item.category}</h4>
                        <Badge 
                          variant={item.savings > 0 ? "default" : "destructive"}
                          className={item.savings > 0 ? "bg-green-100 text-green-800" : ""}
                        >
                          {item.savings > 0 ? '+' : ''}${item.savings}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Current: ${item.current}</span>
                        <span>Last Month: ${item.lastMonth}</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-800">Total Monthly Savings</span>
                      <span className="text-xl font-bold text-green-700">${totalSavings}</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      {((totalSavings / totalCurrent) * 100).toFixed(1)}% cost reduction vs last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
