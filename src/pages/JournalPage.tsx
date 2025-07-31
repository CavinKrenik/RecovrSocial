import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, BookOpen, Plus, Trash2, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: number;
}

interface JournalPageProps {
  onBack: () => void;
}

const JournalPage: React.FC<JournalPageProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem('recovr_journal_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntries = (updatedEntries: JournalEntry[]) => {
    localStorage.setItem('recovr_journal_entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    
    setNewTitle('');
    setNewContent('');
    setShowNewEntry(false);
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveEntries(updatedEntries);
    setSelectedEntry(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-800">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedEntry(null)}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journal
            </Button>
            <h1 className="text-2xl font-bold text-white">Journal Entry</h1>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{selectedEntry.title}</h2>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedEntry.date}
                  </div>
                </div>
                <Button
                  onClick={() => handleDeleteEntry(selectedEntry.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-white whitespace-pre-wrap leading-relaxed">
                {selectedEntry.content}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-800">
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
            <h1 className="text-2xl font-bold text-white">My Journal</h1>
          </div>
          
          <Button
            onClick={() => setShowNewEntry(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
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
                  placeholder="Write your thoughts..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[200px]"
                />
                
                <div className="flex space-x-3">
                  <Button
                    onClick={handleSaveEntry}
                    disabled={!newTitle.trim() || !newContent.trim()}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    Save Entry
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewEntry(false);
                      setNewTitle('');
                      setNewContent('');
                    }}
                    variant="outline"
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
          {entries.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Start Your Journal</h3>
                <p className="text-gray-300 mb-4">
                  Journaling can help you process thoughts and track your recovery journey.
                </p>
                <Button
                  onClick={() => setShowNewEntry(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Write Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card 
                key={entry.id} 
                className="bg-white/10 backdrop-blur-sm border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
                onClick={() => setSelectedEntry(entry)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{entry.title}</h3>
                      <div className="flex items-center text-gray-300 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {entry.date}
                      </div>
                      <p className="text-gray-300 line-clamp-2">
                        {entry.content.substring(0, 150)}
                        {entry.content.length > 150 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;