
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let className = "";
  
  switch(status) {
    case 'pending':
      className = "bg-yellow-50 text-yellow-700 border-yellow-200";
      break;
    case 'scheduled':
      className = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case 'in_progress':
      className = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case 'completed':
      className = "bg-green-50 text-green-700 border-green-200";
      break;
    case 'cancelled':
      className = "bg-red-50 text-red-700 border-red-200";
      break;
  }
  
  return (
    <Badge variant="outline" className={className}>
      {status.replace('_', ' ')}
    </Badge>
  );
}
