
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import { FilterPopover } from './FilterPopover';
import { ExpertsGrid } from './ExpertsGrid';
import { NoResultsMessage } from './NoResultsMessage';
import { useExperts } from '@/hooks/useExperts';

export function ExpertsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10]);
  
  const { experts, filteredExperts, allLanguages } = useExperts({
    searchTerm,
    sortBy,
    onlyAvailable,
    selectedLanguages,
    priceRange
  });

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguages([]);
    setOnlyAvailable(false);
    setPriceRange([0, 10]);
  };

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
        />

        <SortSelect
          value={sortBy}
          onValueChange={setSortBy}
          options={sortOptions}
        />

        <FilterPopover
          onlyAvailable={onlyAvailable}
          onAvailableChange={setOnlyAvailable}
          selectedLanguages={selectedLanguages}
          onLanguageToggle={handleLanguageToggle}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          allLanguages={allLanguages}
          onClearFilters={clearFilters}
        />
      </div>

      {filteredExperts.length > 0 ? (
        <ExpertsGrid experts={filteredExperts} />
      ) : (
        <NoResultsMessage onClearFilters={clearFilters} />
      )}
    </div>
  );
}
