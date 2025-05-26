
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Video, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';

interface TabTriggersProps {
  activeTab: string;
}

export function TabTriggers({ activeTab }: TabTriggersProps) {
  const tabs = [
    { 
      value: "experts", 
      icon: Star, 
      label: "Experts",
      gradient: "from-amber-200 to-yellow-100",
      iconColor: "text-amber-600",
      activeGradient: "from-amber-300 to-yellow-200"
    },
    { 
      value: "video", 
      icon: Video, 
      label: "Video Call",
      gradient: "from-blue-200 to-cyan-100",
      iconColor: "text-blue-600",
      activeGradient: "from-blue-300 to-cyan-200"
    },
    { 
      value: "chat", 
      icon: MessageSquare, 
      label: "Ask Question",
      gradient: "from-purple-200 to-violet-100",
      iconColor: "text-purple-600",
      activeGradient: "from-purple-300 to-violet-200"
    },
    { 
      value: "schedule", 
      icon: Calendar, 
      label: "Schedule",
      gradient: "from-emerald-200 to-green-100",
      iconColor: "text-emerald-600",
      activeGradient: "from-emerald-300 to-green-200"
    }
  ];

  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gradient-to-r from-green-50/80 via-blue-50/80 to-purple-50/80 p-3 rounded-2xl shadow-lg backdrop-blur-md border border-white/20">
      {tabs.map((tab) => (
        <TabsTrigger 
          key={tab.value}
          value={tab.value} 
          className={`
            relative overflow-hidden
            data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.activeGradient}
            data-[state=active]:shadow-lg data-[state=active]:border-white/30
            hover:bg-gradient-to-r hover:${tab.gradient}
            transition-all duration-300 py-4 px-3
            group border border-transparent
            data-[state=active]:scale-105 hover:scale-102
            rounded-xl
          `}
        >
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-2"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <tab.icon className={`h-5 w-5 ${tab.iconColor} group-hover:scale-110 transition-transform duration-300`} />
              {activeTab === tab.value && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                </motion.div>
              )}
            </div>
            <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
              {tab.label}
            </span>
          </motion.div>
          
          {/* Active indicator */}
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white/20 rounded-xl border-2 border-white/40"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
