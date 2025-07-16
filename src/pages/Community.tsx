import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Camera, Search, TrendingUp, Users, Award, Plus } from 'lucide-react';

const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Sarah Garden',
      avatar: '🌸',
      level: 'Plant Parent Pro',
      posts: 127
    },
    content: 'My monstera finally got its first fenestration! 🎉 It took almost 2 years but the patience paid off. Here are some tips that helped...',
    image: '🌿',
    likes: 42,
    comments: 15,
    timeAgo: '2 hours ago',
    tags: ['monstera', 'houseplants', 'milestone']
  },
  {
    id: 2,
    author: {
      name: 'Tom Green',
      avatar: '🌱',
      level: 'Beginner Gardener',
      posts: 23
    },
    content: 'Help! My snake plant leaves are turning yellow. I water it once a week and it gets indirect light. What am I doing wrong? 😢',
    image: '🐍',
    likes: 18,
    comments: 31,
    timeAgo: '4 hours ago',
    tags: ['help', 'snake-plant', 'problem']
  },
  {
    id: 3,
    author: {
      name: 'Lisa Bloom',
      avatar: '🌺',
      level: 'Garden Guru',
      posts: 342
    },
    content: 'Spring setup is complete! My greenhouse is ready for the new season. Swipe to see the before and after transformation 📸',
    image: '🏡',
    likes: 89,
    comments: 22,
    timeAgo: '6 hours ago',
    tags: ['greenhouse', 'spring', 'setup']
  },
  {
    id: 4,
    author: {
      name: 'Mike Harvest',
      avatar: '🥕',
      level: 'Veggie Master',
      posts: 156
    },
    content: 'First tomato harvest of the season! These Cherokee Purples are absolutely delicious. Growing heirloom varieties is so rewarding 🍅',
    image: '🍅',
    likes: 65,
    comments: 18,
    timeAgo: '8 hours ago',
    tags: ['tomatoes', 'harvest', 'vegetables', 'heirloom']
  },
  {
    id: 5,
    author: {
      name: 'Emma Succulent',
      avatar: '🌵',
      level: 'Succulent Specialist',
      posts: 89
    },
    content: 'Propagation station update! Look at all these baby succulents growing from leaves. Nature is amazing! 💚',
    image: '🌱',
    likes: 53,
    comments: 12,
    timeAgo: '1 day ago',
    tags: ['succulents', 'propagation', 'babies']
  }
];

const trendingTopics = [
  { name: 'Spring Planting', posts: 234, color: 'bg-green-100 text-green-800' },
  { name: 'Houseplant Care', posts: 189, color: 'bg-blue-100 text-blue-800' },
  { name: 'Pest Problems', posts: 156, color: 'bg-red-100 text-red-800' },
  { name: 'Propagation', posts: 142, color: 'bg-purple-100 text-purple-800' },
  { name: 'Garden Design', posts: 98, color: 'bg-orange-100 text-orange-800' },
  { name: 'Organic Gardening', posts: 87, color: 'bg-emerald-100 text-emerald-800' }
];

const achievements = [
  { name: 'First Post', icon: '🎉', description: 'Share your first plant photo' },
  { name: 'Helper', icon: '🤝', description: 'Help 10 fellow gardeners' },
  { name: 'Green Thumb', icon: '👍', description: 'Get 100 likes on your posts' },
  { name: 'Plant Parent', icon: '🌱', description: 'Post for 30 days straight' },
  { name: 'Expert', icon: '🏆', description: 'Become a top contributor' }
];

const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLike = (postId: number) => {
    // In a real app, this would update the database
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: number) => {
    // In a real app, this would open a comment dialog
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: number) => {
    // In a real app, this would open a share dialog
    console.log('Share post:', postId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Plant Community 🌱
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with fellow plant lovers, share your gardening journey, and learn from experienced growers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Community Feed</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="create">Create Post</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6 mt-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts, users, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Posts */}
                <div className="space-y-6">
                  {communityPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="text-2xl">
                                  {post.author.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{post.author.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Badge variant="secondary">{post.author.level}</Badge>
                                  <span>•</span>
                                  <span>{post.timeAgo}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Follow
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700">{post.content}</p>
                          
                          {/* Image placeholder */}
                          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-6xl">
                            {post.image}
                          </div>

                          {/* Tags */}
                          <div className="flex gap-2 flex-wrap">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(post.id)}
                                className="text-gray-600 hover:text-red-500"
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleComment(post.id)}
                                className="text-gray-600 hover:text-blue-500"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleShare(post.id)}
                                className="text-gray-600 hover:text-green-500"
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{topic.name}</h3>
                              <p className="text-gray-500 text-sm">{topic.posts} posts</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-green-500" />
                              <Badge className={topic.color}>Trending</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Share with the Community</CardTitle>
                    <CardDescription>
                      Share your gardening success, ask for help, or inspire others with your plant journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="What's growing in your garden today? Share your experience, ask questions, or show off your plants!"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-32"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-1" />
                          Add Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          📍 Add Location
                        </Button>
                      </div>
                      <Button>
                        Share Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plants Identified</span>
                  <span className="font-semibold">8,942</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Problems Solved</span>
                  <span className="font-semibold">3,421</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={achievement.name} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {communityPosts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-lg">
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{post.author.name}</p>
                      <p className="text-xs text-gray-600">{post.author.posts} posts</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;