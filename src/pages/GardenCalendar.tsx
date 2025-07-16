import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Bell, Droplets, Scissors, Sprout, Sun, AlertTriangle } from 'lucide-react';

const monthlyTasks = {
  0: { // January
    name: 'January',
    season: 'Winter',
    tasks: [
      { type: 'planning', task: 'Plan your garden layout for spring', priority: 'medium' },
      { type: 'indoor', task: 'Start seeds indoors for tomatoes and peppers', priority: 'high' },
      { type: 'maintenance', task: 'Prune dormant fruit trees', priority: 'high' },
      { type: 'care', task: 'Check houseplants for pests', priority: 'low' }
    ]
  },
  1: { // February
    name: 'February',
    season: 'Winter',
    tasks: [
      { type: 'planning', task: 'Order seeds and plants for spring', priority: 'high' },
      { type: 'indoor', task: 'Start herb seeds indoors', priority: 'medium' },
      { type: 'maintenance', task: 'Service garden tools', priority: 'low' },
      { type: 'care', task: 'Begin hardening off seedlings', priority: 'medium' }
    ]
  },
  2: { // March
    name: 'March',
    season: 'Spring',
    tasks: [
      { type: 'planting', task: 'Plant cool-season crops (lettuce, peas)', priority: 'high' },
      { type: 'maintenance', task: 'Prepare garden beds', priority: 'high' },
      { type: 'care', task: 'Start regular watering schedule', priority: 'medium' },
      { type: 'fertilizing', task: 'Apply compost to garden beds', priority: 'medium' }
    ]
  },
  3: { // April
    name: 'April',
    season: 'Spring',
    tasks: [
      { type: 'planting', task: 'Plant warm-season crops after last frost', priority: 'high' },
      { type: 'maintenance', task: 'Install drip irrigation', priority: 'medium' },
      { type: 'care', task: 'Begin pest monitoring', priority: 'high' },
      { type: 'fertilizing', task: 'Feed houseplants as growth resumes', priority: 'low' }
    ]
  },
  4: { // May
    name: 'May',
    season: 'Spring',
    tasks: [
      { type: 'planting', task: 'Transplant seedlings outdoors', priority: 'high' },
      { type: 'maintenance', task: 'Mulch around plants', priority: 'medium' },
      { type: 'care', task: 'Begin regular feeding schedule', priority: 'medium' },
      { type: 'harvesting', task: 'Harvest early spring crops', priority: 'low' }
    ]
  },
  5: { // June
    name: 'June',
    season: 'Summer',
    tasks: [
      { type: 'care', task: 'Increase watering frequency', priority: 'high' },
      { type: 'maintenance', task: 'Stake tall plants', priority: 'medium' },
      { type: 'harvesting', task: 'Begin summer harvest', priority: 'high' },
      { type: 'planting', task: 'Plant succession crops', priority: 'medium' }
    ]
  },
  6: { // July
    name: 'July',
    season: 'Summer',
    tasks: [
      { type: 'care', task: 'Deep water during heat waves', priority: 'high' },
      { type: 'maintenance', task: 'Deadhead flowers regularly', priority: 'medium' },
      { type: 'harvesting', task: 'Harvest daily during peak season', priority: 'high' },
      { type: 'care', task: 'Monitor for heat stress', priority: 'high' }
    ]
  },
  7: { // August
    name: 'August',
    season: 'Summer',
    tasks: [
      { type: 'harvesting', task: 'Preserve excess harvest', priority: 'high' },
      { type: 'care', task: 'Continue deep watering', priority: 'high' },
      { type: 'planting', task: 'Start fall garden planning', priority: 'medium' },
      { type: 'maintenance', task: 'Save seeds from best plants', priority: 'low' }
    ]
  },
  8: { // September
    name: 'September',
    season: 'Fall',
    tasks: [
      { type: 'planting', task: 'Plant fall crops', priority: 'high' },
      { type: 'maintenance', task: 'Begin fall cleanup', priority: 'medium' },
      { type: 'harvesting', task: 'Harvest before first frost', priority: 'high' },
      { type: 'care', task: 'Reduce watering as temperatures drop', priority: 'medium' }
    ]
  },
  9: { // October
    name: 'October',
    season: 'Fall',
    tasks: [
      { type: 'maintenance', task: 'Rake and compost leaves', priority: 'high' },
      { type: 'care', task: 'Bring tender plants indoors', priority: 'high' },
      { type: 'harvesting', task: 'Final harvest before frost', priority: 'high' },
      { type: 'planning', task: 'Plan next year\'s garden', priority: 'low' }
    ]
  },
  10: { // November
    name: 'November',
    season: 'Fall',
    tasks: [
      { type: 'maintenance', task: 'Clean and store garden tools', priority: 'medium' },
      { type: 'care', task: 'Protect plants from frost', priority: 'high' },
      { type: 'maintenance', task: 'Drain irrigation systems', priority: 'high' },
      { type: 'planning', task: 'Start seed catalogs research', priority: 'low' }
    ]
  },
  11: { // December
    name: 'December',
    season: 'Winter',
    tasks: [
      { type: 'care', task: 'Monitor houseplants in dry indoor air', priority: 'medium' },
      { type: 'planning', task: 'Review this year\'s garden notes', priority: 'low' },
      { type: 'maintenance', task: 'Plan holiday plant gifts', priority: 'low' },
      { type: 'care', task: 'Reduce watering for dormant plants', priority: 'medium' }
    ]
  }
};

