import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

interface JournalEntryProps {
  entry: {
    id: string;
    title: string;
    content: string;
    mood: string;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
  onEdit: (entry: any) => void;
  onDelete: (id: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy': return 'bg-green-500/20 text-green-300';
      case 'sad': return 'bg-blue-500/20 text-blue-300';
      case 'anxious': return 'bg-yellow-500/20 text-yellow-300';
      case 'angry': return 'bg-red-500/20 text-red-300';
      case 'peaceful': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{entry.title}</h3>
            <p className="text-gray-400 text-sm">{formatDate(entry.created_at)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(entry)}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(entry.id)}
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-200 mb-4 leading-relaxed">
          {entry.content.length > 200 ? `${entry.content.substring(0, 200)}...` : entry.content}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getMoodColor(entry.mood)} border-0`}>
            {entry.mood}
          </Badge>
          {entry.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="border-white/30 text-white">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalEntry;