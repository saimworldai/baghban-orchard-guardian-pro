
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ExpertsList, VideoCall, AskQuestion, ScheduleConsultation } from './index';
import { motion, AnimatePresence } from 'framer-motion';

interface TabContentsProps {
  activeTab: string;
}

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    rotateX: -10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function TabContents({ activeTab }: TabContentsProps) {
  const tabConfigs = {
    experts: {
      component: ExpertsList,
      gradient: "from-amber-50/80 to-yellow-50/80",
      border: "border-amber-200/50",
      shadow: "shadow-amber-100/50"
    },
    video: {
      component: VideoCall,
      gradient: "from-blue-50/80 to-cyan-50/80",
      border: "border-blue-200/50",
      shadow: "shadow-blue-100/50"
    },
    chat: {
      component: AskQuestion,
      gradient: "from-purple-50/80 to-violet-50/80",
      border: "border-purple-200/50",
      shadow: "shadow-purple-100/50"
    },
    schedule: {
      component: ScheduleConsultation,
      gradient: "from-emerald-50/80 to-green-50/80",
      border: "border-emerald-200/50",
      shadow: "shadow-emerald-100/50"
    }
  };

  return (
    <AnimatePresence mode="wait">
      {Object.entries(tabConfigs).map(([tabKey, config]) => {
        const Component = config.component;
        return (
          <TabsContent key={tabKey} value={tabKey} className="mt-6">
            {activeTab === tabKey && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.div
                  variants={contentVariants}
                  className={`
                    bg-gradient-to-br ${config.gradient}
                    backdrop-blur-xl p-8 rounded-2xl 
                    shadow-2xl ${config.shadow}
                    border ${config.border}
                    relative overflow-hidden
                    hover:shadow-3xl transition-all duration-500
                  `}
                >
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <Component />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </TabsContent>
        );
      })}
    </AnimatePresence>
  );
}
