
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 cursor-help">
          <ShieldCheck className="h-3 w-3 mr-1" /> Verified
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Verified Expert</h4>
            <p className="text-sm">
              This expert has been verified by our team. They have proven expertise in their field and maintain high service standards.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
