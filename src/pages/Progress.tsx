import React from 'react';
import { PageTransition } from '@/components/ui/professional-animations';
import { FarmingProgress } from '@/components/gamification/FarmingProgress';

export default function Progress() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto py-8">
          <FarmingProgress />
        </div>
      </div>
    </PageTransition>
  );
}