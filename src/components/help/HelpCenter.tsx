
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageSquare, 
  Phone, 
  Mail,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
};

type Tutorial = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  videoUrl?: string;
  steps: string[];
};

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How accurate is the weather prediction?',
    answer: 'Our weather predictions use multiple data sources and AI algorithms to provide accuracy rates of 85-95% for 24-48 hour forecasts. For spray recommendations, we use real-time data that updates every 10 minutes.',
    category: 'weather',
    helpful: 42
  },
  {
    id: '2',
    question: 'What diseases can the AI detect?',
    answer: 'Our AI can identify over 50 common orchard diseases including apple scab, fire blight, powdery mildew, brown rot, and many others. The system is continuously learning and improving its accuracy.',
    category: 'disease',
    helpful: 38
  },
  {
    id: '3',
    question: 'How much does expert consultation cost?',
    answer: 'We offer one free consultation per month. Additional consultations range from ₹49-₹99 depending on the expert and session length. Premium subscribers get unlimited consultations.',
    category: 'consultation',
    helpful: 29
  },
  {
    id: '4',
    question: 'Can I use the app offline?',
    answer: 'Basic features like disease photo capture and spray schedule viewing work offline. However, real-time weather data, AI analysis, and expert consultations require an internet connection.',
    category: 'technical',
    helpful: 33
  }
];

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with Weather Monitoring',
    description: 'Learn how to set up real-time weather tracking for your orchard',
    duration: '5 min',
    difficulty: 'beginner',
    category: 'weather',
    steps: [
      'Enable location permissions for accurate local weather',
      'Set up weather alerts for your specific needs',
      'Understand spray window recommendations',
      'Configure automatic refresh settings'
    ]
  },
  {
    id: '2',
    title: 'Disease Detection Best Practices',
    description: 'Master the art of capturing photos for accurate disease identification',
    duration: '8 min',
    difficulty: 'beginner',
    category: 'disease',
    steps: [
      'Learn proper photo techniques for disease detection',
      'Understand lighting and angle requirements',
      'Interpret AI analysis results effectively',
      'Take follow-up actions based on recommendations'
    ]
  },
  {
    id: '3',
    title: 'Optimizing Spray Schedules',
    description: 'Advanced techniques for maximizing spray effectiveness',
    duration: '12 min',
    difficulty: 'intermediate',
    category: 'spraying',
    steps: [
      'Analyze weather patterns for optimal timing',
      'Factor in wind direction and speed',
      'Consider crop growth stages',
      'Plan for maximum coverage and minimal drift'
    ]
  }
];

type HelpCenterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqData.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                Help Center
              </CardTitle>
              <Button variant="ghost" onClick={onClose}>
                ×
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Tutorials
                </TabsTrigger>
                <TabsTrigger value="guides" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Guides
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === 'weather' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('weather')}
                  >
                    Weather
                  </Button>
                  <Button
                    variant={selectedCategory === 'disease' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('disease')}
                  >
                    Disease
                  </Button>
                  <Button
                    variant={selectedCategory === 'consultation' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('consultation')}
                  >
                    Consultation
                  </Button>
                </div>

                <div className="space-y-3">
                  {filteredFAQs.map((faq) => (
                    <Card key={faq.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Star className="h-3 w-3" />
                            {faq.helpful} found helpful
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tutorials" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-800">{tutorial.title}</h4>
                          <Badge className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{tutorial.duration}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          {tutorial.steps.slice(0, 2).map((step, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {step}
                            </div>
                          ))}
                          {tutorial.steps.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{tutorial.steps.length - 2} more steps
                            </div>
                          )}
                        </div>
                        <Button size="sm" className="w-full">
                          Start Tutorial
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="guides" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Complete User Manual</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Comprehensive guide covering all features and best practices
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Book className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Quick Start Guide</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get up and running in just 5 minutes
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Online
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Mail className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                      <h4 className="font-medium text-gray-800 mb-2">Email Support</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get help within 24 hours
                      </p>
                      <Button variant="outline" size="sm">
                        support@orchardguardian.com
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Phone className="h-8 w-8 mx-auto mb-3 text-green-600" />
                      <h4 className="font-medium text-gray-800 mb-2">Phone Support</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Talk to an expert now
                      </p>
                      <Button variant="outline" size="sm">
                        +1 (555) 123-4567
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
