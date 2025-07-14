import React, { useState, useEffect } from 'react';
import { X, Send, Heart } from 'lucide-react';
import { supabaseAPI, Post, Comment } from '../lib/supabase';

interface UpdatedCommentModalProps {
  post: Post;
  onClose: () => void;
}

const UpdatedCommentModal: React.FC<UpdatedCommentModalProps> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const loadComments = async () => {
    try {
      const fetchedComments = await supabaseAPI.getComments(post.id);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await supabaseAPI.createComment(post.id, newComment);
      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      await supabaseAPI.toggleLike(post.id);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-white/10">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {post.author[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium">{post.author}</h3>
                <span className="text-gray-400 text-sm">{post.timestamp}</span>
                {post.cleanDays !== undefined && (
                  <div className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs">
                    {post.cleanDays} days clean
                  </div>
                )}
              </div>
              <p className="text-gray-100 leading-relaxed">{post.content}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                post.isLiked 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
              <span>{post.likes}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-64 p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/20 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {comment.author[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm">{comment.author}</h4>
                      <span className="text-gray-400 text-xs">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-100 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={2}
            />
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors self-end"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedCommentModal;