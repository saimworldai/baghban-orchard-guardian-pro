import React from 'react';
import { DiseaseAnalyzer } from '@/components/disease-detection/DiseaseAnalyzer';

export default function DiseaseDetection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plant Disease Detection</h1>
          <p className="text-muted-foreground">
            Upload images of your plants to detect diseases and get treatment recommendations
          </p>
        </div>
        <DiseaseAnalyzer />
      </div>
    </div>
  );
}