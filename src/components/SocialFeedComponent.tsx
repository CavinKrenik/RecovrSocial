import React, { useState, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SocialPost {
  id: string;
  content: string;
  created_at: string;
  nickname: string;
  user_id: string;
}

const SocialFeedComponent: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    initializeUser();
    loadPosts();
    const cleanup = setupRealtimeSubscription();
    return cleanup;
  }, []);

  const initializeUser = async () => {
    let savedNickname = localStorage.getItem('recovr_nickname');
    let savedUserId = localStorage.getItem('social_user_id');

    if (!savedNickname) {
      savedNickname = 'Anonymous';
    }

    if (!savedUserId) {
      try {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (data.user) {
          savedUserId = data.user.id;
          localStorage.setItem('social_user_id', savedUserId);
        } else {
          savedUserId = 'local_' + Date.now();
          localStorage.setItem('social_user_id', savedUserId);
        }
      } catch (error) {
        savedUserId = 'local_' + Date.now();
        localStorage.setItem('social_user_id', savedUserId);
      }
    }

    setNickname(savedNickname);
    setUserId(savedUserId);
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_feed')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setPosts(data);
      } else {
        throw error;
      }
    } catch (error) {
      const localPosts = JSON.parse(localStorage.getItem('social_posts') || '[]');
      setPosts(localPosts);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('social_feed')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'social_feed'
      }, (payload) => {
        setPosts(prev => [payload.new as SocialPost, ...prev]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSubmitPost = async () => {
    if (!newPost.trim() || !nickname || !userId) return;

    const post = {
      content: newPost.trim(),
      nickname,
      user_id: userId
    };

    try {
      const { data, error } = await supabase
        .from('social_feed')
        .insert([post])
        .select();

      if (error) {
        throw error;
      }

      setNewPost('');
    } catch (error) {
      const localPost = {
        id: Date.now().toString(),
        ...post,
        created_at: new Date().toISOString()
      };
      const localPosts = JSON.parse(localStorage.getItem('social_posts') || '[]');
      const updatedPosts = [localPost, ...localPosts];
      localStorage.setItem('social_posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      setNewPost('');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows={3}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-300 text-sm">
            Posting as: {nickname}
          </span>
          <button
            onClick={handleSubmitPost}
            disabled={!newPost.trim()}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send size={16} />
            Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-400">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.nickname[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{post.nickname}</h3>
                  <p className="text-gray-300 text-sm">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-100 leading-relaxed">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeedComponent;