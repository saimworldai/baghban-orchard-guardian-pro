
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, Sprout, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
  timestamp: string;
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: { name: 'Maria Santos', verified: true },
    content: 'Just harvested my first organic tomatoes using the disease detection feature! The yield increased by 40% compared to last season. 🍅',
    likes: 24,
    comments: 8,
    tags: ['organic', 'tomatoes', 'success'],
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    author: { name: 'Ahmed Hassan', verified: false },
    content: 'Weather alerts saved my crops from unexpected frost last night. Thank you Baghban Guardian! ❄️',
    likes: 18,
    comments: 5,
    tags: ['weather', 'frost', 'protection'],
    timestamp: '5 hours ago'
  }
];

export function CommunityFeed() {
  const [posts] = useState<CommunityPost[]>(mockPosts);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Community Success Stories</h2>
        <p className="text-gray-600">See how farmers worldwide are using Baghban Guardian</p>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{post.author.name}</h4>
                      {post.author.verified && (
                        <Award className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{post.content}</p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <Sprout className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">Share Your Success</h3>
          <p className="text-gray-600 mb-4">
            Help inspire other farmers by sharing your farming journey and achievements!
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Share Your Story
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
