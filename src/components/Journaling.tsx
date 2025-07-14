import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, Plus, Download, Search, ArrowLeft } from 'lucide-react';
import JournalEntry from './JournalEntry';
import JournalModal from './JournalModal';

interface JournalEntryType {
  id: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface JournalingProps {
  onBack?: () => void;
}

const Journaling: React.FC<JournalingProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntryType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntryType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, searchTerm, moodFilter, tagFilter]);

  const loadEntries = () => {
    const saved = localStorage.getItem('journal_entries');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed.sort((a: JournalEntryType, b: JournalEntryType) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    }
  };

  const saveEntries = (newEntries: JournalEntryType[]) => {
    localStorage.setItem('journal_entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const filterEntries = () => {
    let filtered = entries;

    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (moodFilter) {
      filtered = filtered.filter(entry => entry.mood === moodFilter);
    }

    if (tagFilter) {
      filtered = filtered.filter(entry => entry.tags.includes(tagFilter));
    }

    setFilteredEntries(filtered);
  };

  const handleSaveEntry = (entry: JournalEntryType) => {
    const existingIndex = entries.findIndex(e => e.id === entry.id);
    let newEntries;
    
    if (existingIndex >= 0) {
      newEntries = [...entries];
      newEntries[existingIndex] = entry;
    } else {
      newEntries = [entry, ...entries];
    }
    
    saveEntries(newEntries);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveEntries(newEntries);
  };

  const handleEditEntry = (entry: JournalEntryType) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const exportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal_entries_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const allMoods = [...new Set(entries.map(entry => entry.mood))].sort();
  const allTags = [...new Set(entries.flatMap(entry => entry.tags))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-20">
        {onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
        )}
        
        <div className="text-center mb-8">
          <PenTool className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Journal</h1>
          <p className="text-gray-300">Your private space for reflection</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Select value={moodFilter} onValueChange={setMoodFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full sm:w-40">
                  <SelectValue placeholder="Filter by mood" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="" className="text-white">All moods</SelectItem>
                  {allMoods.map(mood => (
                    <SelectItem key={mood} value={mood} className="text-white">{mood}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full sm:w-40">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="" className="text-white">All tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag} className="text-white">{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
          {entries.length > 0 && (
            <Button
              onClick={exportEntries}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">
                  {entries.length === 0 ? 'No journal entries yet. Create your first entry!' : 'No entries match your filters.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map(entry => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            ))
          )}
        </div>

        <JournalModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntry(null);
          }}
          onSave={handleSaveEntry}
          entry={editingEntry}
        />
      </div>
    </div>
  );
};

export default Journaling;