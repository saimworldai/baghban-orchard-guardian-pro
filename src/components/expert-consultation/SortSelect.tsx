
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SortOption[];
  id?: string;
  label?: string;
}

export function SortSelect({ 
  value, 
  onValueChange, 
  options,
  id = "sort-by",
  label = "Sort By"
}: SortSelectProps) {
  return (
    <div className="w-full md:w-48">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
