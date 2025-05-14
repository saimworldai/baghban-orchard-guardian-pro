
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Leaf, BookOpen, Share, BookmarkPlus, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from '@/components/ui/sonner';

interface Tip {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'seasonal' | 'pest' | 'disease' | 'nutrition' | 'general';
  date: string;
  source: string;
}

const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Prepare Your Orchard for Winter',
    content: "Apply a layer of mulch around the base of your trees to insulate roots from freezing temperatures. Ensure it's 3-4 inches thick but kept away from direct contact with the trunk to prevent rot and pest issues.",
    imageUrl: '/placeholder.svg',
    category: 'seasonal',
    date: '2023-11-01',
    source: 'Kashmir Agricultural Department'
  },
  {
    id: '2',
    title: 'Early Signs of Apple Scab',
    content: 'Watch for olive-green spots on leaves that later turn dark and scabby. Early detection allows for targeted treatment before the disease spreads throughout your orchard.',
    imageUrl: '/placeholder.svg',
    category: 'disease',
    date: '2023-10-25',
    source: 'Plant Pathology Institute'
  },
  {
    id: '3',
    title: 'Natural Pest Control Methods',
    content: 'Introduce ladybugs to your orchard to control aphid populations. One ladybug can consume up to 50 aphids per day, providing effective and chemical-free pest management.',
    imageUrl: '/placeholder.svg',
    category: 'pest',
    date: '2023-10-18',
    source: 'Organic Farming Association'
  },
  {
    id: '4',
    title: 'Optimizing Nitrogen Application',
    content: 'Apply nitrogen fertilizers in early spring just as buds begin to break. This timing maximizes uptake efficiency and supports robust leaf development essential for photosynthesis.',
    imageUrl: '/placeholder.svg',
    category: 'nutrition',
    date: '2023-10-10',
    source: 'Agricultural University Research'
  }
];

const getCategoryStyles = (category: string) => {
  switch(category) {
    case 'seasonal':
      return { bg: 'bg-blue-100', text: 'text-blue-800', icon: CalendarDays };
    case 'pest':
      return { bg: 'bg-red-100', text: 'text-red-800', icon: Leaf };
    case 'disease':
      return { bg: 'bg-orange-100', text: 'text-orange-800', icon: Leaf };
    case 'nutrition':
      return { bg: 'bg-green-100', text: 'text-green-800', icon: Leaf };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', icon: BookOpen };
  }
};

export function DailyTipsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [savedTips, setSavedTips] = useState<string[]>([]);

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTips.length);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mockTips.length) % mockTips.length);
  };

  const handleSaveTip = (tip: Tip) => {
    if (savedTips.includes(tip.id)) {
      setSavedTips(savedTips.filter(id => id !== tip.id));
      toast.info("Removed from saved tips");
    } else {
      setSavedTips([...savedTips, tip.id]);
      toast.success("Saved to your favorites");
    }
  };

  const handleShareTip = (tip: Tip) => {
    toast.success("Tip ready to share", {
      description: "Share link copied to clipboard"
    });
    // In a real app, this would generate a shareable link or open a share dialog
  };

  const variants = {
    enter: (direction: 'right' | 'left') => {
      return {
        x: direction === 'right' ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: 'right' | 'left') => {
      return {
        zIndex: 0,
        x: direction === 'right' ? -100 : 100,
        opacity: 0
      };
    }
  };

  const currentTip = mockTips[currentIndex];
  const categoryStyle = getCategoryStyles(currentTip.category);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <BookOpen className="h-5 w-5 text-green-600" />
          Daily Expert Tips
        </h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <Card className="border-primary/10">
              {currentTip.imageUrl && (
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={currentTip.imageUrl}
                      alt={currentTip.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  <Badge 
                    className={`absolute top-2 left-2 ${categoryStyle.bg} ${categoryStyle.text}`}
                  >
                    <categoryStyle.icon className="h-3 w-3 mr-1" />
                    {currentTip.category.charAt(0).toUpperCase() + currentTip.category.slice(1)}
                  </Badge>
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">{currentTip.title}</h3>
                <p className="text-gray-600">{currentTip.content}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Source: {currentTip.source}</p>
                  <p>Published: {new Date(currentTip.date).toLocaleDateString()}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-between p-3">
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleShareTip(currentTip)}
                  >
                    <Share className="h-4 w-4 mr-1" /> Share
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSaveTip(currentTip)}
                  >
                    <BookmarkPlus className={`h-4 w-4 mr-1 ${savedTips.includes(currentTip.id) ? "fill-primary text-primary" : ""}`} />
                    {savedTips.includes(currentTip.id) ? "Saved" : "Save"}
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  {currentIndex + 1} of {mockTips.length}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
