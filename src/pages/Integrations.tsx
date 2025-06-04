
import React from 'react';
import { motion } from 'framer-motion';
import { ThirdPartyIntegrations } from '@/components/integration/ThirdPartyIntegrations';

const Integrations: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50"
    >
      <div className="container mx-auto px-4 py-8">
        <ThirdPartyIntegrations />
      </div>
    </motion.div>
  );
};

export default Integrations;
