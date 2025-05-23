
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { TabTriggers } from './TabTriggers';
import { TabContents } from './TabContents';

interface TabsSectionProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TabsSection({ activeTab: propActiveTab, onTabChange }: TabsSectionProps) {
  const [localActiveTab, setLocalActiveTab] = useState<string>(propActiveTab || 'experts');
  
  const handleTabChange = (value: string) => {
    setLocalActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  const activeTab = propActiveTab || localActiveTab;
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabTriggers activeTab={activeTab} />
      <TabContents activeTab={activeTab} />
    </Tabs>
  );
}
