import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  cleanDays?: number;
}

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'CleanJourney23',
      content: 'Day 127 and feeling stronger than ever. The support in this community has been incredible. Thank you all for being part of my journey. 💪',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: false,
      cleanDays: 127
    },
    {
      id: '2',
      author: 'HopeDealer',
      content: 'Just wanted to share that I made it through a really tough day yesterday. Recovery is not linear, but every day is a victory. Grateful for this community.',
      timestamp: '4 hours ago',
      likes: 31,
      comments: 12,
      isLiked: true,
      cleanDays: 89
    },
    {
      id: '3',
      author: 'Anonymous',
      content: 'First time posting here. 30 days clean today. Scared but hopeful. Thank you for creating a safe space.',
      timestamp: '6 hours ago',
      likes: 45,
      comments: 15,
      isLiked: false,
      cleanDays: 30
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        content: newPost,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Post Composer */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <Textarea
            placeholder="Share your journey, thoughts, or encouragement..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-400">Share anonymously</span>
            <Button 
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
};

const PostCard: React.FC<{ post: Post; onLike: (id: string) => void }> = ({ post, onLike }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-teal-500 text-white">
                {post.author[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{post.author}</span>
                {post.cleanDays && (
                  <Badge variant="secondary" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                    {post.cleanDays} days
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-400">{post.timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-200 mb-4">{post.content}</p>
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={`text-gray-400 hover:text-red-400 ${post.isLiked ? 'text-red-400' : ''}`}
          >
            <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialFeed;