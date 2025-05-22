
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ExpertStatusProps {
  available: boolean;
  pricePerMinute?: number;
  verified?: boolean;
}

export function ExpertStatus({ available, pricePerMinute, verified }: ExpertStatusProps) {
  // Price display helper
  const getPriceDisplay = () => {
    if (!pricePerMinute) return null;
    
    return (
      <div className="mt-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full inline-flex items-center">
        <span>₹{pricePerMinute}/min</span>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2 mt-1">
      {available ? (
        <Badge className="bg-green-100 text-green-800 border-green-200">Available Now</Badge>
      ) : (
        <Badge variant="outline" className="text-gray-500">Unavailable</Badge>
      )}
      {getPriceDisplay()}
    </div>
  );
}
