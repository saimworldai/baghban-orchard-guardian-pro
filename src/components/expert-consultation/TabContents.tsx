
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ExpertsList, VideoCall, AskQuestion, ScheduleConsultation } from './index';
import { motion } from 'framer-motion';

interface TabContentsProps {
  activeTab: string;
}

export function TabContents({ activeTab }: TabContentsProps) {
  return (
    <>
      <TabsContent value="experts" className="mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ExpertsList />
        </motion.div>
      </TabsContent>

      <TabsContent value="video" className="mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VideoCall />
        </motion.div>
      </TabsContent>

      <TabsContent value="chat" className="mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AskQuestion />
        </motion.div>
      </TabsContent>

      <TabsContent value="schedule" className="mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ScheduleConsultation />
        </motion.div>
      </TabsContent>
    </>
  );
}
