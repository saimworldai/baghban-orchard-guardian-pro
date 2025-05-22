
import { useState, useMemo } from 'react';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
  pricePerMinute?: number;
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
  // This would typically come from an API or context
  const mockExperts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Khan',
      specialty: 'Organic Farming Expert',
      languages: ['English', 'Hindi', 'Urdu'],
      rating: 4.8,
      imageUrl: '',
      verified: true,
      available: true,
      pricePerMinute: 5,
      experience: '10+ years'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Pest Control Specialist',
      languages: ['Hindi', 'English', 'Kashmiri'],
      rating: 4.9,
      imageUrl: '',
      verified: true,
      available: false,
      pricePerMinute: 6,
      experience: '15+ years'
    },
    {
      id: '3',
      name: 'Amina Bibi',
      specialty: 'Soil Health Specialist',
      languages: ['Urdu', 'Punjabi'],
      rating: 4.7,
      imageUrl: '',
      verified: true,
      available: true,
      pricePerMinute: 4,
      experience: '8+ years'
    },
    {
      id: '4',
      name: 'Dr. Vikram Singh',
      specialty: 'Orchard Management',
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.6,
      imageUrl: '',
      verified: true,
      available: true,
      pricePerMinute: 7,
      experience: '12+ years'
    },
    {
      id: '5',
      name: 'Priya Sharma',
      specialty: 'Plant Pathology Expert',
      languages: ['Hindi', 'English'],
      rating: 4.5,
      imageUrl: '',
      verified: false,
      available: false,
      pricePerMinute: 5,
      experience: '6+ years'
    },
    {
      id: '6',
      name: 'Mohammad Farooq',
      specialty: 'Fruit Tree Specialist',
      languages: ['Kashmiri', 'Urdu', 'English'],
      rating: 4.9,
      imageUrl: '',
      verified: true,
      available: true,
      pricePerMinute: 6,
      experience: '20+ years'
    }
  ];

  const allLanguages = useMemo(() => {
    return Array.from(
      new Set(mockExperts.flatMap(expert => expert.languages))
    );
  }, []);

  // Filter and sort experts
  const filteredExperts = useMemo(() => {
    return mockExperts.filter(expert => {
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
  }, [mockExperts, searchTerm, sortBy, onlyAvailable, selectedLanguages, priceRange]);

  return {
    experts: mockExperts,
    filteredExperts,
    allLanguages
  };
}
