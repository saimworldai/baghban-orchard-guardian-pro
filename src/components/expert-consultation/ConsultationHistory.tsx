
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Download, MessageSquare, Star, ThumbsUp, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';

interface ConsultationItem {
  id: string;
  expertName: string;
  expertImage: string;
  type: 'video' | 'chat' | 'question';
  topic: string;
  date: string;
  duration?: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  notes?: string;
  rating?: number;
}

const mockConsultations: ConsultationItem[] = [
  {
    id: '1',
    expertName: 'Dr. Sarah Khan',
    expertImage: '',
    type: 'video',
    topic: 'Pest identification for apple trees',
    date: '2023-07-12T10:30:00',
    duration: '25 minutes',
    status: 'completed',
    notes: 'Identified aphids on leaves. Recommended neem oil spray in the early morning. Follow up in 7 days.',
    rating: 5,
  },
  {
    id: '2',
    expertName: 'Dr. Rajesh Kumar',
    expertImage: '',
    type: 'chat',
    topic: 'Soil nutrient management',
    date: '2023-07-05T14:15:00',
    status: 'completed',
    notes: 'Soil pH slightly acidic. Recommended adding lime and compost before monsoon season.',
    rating: 4,
  },
  {
    id: '3',
    expertName: 'Priya Sharma',
    expertImage: '',
    type: 'question',
    topic: 'When to harvest golden delicious apples?',
    date: '2023-06-28T09:00:00',
    status: 'completed',
    rating: 5,
  },
  {
    id: '4',
    expertName: 'Mohammad Farooq',
    expertImage: '',
    type: 'video',
    topic: 'Pruning techniques for mature trees',
    date: '2023-08-15T11:00:00',
    status: 'scheduled',
  },
];

export function ConsultationHistory() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  // Filter consultations based on active tab
  const filteredConsultations = mockConsultations.filter(consultation => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return consultation.status === 'completed';
    if (activeTab === 'scheduled') return consultation.status === 'scheduled';
    if (activeTab === 'video') return consultation.type === 'video';
    if (activeTab === 'chat') return consultation.type === 'chat';
    return true;
  });

  const handleStartFollowUp = (consultation: ConsultationItem) => {
    toast.info(`Starting follow-up on: ${consultation.topic}`, {
      description: `with ${consultation.expertName}`
    });
  };
  
  const handleDownloadNotes = (consultation: ConsultationItem) => {
    toast.success(`Notes from your consultation with ${consultation.expertName} downloaded`);
  };
  
  const handleRateConsultation = (consultation: ConsultationItem, rating: number) => {
    setSelectedRating(rating);
    toast.success(`Rated consultation with ${consultation.expertName} ${rating} stars`);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="scheduled">Upcoming</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredConsultations.length > 0 ? (
        <div className="space-y-4">
          {filteredConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={consultation.expertImage} />
                        <AvatarFallback className="bg-primary/10">
                          {consultation.expertName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{consultation.topic}</h4>
                        <p className="text-sm text-gray-500">with {consultation.expertName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={
                              consultation.type === 'video' ? 'bg-blue-50 text-blue-700' : 
                              consultation.type === 'chat' ? 'bg-green-50 text-green-700' : 
                              'bg-purple-50 text-purple-700'
                            }
                          >
                            {consultation.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                            {consultation.type === 'chat' && <MessageSquare className="h-3 w-3 mr-1" />}
                            {consultation.type === 'question' && <MessageSquare className="h-3 w-3 mr-1" />}
                            {consultation.type.charAt(0).toUpperCase() + consultation.type.slice(1)}
                          </Badge>
                          
                          <Badge 
                            variant="outline" 
                            className={
                              consultation.status === 'completed' ? 'bg-green-50 text-green-700' : 
                              consultation.status === 'scheduled' ? 'bg-blue-50 text-blue-700' : 
                              'bg-red-50 text-red-700'
                            }
                          >
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(consultation.date).toLocaleDateString()}
                        </span>
                      </div>
                      {consultation.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{consultation.duration}</span>
                        </div>
                      )}
                      {consultation.rating && (
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < consultation.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 p-3 flex flex-wrap gap-2">
                  {consultation.status === 'completed' && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Notes</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Consultation Notes</DialogTitle>
                            <DialogDescription>
                              {consultation.date && (
                                <span className="text-sm text-gray-500">
                                  {new Date(consultation.date).toLocaleDateString()}
                                </span>
                              )}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarFallback>{consultation.expertName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{consultation.expertName}</h4>
                                <p className="text-sm text-gray-500">{consultation.topic}</p>
                              </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-md">
                              <p>{consultation.notes || 'No notes available for this consultation.'}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleDownloadNotes(consultation)}
                            >
                              <Download className="h-4 w-4 mr-2" /> Download Notes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStartFollowUp(consultation)}
                      >
                        Follow Up
                      </Button>

                      {!consultation.rating && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" /> Rate
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rate Your Consultation</DialogTitle>
                              <DialogDescription>
                                How was your experience with {consultation.expertName}?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-center gap-2 py-4">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <Star
                                  key={rating}
                                  className={`h-10 w-10 cursor-pointer ${
                                    (selectedRating || 0) >= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                  onClick={() => handleRateConsultation(consultation, rating)}
                                />
                              ))}
                            </div>
                            <Button onClick={() => setSelectedRating(null)}>
                              <ThumbsUp className="h-4 w-4 mr-2" /> Submit Rating
                            </Button>
                          </DialogContent>
                        </Dialog>
                      )}
                    </>
                  )}
                  
                  {consultation.status === 'scheduled' && (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700" size="sm">
                        <Video className="h-4 w-4 mr-2" /> Join
                      </Button>
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Cancel</Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No consultation history found.</p>
          <Button variant="link" onClick={() => setActiveTab('all')}>
            View all consultations
          </Button>
        </div>
      )}
    </div>
  );
}
