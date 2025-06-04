
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Thermometer, 
  Activity, 
  Users, 
  Calendar,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  content: React.ReactNode;
};

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Orchard Guardian Pro',
    description: 'Your AI-powered companion for smart orchard management',
    icon: CheckCircle,
    position: 'center',
    content: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Let's get you started!</h3>
        <p className="text-gray-600">
          We'll show you around the key features that will help you manage your orchard more effectively.
        </p>
      </div>
    )
  },
  {
    id: 'weather',
    title: 'Real-time Weather Intelligence',
    description: 'Monitor weather conditions with AI-powered spray recommendations',
    icon: Thermometer,
    position: 'center',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Thermometer className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Weather Monitoring</h4>
            <p className="text-sm text-gray-600">Get real-time weather data and spray window recommendations</p>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Pro Tip:</strong> Check the spray window indicator before any application. 
            Green means optimal conditions!
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'disease',
    title: 'AI Disease Detection',
    description: 'Scan and identify plant diseases instantly with your camera',
    icon: Activity,
    position: 'center',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Disease Detection</h4>
            <p className="text-sm text-gray-600">Upload photos for instant AI-powered disease analysis</p>
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Best Practice:</strong> Take clear, well-lit photos of affected leaves or fruits 
            for the most accurate results.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'experts',
    title: 'Expert Consultation',
    description: 'Connect with agricultural experts for personalized advice',
    icon: Users,
    position: 'center',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Expert Consultation</h4>
            <p className="text-sm text-gray-600">Video calls with certified agricultural experts</p>
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>Available 24/7:</strong> Our experts are here to help with pest management, 
            disease treatment, and optimization strategies.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'schedule',
    title: 'Smart Spray Scheduling',
    description: 'Plan and optimize your spray applications',
    icon: Calendar,
    position: 'center',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Spray Scheduling</h4>
            <p className="text-sm text-gray-600">AI-optimized scheduling based on weather and crop needs</p>
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-800">
            <strong>Smart Recommendations:</strong> The system considers weather patterns, 
            wind conditions, and optimal application windows.
          </p>
        </div>
      </div>
    )
  }
];

type OnboardingTourProps = {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
};

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  isVisible, 
  onComplete, 
  onSkip 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
      setIsAnimating(false);
    }, 200);
  };

  const prevStep = () => {
    if (isAnimating || currentStep === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setIsAnimating(false);
    }, 200);
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          <Card className="shadow-2xl border-0">
            <CardContent className="p-0">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-t-lg overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSkip}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {step.content}
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <div className="p-6 border-t bg-gray-50 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {currentStep + 1} of {onboardingSteps.length}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Step {currentStep + 1}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={prevStep}
                      disabled={currentStep === 0 || isAnimating}
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    
                    <Button
                      onClick={nextStep}
                      disabled={isAnimating}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                    >
                      {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
