
import React, { useState, useEffect } from 'react';
import { Search, Mic, Camera, Zap, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function SmartSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    { icon: Camera, text: 'Scan Plant Disease', action: () => navigate('/disease-detection') },
    { icon: TrendingUp, text: 'Weather Forecast', action: () => navigate('/weather-alerts') },
    { icon: Zap, text: 'Expert Help', action: () => navigate('/expert-consultation') },
  ];

  const trendingSearches = [
    'tomato blight treatment',
    'best fertilizer timing',
    'pest control organic',
    'crop rotation tips',
    'irrigation schedule'
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = trendingSearches.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for crop diseases, weather info, expert advice..."
          className="pl-12 pr-20 py-6 text-lg rounded-full border-2 border-green-200 focus:border-green-400 bg-white/90 backdrop-blur-sm"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleVoiceSearch}
            className={`rounded-full p-2 ${isListening ? 'bg-red-100 text-red-600' : 'hover:bg-green-100'}`}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('/disease-detection')}
            className="rounded-full p-2 hover:bg-green-100"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full z-50"
          >
            <Card className="p-4 bg-white/95 backdrop-blur-md shadow-lg border border-green-200">
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-green-50"
                    onClick={() => setQuery(suggestion)}
                  >
                    <Search className="h-4 w-4 mr-2 text-green-600" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={action.action}
              className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg"
            >
              <action.icon className="h-6 w-6 mr-2" />
              {action.text}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">Trending Searches</h3>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-green-50 border-green-200 text-green-700"
              onClick={() => setQuery(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
