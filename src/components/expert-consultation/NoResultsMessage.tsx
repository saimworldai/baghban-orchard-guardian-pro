
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoResultsMessageProps {
  onClearFilters: () => void;
}

export function NoResultsMessage({ onClearFilters }: NoResultsMessageProps) {
  return (
    <div className="text-center py-8 bg-gray-50 rounded-lg">
      <p className="text-gray-500">No experts match your search criteria.</p>
      <Button 
        variant="link" 
        onClick={onClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );
}
