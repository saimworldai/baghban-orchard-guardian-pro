
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LanguageSupport } from './LanguageSupport';

export function AdvancedFeaturesSection() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Advanced Features</h2>
        <Button 
          variant="ghost" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-green-700 hover:text-green-800 hover:bg-green-50"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Features
        </Button>
      </div>
      
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <LanguageSupport />
          
          <Card className="border-green-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Consultation Pricing</h3>
              
              <Tabs defaultValue="plans">
                <TabsList className="mb-4 bg-gray-100">
                  <TabsTrigger value="plans" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Plans</TabsTrigger>
                  <TabsTrigger value="discounts" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">Discounts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="plans" className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">Basic Plan</h4>
                    <p className="text-sm text-green-700">1 free consultation per month</p>
                    <p className="mt-2 font-bold text-green-800">₹0</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">Pay Per Consultation</h4>
                    <p className="text-sm text-blue-700">After your free monthly consultation</p>
                    <p className="mt-2 font-bold text-blue-800">₹49 - ₹99 per session</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800">Premium Plan</h4>
                    <p className="text-sm text-purple-700">Unlimited consultations</p>
                    <p className="mt-2 font-bold text-purple-800">₹499 per month</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="discounts" className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800">Early Booking</h4>
                    <p className="text-sm text-amber-700">Book 3+ days in advance</p>
                    <p className="mt-2 font-bold text-amber-800">10% OFF</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                    <h4 className="font-medium text-teal-800">Refer-a-Friend</h4>
                    <p className="text-sm text-teal-700">When a referred friend joins</p>
                    <p className="mt-2 font-bold text-teal-800">1 Free Consultation</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800">Government Subsidy</h4>
                    <p className="text-sm text-indigo-700">For eligible farmers</p>
                    <p className="mt-2 font-bold text-indigo-800">Up to 75% OFF</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
