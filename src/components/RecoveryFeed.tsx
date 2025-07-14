import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  gratitude: number;
  strength: number;
  isLiked: boolean;
  isGrateful: boolean;
  isStrength: boolean;
}

interface RecoveryFeedProps {
  userNickname: string;
}

const RecoveryFeed: React.FC<RecoveryFeedProps> = ({ userNickname }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'CleanJourney23',
      content: 'Day 45 clean today. Feeling grateful for this community and the strength you all give me every day.',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 3,
      gratitude: 8,
      strength: 5,
      isLiked: false,
      isGrateful: false,
      isStrength: false
    },
    {
      id: '2',
      author: 'HopeDealer',
      content: 'Had a tough moment today but I reached out instead of reaching for old habits. Progress, not perfection.',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 7,
      gratitude: 6,
      strength: 12,
      isLiked: false,
      isGrateful: false,
      isStrength: false
    },
    {
      id: '3',
      author: 'Anonymous',
      content: 'One year clean today! Thank you to everyone who supported me through the dark times. It gets better.',
      timestamp: '6 hours ago',
      likes: 45,
      comments: 15,
      gratitude: 23,
      strength: 18,
      isLiked: false,
      isGrateful: false,
      isStrength: false
    }
  ]);
  
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleReaction = (postId: string, type: 'like' | 'gratitude' | 'strength') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedPost = { ...post };
        
        if (type === 'like') {
          updatedPost.isLiked = !updatedPost.isLiked;
          updatedPost.likes += updatedPost.isLiked ? 1 : -1;
        } else if (type === 'gratitude') {
          updatedPost.isGrateful = !updatedPost.isGrateful;
          updatedPost.gratitude += updatedPost.isGrateful ? 1 : -1;
        } else if (type === 'strength') {
          updatedPost.isStrength = !updatedPost.isStrength;
          updatedPost.strength += updatedPost.isStrength ? 1 : -1;
        }
        
        return updatedPost;
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: isAnonymous ? 'Anonymous' : userNickname,
      content: newPost,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      gratitude: 0,
      strength: 0,
      isLiked: false,
      isGrateful: false,
      isStrength: false
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
    setIsAnonymous(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Post Input */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="space-y-3">
            <Input
              placeholder="Share your thoughts, gratitude, or encouragement..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              maxLength={280}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <span>Post anonymously</span>
              </label>
              <Button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {post.author[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.author}</p>
                      <p className="text-gray-400 text-xs">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-200">{post.content}</p>
                
                <div className="flex items-center space-x-4 pt-2">
                  <button
                    onClick={() => handleReaction(post.id, 'like')}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(post.id, 'gratitude')}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      post.isGrateful ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <span className="text-base">🙏</span>
                    <span>{post.gratitude}</span>
                  </button>
                  
                  <button
                    onClick={() => handleReaction(post.id, 'strength')}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      post.isStrength ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                    }`}
                  >
                    <span className="text-base">💪</span>
                    <span>{post.strength}</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecoveryFeed;