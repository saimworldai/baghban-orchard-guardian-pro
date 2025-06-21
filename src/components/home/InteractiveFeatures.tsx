
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  Globe,
  Heart,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function InteractiveFeatures() {
  const [activeDemo, setActiveDemo] = useState(0);
  const navigate = useNavigate();

  const demos = [
    {
      title: 'AI Disease Detection',
      description: 'Upload a photo and get instant AI analysis',
      progress: 95,
      color: 'from-purple-500 to-pink-600',
      action: () => navigate('/disease-detection')
    },
    {
      title: 'Smart Weather Alerts',
      description: 'Real-time weather monitoring and alerts',
      progress: 88,
      color: 'from-blue-500 to-cyan-600',
      action: () => navigate('/weather-alerts')
    },
    {
      title: 'Expert Consultation',
      description: 'Connect with agricultural experts instantly',
      progress: 92,
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/expert-consultation')
    }
  ];

  const achievements = [
    { icon: Users, label: '50K+ Farmers Helped', value: '50,000+' },
    { icon: Globe, label: 'Countries Served', value: '25+' },
    { icon: Zap, label: 'AI Accuracy Rate', value: '98%' },
    { icon: Heart, label: 'Success Stories', value: '15K+' }
  ];

  return (
    <div className="space-y-12">
      {/* Interactive Demo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-8"
      >
        <div>
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <Sparkles className="h-4 w-4 mr-1" />
            Try Our Tools Live
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Experience the Power of AI Agriculture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our cutting-edge technology can transform your farming experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer ${activeDemo === index ? 'ring-4 ring-green-200' : ''}`}
              onClick={() => setActiveDemo(index)}
            >
              <Card className="h-full bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className={`h-2 bg-gradient-to-r ${demo.color} rounded-full`} />
                  <h3 className="text-xl font-bold text-gray-800">{demo.title}</h3>
                  <p className="text-gray-600">{demo.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-semibold">{demo.progress}%</span>
                    </div>
                    <Progress value={demo.progress} className="h-2" />
                  </div>
                  <Button 
                    onClick={demo.action}
                    className={`w-full bg-gradient-to-r ${demo.color} hover:opacity-90 text-white`}
                  >
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Impact Worldwide</h2>
          <p className="text-xl opacity-90">Making agriculture smarter, one farm at a time</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">{achievement.value}</div>
              <div className="text-sm opacity-90">{achievement.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Success Stories Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-8"
      >
        <div>
          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
            <Award className="h-4 w-4 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Real Results from Real Farmers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Rajesh Kumar",
              location: "Punjab, India",
              result: "40% increase in yield",
              story: "Using AI disease detection saved my entire wheat crop"
            },
            {
              name: "Maria Santos",
              location: "São Paulo, Brazil",
              result: "60% reduction in pesticide use",
              story: "Smart recommendations helped me farm organically"
            },
            {
              name: "John Mitchell",
              location: "Iowa, USA",
              result: "$15K saved annually",
              story: "Weather alerts prevented major crop losses"
            }
          ].map((story, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.location}</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">{story.result}</span>
                  </div>
                  <p className="text-gray-700 italic">"{story.story}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
