
import React from 'react';
import { motion } from 'framer-motion';
import { ConsultantDashboard } from './index';

export function ConsultantDashboardView() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 mb-6 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-green-800 mb-2">Consultant Dashboard</h1>
        <p className="text-green-600">Manage your consultations and help farmers with their queries</p>
      </motion.div>
      <ConsultantDashboard />
    </div>
  );
}
