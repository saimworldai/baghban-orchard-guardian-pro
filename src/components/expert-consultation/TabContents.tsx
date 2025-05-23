
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ExpertsList, VideoCall, AskQuestion, ScheduleConsultation } from './index';

interface TabContentsProps {
  activeTab: string;
}

export function TabContents({ activeTab }: TabContentsProps) {
  return (
    <>
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
    </>
  );
}
