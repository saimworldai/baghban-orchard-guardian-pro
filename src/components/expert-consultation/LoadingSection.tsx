
import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSection() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
      </div>
    </div>
  );
}
