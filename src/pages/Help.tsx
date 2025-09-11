import React from 'react';
import { PageTransition } from '@/components/ui/professional-animations';

export default function Help() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Get help and support for your farming needs
          </p>
          <div className="text-muted-foreground">
            Help center functionality coming soon...
          </div>
        </div>
      </div>
    </PageTransition>
  );
}