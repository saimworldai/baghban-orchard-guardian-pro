
import React from 'react';
import { Star } from "lucide-react";

interface ExpertRatingProps {
  rating: number;
}

export function ExpertRating({ rating }: ExpertRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
        />
      ))}
      <span className="text-sm font-medium ml-1">{rating}</span>
    </div>
  );
}
