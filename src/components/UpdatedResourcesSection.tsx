import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, BookOpen, Phone, MapPin, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import RecoveryMantrasPage from '../pages/RecoveryMantrasPage';
import JournalingPage from '../pages/JournalingPage';
import CrisisSupportPage from '../pages/CrisisSupportPage';
import UpdatedEventsSection from './UpdatedEventsSection';
import CleanTimeTrackerPage from '../pages/CleanTimeTrackerPage';
import SoberEventPlatforms from './SoberEventPlatforms';
import CleanDatePicker from './CleanDatePicker';

interface UpdatedResourcesSectionProps {
  onNavigateToTracker?: () => void;
}

const UpdatedResourcesSection: React.FC<UpdatedResourcesSectionProps> = ({ onNavigateToTracker }) => {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [cleanDays, setCleanDays] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const savedCleanDate = localStorage.getItem('recovr_clean_date');
    if (savedCleanDate) {
      const cleanDate = new Date(savedCleanDate);
      const today = new Date();
      const diffTime = today.getTime() - cleanDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setCleanDays(Math.max(0, diffDays));
    }
  }, []);

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleCleanDateSave = (date: string) => {
    localStorage.setItem('recovr_clean_date', date);
    const cleanDate = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - cleanDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setCleanDays(Math.max(0, diffDays));
    setShowDatePicker(false);
  };

  if (currentPage === 'mantras') {
    return <RecoveryMantrasPage onBack={handleBackToMain} />;
  }

  if (currentPage === 'journal') {
    return <JournalingPage onBack={handleBackToMain} />;
  }

  if (currentPage === 'crisis') {
    return <CrisisSupportPage onBack={handleBackToMain} />;
  }

  if (currentPage === 'events') {
    return <UpdatedEventsSection />;
  }

  if (currentPage === 'clean-tracker') {
    return <CleanTimeTrackerPage onBack={handleBackToMain} />;
  }

  const tools = [
    { 
      title: 'Recovery Mantras', 
      description: 'Daily affirmations and mindfulness', 
      icon: Heart, 
      color: 'bg-purple-500/20 text-purple-400',
      page: 'mantras'
    },
    { 
      title: 'Journaling', 
      description: 'Track your thoughts and progress', 
      icon: BookOpen, 
      color: 'bg-blue-500/20 text-blue-400',
      page: 'journal'
    },
    { 
      title: 'Crisis Support', 
      description: 'Immediate help when you need it', 
      icon: Phone, 
      color: 'bg-red-500/20 text-red-400',
      page: 'crisis'
    },
    { 
      title: 'More Events', 
      description: 'Find local support groups', 
      icon: MapPin, 
      color: 'bg-green-500/20 text-green-400',
      page: 'events'
    }
  ];

  const soberEventPlatforms = [
    {
      name: 'Sober Events',
      location: 'Nationwide (U.S.) & online',
      description: 'Alcohol-free events, retreats, comedy shows, festivals',
      url: 'https://soberevents.com/'
    },
    {
      name: 'Loosid',
      location: 'App-based platform',
      description: 'Sober dating, travel, and events - Find local sober-friendly events and community meetups',
      url: 'https://www.loosidapp.com/'
    },
    {
      name: 'Sober Outside',
      location: 'Based in PNW but does events across the U.S.',
      description: 'Outdoor sober adventures: hiking, paddleboarding, camping',
      url: 'https://www.soberoutside.com/'
    },
    {
      name: 'Sans Bar',
      location: 'Across the U.S.',
      description: 'Alcohol-free bar pop-ups & events - Live music, social mixers, sober nightlife',
      url: 'https://www.sansbar.com/'
    },
    {
      name: 'Recovery Elevator',
      location: 'Various locations',
      description: 'Retreats, sober travel experiences, community meetups - Focus on traveling alcohol-free with connection and healing',
      url: 'https://www.recoveryelevator.com/'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
        <p className="text-gray-300">Tools for your recovery journey</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-bold text-white">Clean Time Tracker</h3>
            </div>
            <div className="text-4xl font-bold text-teal-400 mb-2">{cleanDays} Days</div>
            <p className="text-gray-300 text-sm">Strong and counting</p>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button 
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => setCurrentPage('clean-tracker')}
            >
              View Details
            </Button>
            <Button 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setShowDatePicker(true)}
            >
              {cleanDays > 0 ? 'Update Date' : 'Set Clean Date'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Recovery Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setCurrentPage(tool.page)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${tool.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{tool.title}</h4>
                      <p className="text-sm text-gray-300">{tool.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Sober Event Calendars & Communities</h3>
        <div className="space-y-4">
          {soberEventPlatforms.map((platform, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{platform.name}</h4>
                    <p className="text-sm text-teal-400 mb-2">{platform.location}</p>
                    <p className="text-sm text-gray-300">{platform.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <SoberEventPlatforms />
      </div>
      
      {showDatePicker && (
        <CleanDatePicker
          currentDate={localStorage.getItem('recovr_clean_date') || ''}
          onSave={handleCleanDateSave}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default UpdatedResourcesSection;