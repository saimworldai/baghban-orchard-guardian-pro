
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ExpertsList, VideoCall, AskQuestion, ScheduleConsultation } from './index';
import { motion } from 'framer-motion';

interface TabContentsProps {
  activeTab: string;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

export function TabContents({ activeTab }: TabContentsProps) {
  return (
    <>
      <TabsContent value="experts" className="mt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          key="experts"
          className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-100"
        >
          <ExpertsList />
        </motion.div>
      </TabsContent>

      <TabsContent value="video" className="mt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          key="video"
          className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-100"
        >
          <VideoCall />
        </motion.div>
      </TabsContent>

      <TabsContent value="chat" className="mt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          key="chat"
          className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-purple-100"
        >
          <AskQuestion />
        </motion.div>
      </TabsContent>

      <TabsContent value="schedule" className="mt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          key="schedule"
          className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-amber-100"
        >
          <ScheduleConsultation />
        </motion.div>
      </TabsContent>
    </>
  );
}
