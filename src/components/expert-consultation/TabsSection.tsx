
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Video, MessageSquare, Calendar } from "lucide-react";
import { ExpertsList, VideoCall, AskQuestion, ScheduleConsultation } from './index';

export function TabsSection() {
  return (
    <Tabs defaultValue="experts" className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-green-50/50">
        <TabsTrigger value="experts" className="data-[state=active]:bg-green-100">
          <Star className="mr-2 h-4 w-4" />
          Experts
        </TabsTrigger>
        <TabsTrigger value="video" className="data-[state=active]:bg-green-100">
          <Video className="mr-2 h-4 w-4" />
          Video Call
        </TabsTrigger>
        <TabsTrigger value="chat" className="data-[state=active]:bg-green-100">
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask Question
        </TabsTrigger>
        <TabsTrigger value="schedule" className="data-[state=active]:bg-green-100">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </TabsTrigger>
      </TabsList>

      <TabsContent value="experts">
        <ExpertsList />
      </TabsContent>

      <TabsContent value="video">
        <VideoCall />
      </TabsContent>

      <TabsContent value="chat">
        <AskQuestion />
      </TabsContent>

      <TabsContent value="schedule">
        <ScheduleConsultation />
      </TabsContent>
    </Tabs>
  );
}
