
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

interface HeaderSectionProps {
  onStartCall: () => void;
}

export function HeaderSection({ onStartCall }: HeaderSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-green-800">Expert Consultation</h1>
        <p className="text-green-600">Get professional advice from verified agricultural experts</p>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          🎁 First Consultation Free!
        </Badge>
      </div>
      <Button
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg"
        onClick={onStartCall}
      >
        <Video className="h-5 w-5" />
        Call an Agri-Doctor Now
      </Button>
    </div>
  );
}
