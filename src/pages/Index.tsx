
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
  Shield,
  Sparkles,
  CheckCircle,
  Users,
  Globe
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
  { value: '15K+', label: 'Happy Farmers', icon: TreeDeciduous, color: 'text-green-600' },
  { value: '98%', label: 'Disease Detection Accuracy', icon: Shield, color: 'text-blue-600' },
  { value: '24/7', label: 'Expert Support', icon: UserCheck, color: 'text-purple-600' },
  { value: '45+', label: 'Countries Served', icon: Globe, color: 'text-amber-600' }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Apple Farmer, Kashmir",
    content: "Baghban increased my yield by 45% in just one season. The disease detection saved my entire crop!",
    rating: 5,
    avatar: "👨‍🌾"
  },
  {
    name: "Maria Santos",
    role: "Orchard Manager, Brazil",
    content: "The weather alerts and spray scheduling features are game-changers. Highly recommended!",
    rating: 5,
    avatar: "👩‍🌾"
  },
  {
    name: "David Chen",
    role: "Agricultural Consultant",
    content: "Best agricultural technology platform I've used. The expert consultation feature is invaluable.",
    rating: 5,
    avatar: "👨‍💼"
  }
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15
    } 
  }
};

const floatingVariants = {
  floating: {
    y: [0, -25, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Enhanced background elements with more complexity */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
      
      {/* More sophisticated background patterns */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <motion.div 
          className="absolute top-20 left-10"
          variants={floatingVariants}
          animate="floating"
        >
          <TreeDeciduous size={120} className="text-green-600 opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 1.5 }}
        >
          <Leaf size={100} className="text-emerald-500 opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 3 }}
        >
          <Sun size={110} className="text-yellow-500 opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-10"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 4.5 }}
        >
          <Sparkles size={80} className="text-purple-500 opacity-30" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center mb-20 text-center relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 text-green-800 border-green-200 px-6 py-3 text-base font-semibold shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              🌱 Next-Generation Agricultural Intelligence
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-7xl sm:text-8xl font-bold bg-gradient-to-br from-green-800 via-emerald-700 to-blue-700 bg-clip-text text-transparent mb-8 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Baghban
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-3xl font-semibold text-green-700 mb-6">Your Intelligent Orchard Guardian</p>
            <p className="text-xl text-muted-foreground text-center max-w-4xl leading-relaxed mb-8">
              Transform your apple orchard with cutting-edge AI technology, real-time monitoring, and expert guidance. 
              Join thousands of farmers who've increased their yield by up to 45% with Baghban's revolutionary platform.
            </p>
          </motion.div>
          
          {/* Enhanced feature highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { icon: CheckCircle, text: "AI-Powered Disease Detection" },
              { icon: Shield, text: "98% Accuracy Rate" },
              { icon: Users, text: "Expert Support 24/7" },
              { icon: TrendingUp, text: "Increase Yield by 45%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <item.icon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </motion.div>
          
          {!user && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
            >
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 text-xl font-bold group transform hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-10 py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                <Star className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="text-center p-8 bg-white/90 backdrop-blur-md border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className={`h-10 w-10 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid with enhanced styling */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.name} variants={itemVariants}>
              <Link to={feature.link} className="group block h-full">
                <Card className="relative overflow-hidden transition-all duration-500 group-hover:translate-y-[-12px] group-hover:shadow-2xl bg-white/95 backdrop-blur-md border-primary/10 h-full group-hover:border-primary/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  <CardContent className="relative p-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 rounded-2xl bg-white/90 shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                        <feature.icon size={36} className={`${feature.textColor}`} />
                      </div>
                      <Badge variant="secondary" className="bg-white/90 text-gray-700 text-sm font-semibold px-3 py-1">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-grow text-lg">{feature.description}</p>
                    <div className="mt-6 flex items-center text-base font-semibold text-gray-700 group-hover:text-gray-900">
                      Learn more 
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* New Testimonials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Farmers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied farmers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
              >
                <Card className="p-6 bg-white/95 backdrop-blur-md border-green-100 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Orchard?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
                Join over 15,000 farmers worldwide who trust Baghban for smarter orchard management. 
                Start your free trial today and see results within the first week.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-xl font-bold px-10 py-4 text-lg transition-all duration-300 hover:scale-105">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-4 text-lg transition-all duration-300">
                  Schedule Demo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 lg:w-96">
              {[
                { icon: TrendingUp, value: "45%", label: "Yield Increase", color: "from-yellow-400/20 to-orange-400/20" },
                { icon: Shield, value: "99.9%", label: "Uptime", color: "from-blue-400/20 to-purple-400/20" },
                { icon: Star, value: "4.9", label: "User Rating", color: "from-pink-400/20 to-red-400/20" },
                { icon: CalendarDays, value: "24/7", label: "Support", color: "from-green-400/20 to-teal-400/20" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20 shadow-lg`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="h-10 w-10 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-green-100 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
