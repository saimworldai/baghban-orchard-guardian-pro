
import React from 'react';
import { ConsultationHistory } from './index';

export function HistorySection() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Consultations</h2>
      <ConsultationHistory />
    </div>
  );
}
