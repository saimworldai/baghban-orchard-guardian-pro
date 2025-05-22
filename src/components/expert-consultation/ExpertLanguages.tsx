
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface ExpertLanguagesProps {
  languages: string[];
}

export function ExpertLanguages({ languages }: ExpertLanguagesProps) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {languages.map((lang) => (
        <div key={lang} className="flex items-center">
          <Badge variant="secondary" className="text-xs bg-primary/5 flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {lang}
          </Badge>
        </div>
      ))}
    </div>
  );
}
