import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: any) => void;
  entry?: any;
}

const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose, onSave, entry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const moods = ['Happy', 'Sad', 'Anxious', 'Angry', 'Peaceful', 'Grateful', 'Hopeful', 'Frustrated'];

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setMood(entry.mood);
      setTags(entry.tags || []);
    } else {
      setTitle('');
      setContent('');
      setMood('');
      setTags([]);
    }
  }, [entry, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !mood) return;

    const journalEntry = {
      id: entry?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      tags,
      created_at: entry?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onSave(journalEntry);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Entry title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
          />
          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white min-h-32"
          />
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {moods.map((moodOption) => (
                <SelectItem key={moodOption} value={moodOption} className="text-white">
                  {moodOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button onClick={handleAddTag} variant="outline" className="border-gray-600">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-teal-600 text-white">
                  {tag}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} className="border-gray-600">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalModal;