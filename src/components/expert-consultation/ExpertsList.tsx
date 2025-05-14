
import React, { useState } from 'react';
import { ExpertCard } from './ExpertCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const mockExperts = [
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ExpertsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10]);

  const allLanguages = Array.from(
    new Set(mockExperts.flatMap(expert => expert.languages))
  );

  // Filter and sort experts
  const filteredExperts = mockExperts.filter(expert => {
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

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search-experts">Search Experts</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              id="search-experts" 
              placeholder="Search by name or specialty..." 
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <Label htmlFor="sort-by">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
                  onCheckedChange={(checked) => setOnlyAvailable(checked === true)}
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
                      onClick={() => handleLanguageToggle(language)}
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
                    onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20"
                  />
                  <span>to</span>
                  <Input 
                    type="number" 
                    min="0" 
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value) || 10])}
                    className="w-20"
                  />
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setSelectedLanguages([]);
                  setOnlyAvailable(false);
                  setPriceRange([0, 10]);
                }}
                variant="outline" 
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {filteredExperts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No experts match your search criteria.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm('');
              setSelectedLanguages([]);
              setOnlyAvailable(false);
              setPriceRange([0, 10]);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
