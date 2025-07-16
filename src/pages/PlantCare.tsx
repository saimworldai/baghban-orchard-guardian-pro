import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Droplets, Sun, Scissors, Heart, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

const plantCategories = [
  { id: 'houseplants', name: 'Houseplants', count: 45 },
  { id: 'vegetables', name: 'Vegetables', count: 32 },
  { id: 'flowers', name: 'Flowers', count: 28 },
  { id: 'herbs', name: 'Herbs', count: 18 },
  { id: 'succulents', name: 'Succulents', count: 22 },
  { id: 'trees', name: 'Trees', count: 15 }
];

const popularPlants = [
  {
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    difficulty: 'Easy',
    water: 'Low',
    light: 'Low to bright',
    tips: ['Water every 2-3 weeks', 'Tolerates neglect well', 'Perfect for beginners'],
    image: '🐍'
  },
  {
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    difficulty: 'Easy',
    water: 'Medium',
    light: 'Medium',
    tips: ['Water when soil is dry', 'Grows quickly', 'Great for hanging baskets'],
    image: '🌿'
  },
  {
    name: 'Monstera',
    scientificName: 'Monstera deliciosa',
    difficulty: 'Medium',
    water: 'Medium',
    light: 'Bright indirect',
    tips: ['Loves humidity', 'Provide support for climbing', 'Wipe leaves regularly'],
    image: '🌱'
  },
  {
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    difficulty: 'Medium',
    water: 'High',
    light: 'Low to medium',
    tips: ['Droops when thirsty', 'Remove dead flowers', 'Prefers humid conditions'],
    image: '🕊️'
  },
  {
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    difficulty: 'Easy',
    water: 'Medium',
    light: 'Bright indirect',
    tips: ['Water when top inch is dry', 'Dust leaves regularly', 'Can grow very tall'],
    image: '🌳'
  },
  {
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    difficulty: 'Easy',
    water: 'Low',
    light: 'Low to bright',
    tips: ['Very drought tolerant', 'Glossy, waxy leaves', 'Perfect for dark rooms'],
    image: '✨'
  }
];

const careGuides = [
  {
    title: 'Watering 101',
    description: 'Learn the fundamentals of proper plant watering',
    icon: Droplets,
    color: 'text-blue-500',
    tips: [
      'Check soil moisture before watering',
      'Water thoroughly but less frequently',
      'Use room temperature water',
      'Water in the morning when possible'
    ]
  },
  {
    title: 'Light Requirements',
    description: 'Understanding different light conditions for plants',
    icon: Sun,
    color: 'text-yellow-500',
    tips: [
      'Bright direct: South-facing windows',
      'Bright indirect: Near but not in direct sun',
      'Medium: East or west-facing windows',
      'Low: North-facing or interior spaces'
    ]
  },
  {
    title: 'Pruning & Maintenance',
    description: 'Keep your plants healthy with proper care',
    icon: Scissors,
    color: 'text-green-500',
    tips: [
      'Remove dead or yellowing leaves',
      'Pinch growing tips to encourage bushiness',
      'Use clean, sharp tools',
      'Prune during growing season'
    ]
  }
];

const PlantCare: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlants = popularPlants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            Plant Care Guide 🌿
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know to keep your plants happy and healthy. From beginner-friendly houseplants to advanced gardening tips.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plants">Popular Plants</TabsTrigger>
            <TabsTrigger value="guides">Care Guides</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="plants" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map((plant, index) => (
                <motion.div
                  key={plant.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">{plant.image}</div>
                        <Badge className={getDifficultyColor(plant.difficulty)}>
                          {plant.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{plant.name}</CardTitle>
                      <CardDescription className="italic">
                        {plant.scientificName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span>{plant.water} water</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-yellow-500" />
                          <span>{plant.light} light</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Care Tips
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {plant.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${guide.color}`}>
                        <guide.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {plantCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-gray-500 text-sm">{category.count} guides</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default PlantCare;