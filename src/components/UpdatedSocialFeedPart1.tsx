import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Heart, MessageCircle, Share2, MoreHorizontal, X, Send } from 'lucide-react';
import { supabase, Post, Comment } from '@/lib/supabase';

interface UpdatedSocialFeedProps {
  posts: Post[];
  loading: boolean;
  onLike: (postId: string) => void;
  onPost: (content: string, isAnonymous: boolean) => void;
  onCommentClick: (post: Post) => void;
}

const UpdatedSocialFeedPart1: React.FC<UpdatedSocialFeedProps> = ({
  posts,
  loading,
  onLike,
  onPost,
  onCommentClick
}) => {
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handlePost = () => {
    if (newPost.trim()) {
      onPost(newPost, isAnonymous);
      setNewPost('');
      setIsAnonymous(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === 'now') return 'now';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
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
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous-post"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous-post" className="text-sm text-gray-400">
                Post anonymously
              </Label>
            </div>
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

      {posts.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">No posts yet. Be the first to share your journey!</p>
          </CardContent>
        </Card>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-teal-500 text-white">
                      {post.author === 'Anonymous' ? '?' : post.author[0].toUpperCase()}
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
                    <span className="text-sm text-gray-400">{formatTimestamp(post.timestamp)}</span>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-blue-400"
                  onClick={() => onCommentClick(post)}
                >
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
        ))
      )}
    </div>
  );
};

export default UpdatedSocialFeedPart1;