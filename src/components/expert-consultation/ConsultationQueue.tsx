import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, User, MapPin, Phone, MessageSquare, 
  ChevronRight, Filter, Search, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QueueItem {
  id: string;
  farmerName: string;
  location: string;
  topic: string;
  priority: 'high' | 'medium' | 'low';
  waitTime: number;
  farmType: string;
  avatar?: string;
  scheduledTime?: string;
}

interface ConsultationQueueProps {
  onSelectConsultation: (id: string) => void;
  isExpert?: boolean;
}

export function ConsultationQueue({ onSelectConsultation, isExpert = false }: ConsultationQueueProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  
  // Mock queue data
  const [queueItems] = useState<QueueItem[]>([
    {
      id: '1',
      farmerName: 'John Smith',
      location: 'Punjab, India',
      topic: 'Wheat Disease Identification',
      priority: 'high',
      waitTime: 5,
      farmType: 'Grain Farm',
      scheduledTime: '2:30 PM'
    },
    {
      id: '2',
      farmerName: 'Maria Garcia',
      location: 'Gujarat, India',
      topic: 'Cotton Pest Management',
      priority: 'medium',
      waitTime: 12,
      farmType: 'Cotton Farm'
    },
    {
      id: '3',
      farmerName: 'Rajesh Kumar',
      location: 'Karnataka, India',
      topic: 'Tomato Crop Health',
      priority: 'low',
      waitTime: 18,
      farmType: 'Vegetable Farm'
    },
    {
      id: '4',
      farmerName: 'Sarah Johnson',
      location: 'Maharashtra, India',
      topic: 'Sugarcane Irrigation Issues',
      priority: 'high',
      waitTime: 3,
      farmType: 'Sugarcane Farm',
      scheduledTime: '3:00 PM'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredItems = queueItems.filter(item => {
    const matchesSearch = item.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-primary">
            {isExpert ? 'Consultation Queue' : 'Your Position in Queue'}
          </CardTitle>
          <Badge variant="outline" className="text-primary">
            {filteredItems.length} waiting
          </Badge>
        </div>
        
        {isExpert && (
          <div className="flex gap-2 mt-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search farmers or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onSelectConsultation(item.id)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>
                        {item.farmerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && !isExpert && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{item.farmerName}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {item.topic}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.farmType}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {item.scheduledTime ? (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <Calendar className="h-3 w-3" />
                      {item.scheduledTime}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.waitTime}m wait
                    </div>
                  )}
                  
                  {isExpert ? (
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="h-7 px-2">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {index === 0 && !isExpert && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 p-2 bg-green-50 rounded-md border border-green-200"
                >
                  <p className="text-xs text-green-700 font-medium">
                    You're next! An expert will connect with you shortly.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {isExpert ? 'No consultations in queue' : 'No farmers waiting'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}