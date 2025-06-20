
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, Globe, Heart } from 'lucide-react';

export function AuthPromptSection() {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 max-w-4xl"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full -ml-32 -mb-32 opacity-20"></div>
        
        <CardContent className="p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-4">
              Expert Consultation Hub
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Connect with experienced agricultural experts for personalized advice on crop management, 
              disease prevention, and sustainable farming practices.
            </p>
          </div>

          {/* Free Access Notice */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Free for Everyone!</h3>
            </div>
            <p className="text-green-700 mb-4">
              🌱 All consultation features are completely free<br />
              💬 Chat with experts anytime<br />
              📚 Access knowledge base and resources<br />
              🤝 Join our farming community
            </p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Heart className="h-4 w-4" />
              <span>Built with love for farmers worldwide</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 border border-green-200 rounded-xl hover:shadow-md transition-shadow">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Start Consultation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get instant access to expert advice and community discussions
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                size="lg"
                onClick={() => navigate('/expert-consultation')}
              >
                Access Now (Free)
              </Button>
            </div>

            <div className="text-center p-6 border border-blue-200 rounded-xl hover:shadow-md transition-shadow">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Join Community</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with fellow farmers and share experiences
              </p>
              <Button 
                variant="outline" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                size="lg"
                onClick={() => navigate('/auth')}
              >
                Create Account (Optional)
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
