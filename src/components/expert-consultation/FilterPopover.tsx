
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SlidersHorizontal } from 'lucide-react';

interface FilterPopoverProps {
  onlyAvailable: boolean;
  onAvailableChange: (checked: boolean) => void;
  selectedLanguages: string[];
  onLanguageToggle: (language: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  allLanguages: string[];
  onClearFilters: () => void;
}

export function FilterPopover({
  onlyAvailable,
  onAvailableChange,
  selectedLanguages,
  onLanguageToggle,
  priceRange,
  onPriceRangeChange,
  allLanguages,
  onClearFilters
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Filter Options</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="available" 
              checked={onlyAvailable} 
              onCheckedChange={(checked) => onAvailableChange(checked === true)}
            />
            <label htmlFor="available" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Only show available experts
            </label>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {allLanguages.map(language => (
                <div
                  key={language}
                  className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                    selectedLanguages.includes(language) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                  onClick={() => onLanguageToggle(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Price Range (₹ per minute)</h4>
            <div className="flex items-center space-x-4">
              <Input 
                type="number" 
                min="0" 
                value={priceRange[0]}
                onChange={e => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20"
              />
              <span>to</span>
              <Input 
                type="number" 
                min="0" 
                value={priceRange[1]}
                onChange={e => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 10])}
                className="w-20"
              />
            </div>
          </div>
          
          <Button 
            onClick={onClearFilters}
            variant="outline" 
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
