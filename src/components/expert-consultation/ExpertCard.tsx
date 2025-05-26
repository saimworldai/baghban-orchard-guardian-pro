
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { ExpertAvatar } from './ExpertAvatar';
import { ExpertRating } from './ExpertRating';
import { ExpertLanguages } from './ExpertLanguages';
import { ExpertStatus } from './ExpertStatus';
import { ExpertActions } from './ExpertActions';
import { VerifiedBadge } from './VerifiedBadge';
import { useExpertCall } from '@/hooks/useExpertCall';
import { Sparkles, Award } from 'lucide-react';

interface ExpertProps {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
  pricePerMinute?: number;
  experience?: string;
}

export function ExpertCard({ expert }: { expert: ExpertProps }) {
  const { isStartingCall, startCall } = useExpertCall();

  const handleStartCall = () => {
    startCall(expert.id, expert.name, expert.available);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400 }
      }}
      className="group"
    >
      <Card className="relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border-2 border-primary/10 hover:border-primary/20 h-full shadow-lg hover:shadow-2xl">
        {/* Premium indicator for verified experts */}
        {expert.verified && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 p-2 rounded-full shadow-lg"
            >
              <Award className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        )}

        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-blue-50/20 to-purple-50/30 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <CardContent className="relative pt-8 pb-6 px-6">
          <div className="flex items-start gap-5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ExpertAvatar imageUrl={expert.imageUrl} name={expert.name} />
            </motion.div>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <motion.h3 
                  className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {expert.name}
                </motion.h3>
                <VerifiedBadge verified={expert.verified} />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full inline-block">
                  {expert.specialty}
                </p>
              </motion.div>
              
              {expert.experience && (
                <motion.p 
                  className="text-xs text-gray-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  {expert.experience} experience
                </motion.p>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ExpertRating rating={expert.rating} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ExpertLanguages languages={expert.languages} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <ExpertStatus 
                  available={expert.available} 
                  pricePerMinute={expert.pricePerMinute} 
                  verified={expert.verified} 
                />
              </motion.div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-0 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full"
          >
            <ExpertActions 
              available={expert.available}
              isStartingCall={isStartingCall}
              onStartCall={handleStartCall}
            />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
