import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, RefreshCw, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Mantra {
  id: string;
  content: string;
  category: string;
  created_at?: string;
}

interface RecoveryMantrasProps {
  onBack?: () => void;
}

const defaultMantras: Mantra[] = [
  { id: '1', content: 'One day at a time, one breath at a time.', category: 'daily' },
  { id: '2', content: 'Progress, not perfection.', category: 'motivation' },
  { id: '3', content: 'I am stronger than my struggles.', category: 'strength' },
  { id: '4', content: 'Today I choose healing over hurting.', category: 'healing' },
  { id: '5', content: 'My recovery is my responsibility and my gift to myself.', category: 'responsibility' },
  { id: '6', content: 'I am worthy of love, peace, and happiness.', category: 'self-worth' },
  { id: '7', content: 'Every moment is a fresh beginning.', category: 'renewal' },
  { id: '8', content: 'I have the power to create positive change.', category: 'empowerment' },
  { id: '9', content: 'Courage is not the absence of fear, but action in spite of it.', category: 'courage' },
  { id: '10', content: 'I am grateful for this moment of clarity.', category: 'gratitude' }
];

const RecoveryMantras: React.FC<RecoveryMantrasProps> = ({ onBack }) => {
  const [mantras, setMantras] = useState<Mantra[]>(defaultMantras);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMantras();
  }, []);

  const loadMantras = async () => {
    try {
      const { data, error } = await supabase
        .from('mantras')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setMantras(data);
      }
    } catch (error) {
      console.log('Using default mantras');
    }
  };

  const nextMantra = () => {
    setCurrentIndex((prev) => (prev + 1) % mantras.length);
  };

  const randomMantra = () => {
    const randomIndex = Math.floor(Math.random() * mantras.length);
    setCurrentIndex(randomIndex);
  };

  const currentMantra = mantras[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
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
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Recovery Mantras</h1>
          <p className="text-gray-300">Daily affirmations for your journey</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-4">
                "{currentMantra.content}"
              </p>
              <div className="inline-block px-3 py-1 bg-teal-500/20 rounded-full">
                <span className="text-teal-300 text-sm font-medium capitalize">
                  {currentMantra.category}
                </span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={nextMantra}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Next
              </Button>
              <Button
                onClick={randomMantra}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-2"
              >
                Random
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Mantra {currentIndex + 1} of {mantras.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoveryMantras;