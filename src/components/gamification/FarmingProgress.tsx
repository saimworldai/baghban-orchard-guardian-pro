
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award, 
  Gift,
  TrendingUp,
  CheckCircle,
  Flame
} from 'lucide-react';

export function FarmingProgress() {
  const [userLevel, setUserLevel] = useState(5);
  const [xp, setXp] = useState(750);
  const [streak, setStreak] = useState(7);
  
  const maxXP = 1000;
  const progressPercent = (xp / maxXP) * 100;

  const achievements = [
    { 
      id: 1, 
      title: 'Disease Detective', 
      description: 'Identified 10 plant diseases', 
      icon: Target,
      unlocked: true,
      xp: 100
    },
    { 
      id: 2, 
      title: 'Weather Watcher', 
      description: 'Checked weather 30 days in a row', 
      icon: TrendingUp,
      unlocked: true,
      xp: 150
    },
    { 
      id: 3, 
      title: 'Expert Seeker', 
      description: 'Consulted with 5 experts', 
      icon: Star,
      unlocked: false,
      xp: 200
    },
    { 
      id: 4, 
      title: 'Community Helper', 
      description: 'Helped 20 fellow farmers', 
      icon: Award,
      unlocked: false,
      xp: 300
    }
  ];

  const dailyTasks = [
    { task: 'Check weather forecast', completed: true, xp: 20 },
    { task: 'Scan a plant for diseases', completed: true, xp: 50 },
    { task: 'Visit community feed', completed: false, xp: 30 },
    { task: 'Update crop schedule', completed: false, xp: 40 }
  ];

  return (
    <div className="space-y-6">
      {/* Level & Progress */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Level {userLevel}</h3>
                <p className="opacity-90">Smart Farmer</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Next Level</div>
              <div className="text-lg font-bold">{xp}/{maxXP} XP</div>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3 bg-white/20" />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-300" />
              <span className="font-semibold">{streak} day streak!</span>
            </div>
            <Badge className="bg-white/20 text-white">
              <Gift className="h-4 w-4 mr-1" />
              Daily Bonus Ready
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Daily Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailyTasks.map((task, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                task.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  task.completed ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {task.completed && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
                <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {task.task}
                </span>
              </div>
              <Badge variant={task.completed ? 'default' : 'outline'}>
                +{task.xp} XP
              </Badge>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
                whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}>
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                <Badge className={achievement.unlocked ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}>
                  +{achievement.xp} XP
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Community Leaderboard
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'You', level: 5, xp: 2450, avatar: '🌱' },
              { rank: 2, name: 'Farm_Pro_2024', level: 6, xp: 2380, avatar: '🚜' },
              { rank: 3, name: 'GreenThumb_Master', level: 4, xp: 2200, avatar: '🌿' },
              { rank: 4, name: 'CropWhisperer', level: 5, xp: 2150, avatar: '🌾' }
            ].map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    player.rank === 1 ? 'bg-yellow-100' : 'bg-white'
                  }`}>
                    {player.rank === 1 ? '👑' : player.avatar}
                  </div>
                  <div>
                    <div className={`font-semibold ${player.rank === 1 ? 'text-yellow-700' : 'text-gray-800'}`}>
                      #{player.rank} {player.name}
                    </div>
                    <div className="text-sm text-gray-600">Level {player.level}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {player.xp.toLocaleString()} XP
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
