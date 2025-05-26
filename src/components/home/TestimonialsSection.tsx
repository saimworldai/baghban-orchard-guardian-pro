
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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

export function TestimonialsSection() {
  return (
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
  );
}