const taskIcons = {
  planting: Sprout,
  care: Droplets,
  maintenance: Scissors,
  harvesting: Sun,
  planning: CalendarIcon,
  fertilizing: Bell,
  indoor: Sprout
};

const taskColors = {
  planting: 'text-green-600',
  care: 'text-blue-600',
  maintenance: 'text-orange-600',
  harvesting: 'text-yellow-600',
  planning: 'text-purple-600',
  fertilizing: 'text-emerald-600',
  indoor: 'text-indigo-600'
};

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const GardenCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const currentMonth = new Date().getMonth();
  const currentMonthData = monthlyTasks[currentMonth as keyof typeof monthlyTasks];

  const seasonColors = {
    Spring: 'from-green-400 to-emerald-500',
    Summer: 'from-yellow-400 to-orange-500',
    Fall: 'from-orange-400 to-red-500',
    Winter: 'from-blue-400 to-indigo-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Garden Calendar 📅
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Never miss important garden tasks again. Get seasonal reminders and personalized care schedules for your plants.
          </p>
        </div>

        {/* Current Month Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentMonthData.name}</CardTitle>
                  <CardDescription className="text-lg">
                    <Badge className={`bg-gradient-to-r ${seasonColors[currentMonthData.season as keyof typeof seasonColors]} text-white`}>
                      {currentMonthData.season}
                    </Badge>
                  </CardDescription>
                </div>
                <CalendarIcon className="h-8 w-8 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMonthData.tasks.map((task, index) => {
                  const IconComponent = taskIcons[task.type as keyof typeof taskIcons];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <IconComponent className={`h-5 w-5 mt-1 ${taskColors[task.type as keyof typeof taskColors]}`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{task.task}</p>
                        <Badge className={`mt-1 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                          {task.priority} priority
                        </Badge>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="reminders">My Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(monthlyTasks).map(([monthIndex, monthData]) => (
                <motion.div
                  key={monthIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: parseInt(monthIndex) * 0.05 }}
                >
                  <Card className={`h-full ${parseInt(monthIndex) === currentMonth ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {monthData.name}
                        <Badge className={`bg-gradient-to-r ${seasonColors[monthData.season as keyof typeof seasonColors]} text-white`}>
                          {monthData.season}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {monthData.tasks.slice(0, 3).map((task, taskIndex) => {
                          const IconComponent = taskIcons[task.type as keyof typeof taskIcons];
                          return (
                            <div key={taskIndex} className="flex items-start gap-2">
                              <IconComponent className={`h-4 w-4 mt-1 ${taskColors[task.type as keyof typeof taskColors]}`} />
                              <p className="text-sm text-gray-600">{task.task}</p>
                            </div>
                          );
                        })}
                        {monthData.tasks.length > 3 && (
                          <p className="text-xs text-gray-400">+{monthData.tasks.length - 3} more tasks</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Click on a date to see tasks for that day</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              {selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks for {selectedDate.toLocaleDateString()}</CardTitle>
                    <CardDescription>
                      {monthlyTasks[selectedDate.getMonth() as keyof typeof monthlyTasks].season} tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {monthlyTasks[selectedDate.getMonth() as keyof typeof monthlyTasks].tasks.map((task, index) => {
                        const IconComponent = taskIcons[task.type as keyof typeof taskIcons];
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <IconComponent className={`h-5 w-5 mt-1 ${taskColors[task.type as keyof typeof taskColors]}`} />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{task.task}</p>
                              <Badge className={`mt-1 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                                {task.priority} priority
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Your personalized garden schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Water houseplants</p>
                      <p className="text-sm text-blue-600">Tomorrow at 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                    <Sprout className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Plant spring vegetables</p>
                      <p className="text-sm text-green-600">Next week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <Scissors className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-800">Prune roses</p>
                      <p className="text-sm text-orange-600">In 2 weeks</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Set Custom Reminder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default GardenCalendar;