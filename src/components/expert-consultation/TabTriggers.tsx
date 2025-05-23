
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Video, MessageSquare, Calendar } from "lucide-react";

interface TabTriggersProps {
  activeTab: string;
}

export function TabTriggers({ activeTab }: TabTriggersProps) {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gradient-to-r from-green-50/70 to-blue-50/70 p-1 rounded-xl shadow-sm">
      <TabsTrigger 
        value="experts" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-green-50 data-[state=active]:shadow-sm transition-all duration-300"
      >
        <Star className="mr-2 h-4 w-4" />
        Experts
      </TabsTrigger>
      <TabsTrigger 
        value="video" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-green-50 data-[state=active]:shadow-sm transition-all duration-300"
      >
        <Video className="mr-2 h-4 w-4" />
        Video Call
      </TabsTrigger>
      <TabsTrigger 
        value="chat" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-green-50 data-[state=active]:shadow-sm transition-all duration-300"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Ask Question
      </TabsTrigger>
      <TabsTrigger 
        value="schedule" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-green-50 data-[state=active]:shadow-sm transition-all duration-300"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Schedule
      </TabsTrigger>
    </TabsList>
  );
}
