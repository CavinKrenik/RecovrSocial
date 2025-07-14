import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, RefreshCw, Star } from 'lucide-react';

interface RecoveryMantrasPageProps {
  onBack: () => void;
}

const RecoveryMantrasPage: React.FC<RecoveryMantrasPageProps> = ({ onBack }) => {
  const [currentMantra, setCurrentMantra] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const mantras = [
    "I am stronger than my addiction",
    "Each day is a new opportunity for recovery",
    "I choose healing over hurting",
    "My sobriety is my superpower",
    "I am worthy of love and recovery",
    "Progress, not perfection",
    "I have the power to change my story",
    "Today I choose hope over fear",
    "I am building a life I don't need to escape from",
    "Recovery is a journey, not a destination"
  ];

  const nextMantra = () => {
    setCurrentMantra((prev) => (prev + 1) % mantras.length);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-800">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Recovery Mantras</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Daily Affirmation</h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                "{mantras[currentMantra]}"
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={nextMantra}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Next Mantra
              </Button>
              <Button 
                onClick={() => toggleFavorite(currentMantra)}
                variant={favorites.includes(currentMantra) ? "default" : "outline"}
                className={favorites.includes(currentMantra) 
                  ? "bg-pink-500 hover:bg-pink-600 text-white" 
                  : "border-white/20 text-white hover:bg-white/20"
                }
              >
                <Star className="w-4 h-4 mr-2" />
                {favorites.includes(currentMantra) ? "Favorited" : "Favorite"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-xl font-bold text-white mb-4">All Mantras</h3>
          {mantras.map((mantra, index) => (
            <Card 
              key={index} 
              className={`bg-white/10 backdrop-blur-sm border-white/20 cursor-pointer transition-all ${
                index === currentMantra ? 'ring-2 ring-purple-400' : 'hover:bg-white/20'
              }`}
              onClick={() => setCurrentMantra(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-white">{mantra}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(index);
                    }}
                    className={favorites.includes(index) ? "text-pink-400" : "text-gray-400"}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecoveryMantrasPage;