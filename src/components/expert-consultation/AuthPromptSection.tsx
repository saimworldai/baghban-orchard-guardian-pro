
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AuthPromptSection() {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 max-w-3xl"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full -ml-32 -mb-32 opacity-20"></div>
        
        <CardContent className="p-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-4">
              Expert Consultation
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Connect with agricultural experts to get personalized advice for your orchard management needs.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6 mt-8">
            <Button 
              className="w-full max-w-sm bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Sign in to access expert consultation
            </Button>
            
            <Button 
              variant="outline" 
              className="border-green-200 text-green-700 hover:bg-green-50"
              onClick={() => navigate('/')}
            >
              Return to home page
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
