
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star, Quote, TreeDeciduous, Users, Award, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Apple Farmer, Kashmir",
    content: "Baghban increased my yield by 45% in just one season. The disease detection saved my entire crop!",
    rating: 5,
    avatar: "👨‍🌾",
    icon: TreeDeciduous,
    color: "from-green-500 to-emerald-500",
    location: "Kashmir, India"
  },
  {
    name: "Maria Santos",
    role: "Orchard Manager, Brazil", 
    content: "The weather alerts and spray scheduling features are game-changers. Highly recommended!",
    rating: 5,
    avatar: "👩‍🌾",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    location: "São Paulo, Brazil"
  },
  {
    name: "David Chen",
    role: "Agricultural Consultant",
    content: "Best agricultural technology platform I've used. The expert consultation feature is invaluable.",
    rating: 5,
    avatar: "👨‍💼",
    icon: Award,
    color: "from-purple-500 to-indigo-500",
    location: "California, USA"
  }
];

export function TestimonialsSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-6"
        >
          <Star className="h-4 w-4 text-amber-600 fill-current" />
          <span className="text-sm font-semibold text-amber-800">Customer Stories</span>
        </motion.div>
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
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Card className="p-6 bg-white/95 backdrop-blur-md border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color}`} />
              
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className={`p-2 bg-gradient-to-br ${testimonial.color.replace('500', '100')} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <testimonial.icon className={`h-4 w-4 bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`} />
                  </motion.div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.6 + index * 0.2 + i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-gray-300" />
                  <p className="text-gray-700 italic pl-6 leading-relaxed">"{testimonial.content}"</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Verified Customer</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active User</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.9/5</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">15,000+ Reviews</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
