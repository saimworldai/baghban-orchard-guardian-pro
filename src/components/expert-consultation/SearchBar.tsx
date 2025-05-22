
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  id = "search-experts",
  label = "Search Experts",
  placeholder = "Search by name or specialty..."
}: SearchBarProps) {
  return (
    <div className="flex-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          id={id} 
          placeholder={placeholder} 
          className="pl-9"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
