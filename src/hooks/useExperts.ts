
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  image_url: string | null;
  verified: boolean;
  available: boolean;
  price_per_minute?: number;
  experience?: string;
}

interface UseExpertsFilters {
  searchTerm: string;
  sortBy: string;
  onlyAvailable: boolean;
  selectedLanguages: string[];
  priceRange: number[];
}

export function useExperts({ 
  searchTerm, 
  sortBy, 
  onlyAvailable, 
  selectedLanguages, 
  priceRange 
}: UseExpertsFilters) {
  const { data: experts = [], isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) {
        console.error('Error fetching experts:', error);
        return [];
      }
      
      return data.map(expert => ({
        id: expert.id,
        name: expert.name,
        specialty: expert.specialty,
        languages: expert.languages,
        rating: expert.rating,
        imageUrl: expert.image_url || '',
        verified: expert.verified,
        available: expert.available,
        pricePerMinute: expert.price_per_minute,
        experience: expert.experience
      }));
    },
  });

  const allLanguages = useMemo(() => {
    return Array.from(
      new Set(experts.flatMap(expert => expert.languages))
    );
  }, [experts]);

  // Filter and sort experts
  const filteredExperts = useMemo(() => {
    return experts.filter(expert => {
      // Filter by search term
      const matchesSearch = 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by availability
      const matchesAvailability = onlyAvailable ? expert.available : true;
      
      // Filter by language
      const matchesLanguage = 
        selectedLanguages.length === 0 || 
        selectedLanguages.some(lang => expert.languages.includes(lang));
      
      // Filter by price
      const matchesPrice = 
        expert.pricePerMinute !== undefined &&
        expert.pricePerMinute >= priceRange[0] && 
        expert.pricePerMinute <= priceRange[1];
      
      return matchesSearch && matchesAvailability && matchesLanguage && matchesPrice;
    }).sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return (a.pricePerMinute || 0) - (b.pricePerMinute || 0);
        case 'price_desc':
          return (b.pricePerMinute || 0) - (a.pricePerMinute || 0);
        default:
          return 0;
      }
    });
  }, [experts, searchTerm, sortBy, onlyAvailable, selectedLanguages, priceRange]);

  return {
    experts,
    filteredExperts,
    allLanguages,
    isLoading
  };
}
