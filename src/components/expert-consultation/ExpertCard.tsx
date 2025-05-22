
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <ExpertAvatar imageUrl={expert.imageUrl} name={expert.name} />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{expert.name}</h3>
                <VerifiedBadge verified={expert.verified} />
              </div>
              <p className="text-sm text-gray-500">{expert.specialty}</p>
              {expert.experience && (
                <p className="text-xs text-gray-500">{expert.experience} experience</p>
              )}
              <ExpertRating rating={expert.rating} />
              <ExpertLanguages languages={expert.languages} />
              <ExpertStatus 
                available={expert.available} 
                pricePerMinute={expert.pricePerMinute} 
                verified={expert.verified} 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <ExpertActions 
            available={expert.available}
            isStartingCall={isStartingCall}
            onStartCall={handleStartCall}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
