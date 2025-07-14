import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const SoberEventPlatforms: React.FC = () => {
  const additionalPlatforms = [
    {
      name: 'Sober Girl Society',
      location: 'Various locations',
      description: 'Community and event platform focused on women in recovery - Brunches, workshops, retreats, and sober nightlife',
      url: 'https://sobergirlsociety.com/'
    },
    {
      name: 'She Recovers Foundation',
      location: 'Virtual/in-person',
      description: 'Women-focused events and virtual/in-person healing circles - Also hosts recovery-based workshops and conferences',
      url: 'https://sherecovers.org/'
    },
    {
      name: 'The Luckiest Club (TLC)',
      location: 'Online & various cities',
      description: 'Recovery meetings, virtual events, and speaker series - Daily Zooms + calendar of themed meetups',
      url: 'https://www.theluckiestclub.com/'
    },
    {
      name: 'Phoenix (The Phoenix)',
      location: 'Multiple cities',
      description: 'Sober fitness and wellness events (free w/ 48 hrs sober) - Crossfit, yoga, biking, community meetups',
      url: 'https://thephoenix.org/'
    },
    {
      name: 'Club Soda',
      location: 'UK-based, with international events',
      description: 'Workshops, mindful drinking classes, tastings - International alcohol-free events',
      url: 'https://joinclubsoda.com/'
    }
  ];

  const bonusTools = [
    {
      name: 'Meetup.com',
      description: 'Search for "Sober," "Recovery," or "AA" groups in your area',
      url: 'https://www.meetup.com/'
    },
    {
      name: 'Facebook Events',
      description: 'Filter by "Sober" or "Alcohol-Free" near your location',
      url: 'https://www.facebook.com/events'
    },
    {
      name: 'Eventbrite',
      description: 'Use search filters like "sober," "recovery," or "alcohol-free"',
      url: 'https://www.eventbrite.com/'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {additionalPlatforms.map((platform, index) => (
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

      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Bonus Tools to Discover Local Sober Events</h4>
        <div className="space-y-3">
          {bonusTools.map((tool, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-white">{tool.name}</h5>
                    <p className="text-sm text-gray-300">{tool.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
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

export default SoberEventPlatforms;