import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Droplets, Sun, Scissors, Heart, AlertCircle, CheckCircle, Lightbulb, Sparkles, Leaf } from 'lucide-react';

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
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-50 to-cyan-50',
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
    gradient: 'from-amber-500 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
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
    gradient: 'from-emerald-500 to-green-500',
    bg: 'from-emerald-50 to-green-50',
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

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/10 animate-pulse-subtle" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-secondary/10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-primary/5 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-6">
            Plant Care Guide
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Master the art of plant care with our comprehensive guide. From beginner-friendly tips to advanced techniques.
          </p>
        </motion.div>

        {/* Enhanced Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative max-w-lg mx-auto mb-12"
        >
          <div className="glass p-6 rounded-2xl shadow-elegant">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for plants and care tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-background/50 border-0 text-lg rounded-xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Tabs defaultValue="plants" className="w-full">
            <TabsList className="glass mx-auto mb-12 p-2 rounded-full shadow-elegant">
              <TabsTrigger value="plants" className="px-8 py-3 rounded-full transition-all duration-300">
                <Leaf className="w-4 h-4 mr-2" />
                Popular Plants
              </TabsTrigger>
              <TabsTrigger value="guides" className="px-8 py-3 rounded-full transition-all duration-300">
                <Lightbulb className="w-4 h-4 mr-2" />
                Care Guides
              </TabsTrigger>
              <TabsTrigger value="categories" className="px-8 py-3 rounded-full transition-all duration-300">
                <Heart className="w-4 h-4 mr-2" />
                Categories
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="plants" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlants.map((plant, index) => (
                    <motion.div
                      key={plant.name}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <Card className="h-full glass hover:shadow-glow transition-all duration-500 border-accent/20 group-hover:border-primary/30">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl shadow-elegant group-hover:scale-110 transition-transform duration-300">
                              {plant.image}
                            </div>
                            <Badge className={`px-3 py-1 font-medium shadow-sm ${getDifficultyBadge(plant.difficulty)}`}>
                              {plant.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {plant.name}
                          </CardTitle>
                          <CardDescription className="italic text-muted-foreground text-sm">
                            {plant.scientificName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20">
                              <Droplets className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="text-xs text-muted-foreground">Water</p>
                                <p className="font-medium text-sm">{plant.water}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20">
                              <Sun className="h-5 w-5 text-amber-500" />
                              <div>
                                <p className="text-xs text-muted-foreground">Light</p>
                                <p className="font-medium text-sm">{plant.light}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2 text-foreground">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              Care Tips
                            </h4>
                            <ul className="space-y-2">
                              {plant.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-3 text-sm">
                                  <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-muted-foreground">{tip}</span>
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

              <TabsContent value="guides" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {careGuides.map((guide, index) => (
                    <motion.div
                      key={guide.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <Card className="h-full glass hover:shadow-glow transition-all duration-500 border-accent/20 group-hover:border-primary/30 overflow-hidden">
                        <div className={`h-2 bg-gradient-to-r ${guide.gradient}`} />
                        <CardHeader className="relative">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${guide.bg} flex items-center justify-center mb-4 shadow-elegant group-hover:scale-110 transition-transform duration-300`}>
                            <guide.icon className={`h-8 w-8 bg-gradient-to-r ${guide.gradient} bg-clip-text text-transparent`} />
                          </div>
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {guide.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {guide.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {guide.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {plantCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ 
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group cursor-pointer"
                    >
                      <Card className="text-center glass hover:shadow-glow transition-all duration-300 border-accent/20 group-hover:border-primary/30">
                        <CardContent className="p-8">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {category.count} guides
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlantCare;