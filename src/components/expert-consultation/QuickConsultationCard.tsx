import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Video, MessageSquare, Phone, Star, Clock, 
  Languages, MapPin, Award, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useExpertCall } from '@/hooks/useExpertCall';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  languages: string[];
  available: boolean;
  responseTime: string;
  location: string;
  verified: boolean;
  experience: string;
  consultations: number;
  imageUrl?: string;
}

interface QuickConsultationCardProps {
  expert: Expert;
  onStartCall?: (expertId: string) => void;
  onStartChat?: (expertId: string) => void;
}

export function QuickConsultationCard({ 
  expert, 
  onStartCall, 
  onStartChat 
}: QuickConsultationCardProps) {
  const { isStartingCall, startCall } = useExpertCall();
  const [isHovered, setIsHovered] = useState(false);

  const handleVideoCall = () => {
    if (onStartCall) {
      onStartCall(expert.id);
    } else {
      startCall(expert.id, expert.name, expert.available);
    }
  };

  const handleChat = () => {
    if (onStartChat) {
      onStartChat(expert.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="pb-4 relative">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={expert.imageUrl} alt={expert.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {expert.available && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
              
              {expert.verified && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-5 h-5 text-blue-500 bg-background rounded-full" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {expert.name}
                </h3>
                {expert.verified && (
                  <Award className="w-4 h-4 text-blue-500" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {expert.specialty}
              </p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{expert.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {expert.consultations}+ consultations
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {expert.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {expert.responseTime}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 relative">
          <div className="space-y-4">
            {/* Languages */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1 flex-wrap">
                {expert.languages.slice(0, 3).map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
                {expert.languages.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{expert.languages.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Experience */}
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{expert.experience}</span> of experience
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleVideoCall}
                disabled={!expert.available || isStartingCall}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                {isStartingCall ? (
                  <>Connecting...</>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleChat}
                variant="outline"
                size="sm"
                className="flex-1 border-primary/30 hover:bg-primary/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="px-3 border-primary/30 hover:bg-primary/10"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
            
            {!expert.available && (
              <div className="text-center py-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Currently unavailable
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Hover effect indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </Card>
    </motion.div>
  );
}