import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlefvaepvnnaiynfbspw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZWZ2YWVwdm5uYWl5bmZic3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5OTc0MDIsImV4cCI6MjA2NzU3MzQwMn0.qORLvKZKUYGma-IRxApX6E_xw-UtFP_-tOfAoW9jTJI';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  cleanDays?: number;
  created_at: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: string;
}

// Simple localStorage fallback for now
class SupabaseAPI {
  private storageKey = 'recovr_posts';
  private likesKey = 'recovr_likes';
  private commentsKey = 'recovr_comments';
  private listeners: Array<() => void> = [];

  private getCurrentUser() {
    const nickname = localStorage.getItem('recovr_nickname') || 'Anonymous';
    let userId = localStorage.getItem('recovr_user_id');
    if (!userId) {
      userId = 'user_' + Date.now();
      localStorage.setItem('recovr_user_id', userId);
    }
    return { id: userId, nickname };
  }

  private calculateCleanDays(): number | undefined {
    const cleanDate = localStorage.getItem('recovr_clean_date');
    if (!cleanDate) return undefined;
    const clean = new Date(cleanDate);
    const now = new Date();
    const diffTime = now.getTime() - clean.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  async getPosts(): Promise<Post[]> {
    const posts = localStorage.getItem(this.storageKey);
    const likes = localStorage.getItem(this.likesKey);
    const comments = localStorage.getItem(this.commentsKey);
    
    const parsedPosts: Post[] = posts ? JSON.parse(posts) : [];
    const parsedLikes: Record<string, string[]> = likes ? JSON.parse(likes) : {};
    const parsedComments: Comment[] = comments ? JSON.parse(comments) : [];
    
    const user = this.getCurrentUser();
    
    return parsedPosts.map(post => ({
      ...post,
      likes: parsedLikes[post.id]?.length || 0,
      comments: parsedComments.filter(c => c.postId === post.id).length,
      isLiked: parsedLikes[post.id]?.includes(user.id) || false
    })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async createPost(content: string): Promise<void> {
    const user = this.getCurrentUser();
    const posts = await this.getPosts();
    const cleanDays = this.calculateCleanDays();
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: user.nickname,
      content,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      isLiked: false,
      cleanDays,
      created_at: new Date().toISOString()
    };
    
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem(this.storageKey, JSON.stringify(updatedPosts));
    this.listeners.forEach(listener => listener());
  }

  async toggleLike(postId: string): Promise<void> {
    const user = this.getCurrentUser();
    const likes = localStorage.getItem(this.likesKey);
    const parsedLikes: Record<string, string[]> = likes ? JSON.parse(likes) : {};
    
    if (!parsedLikes[postId]) parsedLikes[postId] = [];
    
    const userLiked = parsedLikes[postId].includes(user.id);
    if (userLiked) {
      parsedLikes[postId] = parsedLikes[postId].filter(id => id !== user.id);
    } else {
      parsedLikes[postId].push(user.id);
    }
    
    localStorage.setItem(this.likesKey, JSON.stringify(parsedLikes));
    this.listeners.forEach(listener => listener());
  }

  async getComments(postId: string): Promise<Comment[]> {
    const comments = localStorage.getItem(this.commentsKey);
    const parsedComments: Comment[] = comments ? JSON.parse(comments) : [];
    return parsedComments.filter(comment => comment.postId === postId);
  }

  async createComment(postId: string, content: string): Promise<void> {
    const user = this.getCurrentUser();
    const comments = localStorage.getItem(this.commentsKey);
    const parsedComments: Comment[] = comments ? JSON.parse(comments) : [];
    
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author: user.nickname,
      content,
      timestamp: new Date().toISOString()
    };
    
    parsedComments.push(newComment);
    localStorage.setItem(this.commentsKey, JSON.stringify(parsedComments));
    this.listeners.forEach(listener => listener());
  }

  onPostsChange(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  cleanup() {}
}

export const supabaseAPI = new SupabaseAPI();