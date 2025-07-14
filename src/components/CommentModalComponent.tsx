import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, X, Send } from 'lucide-react';
import { Post, Comment } from '@/lib/supabase';

interface CommentModalProps {
  selectedPost: Post;
  comments: Comment[];
  onClose: () => void;
  onCommentSubmit: (content: string, isAnonymous: boolean) => void;
}

const CommentModalComponent: React.FC<CommentModalProps> = ({
  selectedPost,
  comments,
  onClose,
  onCommentSubmit
}) => {
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onCommentSubmit(newComment.trim(), isAnonymous);
    setNewComment('');
    setIsAnonymous(false);
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-lg w-full max-h-[80vh] flex flex-col">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Comments ({comments.length})
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {selectedPost.author === 'Anonymous' ? '?' : selectedPost.author[0].toUpperCase()}
                </span>
              </div>
              <span className="text-white font-medium text-sm">{selectedPost.author}</span>
            </div>
            <p className="text-gray-200 text-sm">{selectedPost.content}</p>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-64">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {comment.author === 'Anonymous' ? '?' : comment.author[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-white font-medium text-sm">
                          {comment.author}
                        </span>
                        <div className="text-gray-400 text-xs">
                          {formatTimestamp(comment.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm">{comment.content}</p>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="comment" className="text-white">Add a comment</Label>
              <Input
                id="comment"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                placeholder="Share your thoughts..."
                maxLength={500}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous" className="text-white text-sm">
                  Post anonymously
                </Label>
              </div>
              
              <Button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-teal-500 hover:bg-teal-600"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentModalComponent;