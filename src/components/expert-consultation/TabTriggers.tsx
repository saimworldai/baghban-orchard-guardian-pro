
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Video, MessageSquare, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

interface TabTriggersProps {
  activeTab: string;
}

export function TabTriggers({ activeTab }: TabTriggersProps) {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gradient-to-r from-green-50/70 to-blue-50/70 p-2 rounded-xl shadow-md">
      <TabsTrigger 
        value="experts" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-200 data-[state=active]:to-green-100 data-[state=active]:shadow-md transition-all duration-300 py-3"
      >
        <Star className="mr-2 h-5 w-5 text-amber-500" />
        <span className="font-medium">Experts</span>
      </TabsTrigger>
      <TabsTrigger 
        value="video" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-200 data-[state=active]:to-blue-100 data-[state=active]:shadow-md transition-all duration-300 py-3"
      >
        <Video className="mr-2 h-5 w-5 text-blue-500" />
        <span className="font-medium">Video Call</span>
      </TabsTrigger>
      <TabsTrigger 
        value="chat" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-200 data-[state=active]:to-purple-100 data-[state=active]:shadow-md transition-all duration-300 py-3"
      >
        <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />
        <span className="font-medium">Ask Question</span>
      </TabsTrigger>
      <TabsTrigger 
        value="schedule" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-200 data-[state=active]:to-amber-100 data-[state=active]:shadow-md transition-all duration-300 py-3"
      >
        <Calendar className="mr-2 h-5 w-5 text-orange-500" />
        <span className="font-medium">Schedule</span>
      </TabsTrigger>
    </TabsList>
  );
}
