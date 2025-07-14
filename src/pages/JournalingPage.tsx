import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, BookOpen, Plus, Search, Calendar } from 'lucide-react';

interface JournalingPageProps {
  onBack: () => void;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

const JournalingPage: React.FC<JournalingPageProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Day 1 of Recovery',
      content: 'Today marks the beginning of my journey. I feel scared but hopeful.',
      date: '2024-01-15',
      mood: 'hopeful'
    },
    {
      id: '2', 
      title: 'Feeling Strong',
      content: 'Had a good day today. Attended my first meeting and felt supported.',
      date: '2024-01-20',
      mood: 'positive'
    }
  ]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState('neutral');
  const [searchTerm, setSearchTerm] = useState('');

  const addEntry = () => {
    if (newTitle.trim() && newContent.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().split('T')[0],
        mood: newMood
      };
      setEntries([entry, ...entries]);
      setNewTitle('');
      setNewContent('');
      setNewMood('neutral');
      setShowNewEntry(false);
    }
  };

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'positive': return 'bg-green-500/20 text-green-400';
      case 'hopeful': return 'bg-blue-500/20 text-blue-400';
      case 'neutral': return 'bg-gray-500/20 text-gray-400';
      case 'challenging': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">Journal</h1>
          </div>
          <Button 
            onClick={() => setShowNewEntry(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {showNewEntry && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">New Journal Entry</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Entry title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Textarea
                  placeholder="How are you feeling today?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
                />
                <select 
                  value={newMood}
                  onChange={(e) => setNewMood(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md p-2"
                >
                  <option value="positive">Positive</option>
                  <option value="hopeful">Hopeful</option>
                  <option value="neutral">Neutral</option>
                  <option value="challenging">Challenging</option>
                </select>
                <div className="flex space-x-2">
                  <Button onClick={addEntry} className="bg-blue-500 hover:bg-blue-600">
                    Save Entry
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewEntry(false)}
                    className="border-white/20 text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{entry.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalingPage;