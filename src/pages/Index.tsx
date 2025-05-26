
import { Link } from 'react-router-dom';
import { 
  Camera, 
  CloudSun, 
  Sprout, 
  BookOpen, 
  UserCheck, 
  ShoppingCart,
  TreeDeciduous,
  CalendarDays,
  Leaf,
  Sun,
  Droplet,
  BarChart,
  ArrowRight,
  Star,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const features = [
  { 
    name: 'Disease Detection', 
    icon: Camera, 
    description: 'AI-powered image analysis for early detection of common apple tree diseases with 95% accuracy',
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-700',
    link: '/disease-detection',
    badge: 'AI Powered'
  },
  { 
    name: 'Weather Alerts', 
    icon: CloudSun, 
    description: 'Real-time weather forecasts and frost warnings with location-based precision',
    color: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-700',
    link: '/weather-alerts',
    badge: 'Real-time'
  },
  { 
    name: 'Spray Schedule', 
    icon: Sprout, 
    description: 'Smart spray scheduling system optimized for disease prevention and weather conditions',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-700',
    link: '/spray-schedule',
    badge: 'Smart'
  },
  { 
    name: 'Knowledge Hub', 
    icon: BookOpen, 
    description: 'Comprehensive guides and tutorials from agricultural experts worldwide',
    color: 'from-amber-500/20 to-yellow-500/20',
    textColor: 'text-amber-700',
    link: '#',
    badge: 'Expert Tips'
  },
  { 
    name: 'Expert Consultation', 
    icon: UserCheck, 
    description: 'Connect with certified agriculture experts for personalized guidance 24/7',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-700',
    link: '/expert-consultation',
    badge: '24/7 Support'
  },
  { 
    name: 'Shop', 
    icon: ShoppingCart, 
    description: 'Quality tools, equipment, and supplies for professional orchard management',
    color: 'from-teal-500/20 to-cyan-500/20',
    textColor: 'text-teal-700',
    link: '#',
    badge: 'Premium Quality'
  }
];

const stats = [
  { value: '10K+', label: 'Happy Farmers', icon: TreeDeciduous },
  { value: '95%', label: 'Disease Detection Accuracy', icon: Shield },
  { value: '24/7', label: 'Expert Support', icon: UserCheck },
  { value: '30+', label: 'Countries Served', icon: Star }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const floatingVariants = {
  floating: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -z-10"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <motion.div 
          className="absolute top-20 left-10"
          variants={floatingVariants}
          animate="floating"
        >
          <TreeDeciduous size={100} className="text-green-600 opacity-30" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 1 }}
        >
          <Leaf size={80} className="text-emerald-500 opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 2 }}
        >
          <Sun size={90} className="text-yellow-500 opacity-30" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-16 text-center relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
              🌱 Advanced Agricultural Technology
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-br from-green-800 via-emerald-700 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
            Baghban
          </h1>
          <p className="text-2xl font-medium text-green-700 mb-4">Your Intelligent Orchard Guardian</p>
          <p className="text-lg text-muted-foreground text-center max-w-3xl leading-relaxed">
            Transform your apple orchard with cutting-edge AI technology, real-time monitoring, and expert guidance. 
            Join thousands of farmers who've increased their yield by up to 40% with Baghban.
          </p>
          
          {!user && (
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all px-8 py-3 text-lg font-semibold group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
                Watch Demo
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <stat.icon className="h-8 w-8 text-green-600 mb-2" />
                    <div className="text-3xl font-bold text-green-800">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.name} variants={itemVariants}>
              <Link to={feature.link} className="group block h-full">
                <Card className="relative overflow-hidden transition-all duration-300 group-hover:translate-y-[-8px] group-hover:shadow-2xl bg-white/90 backdrop-blur-sm border-primary/10 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                  <CardContent className="relative p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/80 shadow-md group-hover:scale-110 transition-transform">
                        <feature.icon size={32} className={`${feature.textColor}`} />
                      </div>
                      <Badge variant="secondary" className="bg-white/80 text-gray-700 text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gray-800 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Learn more 
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Orchard?
              </h2>
              <p className="text-lg text-green-100 mb-6 max-w-2xl">
                Join over 10,000 farmers worldwide who trust Baghban for smarter orchard management. 
                Start your free trial today and see results within the first week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-lg font-semibold px-8 py-3">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3">
                  Schedule Demo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 lg:w-80">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm text-green-100">Yield Increase</div>
              </motion.div>
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-green-100">Uptime</div>
              </motion.div>
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-green-100">User Rating</div>
              </motion.div>
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <CalendarDays className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-green-100">Support</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
