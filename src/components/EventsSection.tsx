import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, Phone } from 'lucide-react';
import { julyEvents } from './JulyEvents';
import { augustEvents } from './AugustEvents';
import { septemberEvents } from './SeptemberEvents';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  isRSVP: boolean;
  registrationUrl?: string;
  price?: string;
  contact?: string;
  isRecurring?: boolean;
  sortDate?: Date;
}

const EventsSection: React.FC = () => {
  const weeklyEvents: Event[] = [
    {
      id: 'kids-art-club',
      title: '🧒 Kids Art Club (Ages ~6–10)',
      description: 'Weekly art projects in painting, drawing, sculpture, and more. Includes supplies, instruction, and snacks. Small group size (10–12 max).',
      date: 'Every Tuesday',
      time: '4:30 PM – 6:00 PM',
      location: 'Graffiti Creative Arts Center, 215 W Railroad Ave, Shelton, WA',
      category: 'Art & Creativity',
      attendees: 8,
      isRSVP: false,
      price: '$25 per child',
      contact: '(360) 462-0220',
      registrationUrl: 'https://graffitiartcenter.com',
      isRecurring: true,
      sortDate: new Date('2025-01-01')
    },
    {
      id: 'youth-art-club',
      title: '👦 Youth Art Club (Ages ~10–18)',
      description: 'Great for older kids and teens, including homeschoolers (art credit available). Projects include sculpting, watercolor, and art history. All materials and snacks provided.',
      date: 'Every Friday',
      time: '1:00 PM – 3:00 PM',
      location: 'Graffiti Creative Arts Center, 215 W Railroad Ave, Shelton, WA',
      category: 'Art & Creativity',
      attendees: 12,
      isRSVP: false,
      price: '$25 per child',
      contact: '(360) 462-0220',
      registrationUrl: 'https://graffitiartcenter.com',
      isRecurring: true,
      sortDate: new Date('2025-01-01')
    },
    {
      id: 'sober-art-society',
      title: 'Sober Art Society at Graffiti',
      description: 'A free weekly art group for people in recovery to socialize and create art, followed by a shared lunch. Provides a safe, anonymous space for creativity and fellowship in sobriety.',
      date: 'Every Wednesday',
      time: '10:00 AM - 1:00 PM',
      location: 'Graffiti Creative Arts Center, 215 W Railroad Ave, Shelton, WA',
      category: 'Art & Creativity',
      attendees: 8,
      isRSVP: false,
      registrationUrl: 'https://graffitiartcenter.com',
      isRecurring: true,
      sortDate: new Date('2025-01-01')
    }
  ];

  const allEvents = [...weeklyEvents, ...julyEvents, ...augustEvents, ...septemberEvents];
  const [events, setEvents] = useState<Event[]>(allEvents);

  const handleRSVP = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          isRSVP: !event.isRSVP,
          attendees: event.isRSVP ? event.attendees - 1 : event.attendees + 1
        };
      }
      return event;
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Art & Creativity': 'bg-purple-500/20 text-purple-400',
      'Entertainment': 'bg-pink-500/20 text-pink-400',
      'Social': 'bg-blue-500/20 text-blue-400',
      'Camping': 'bg-green-500/20 text-green-400',
      'Festival': 'bg-orange-500/20 text-orange-400',
      'Community': 'bg-teal-500/20 text-teal-400',
      'Fitness': 'bg-red-500/20 text-red-400',
      'Sports': 'bg-indigo-500/20 text-indigo-400',
      'Celebration': 'bg-yellow-500/20 text-yellow-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (a.isRecurring && !b.isRecurring) return -1;
    if (!a.isRecurring && b.isRecurring) return 1;
    if (a.sortDate && b.sortDate) {
      return a.sortDate.getTime() - b.sortDate.getTime();
    }
    return 0;
  });

  const julyCount = julyEvents.length;
  const augustCount = augustEvents.length;
  const septemberCount = septemberEvents.length;
  const totalScheduledEvents = julyCount + augustCount + septemberCount;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Clean & Sober Events</h1>
        <p className="text-gray-300">Washington State Recovery Events & Art Classes</p>
        <div className="text-sm text-gray-400 mt-2 space-y-1">
          <p>Showing {sortedEvents.length} total events</p>
          <p>July-September 2025: {totalScheduledEvents} scheduled events</p>
          <p>July: {julyCount} • August: {augustCount} • September: {septemberCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {sortedEvents.map((event) => (
          <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  {event.price && (
                    <div className="flex items-center space-x-2 text-green-300">
                      <span className="w-4 h-4 text-center">$</span>
                      <span>{event.price}</span>
                    </div>
                  )}
                  {event.contact && (
                    <div className="flex items-center space-x-2 text-blue-300">
                      <Phone className="w-4 h-4" />
                      <span>{event.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} interested</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 gap-2">
                  <Button
                    onClick={() => handleRSVP(event.id)}
                    variant={event.isRSVP ? 'outline' : 'default'}
                    className={event.isRSVP 
                      ? 'border-white/20 text-white hover:bg-white/10' 
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                    }
                  >
                    {event.isRSVP ? 'Going' : 'Interested'}
                  </Button>
                  {event.registrationUrl && (
                    <Button
                      onClick={() => window.open(event.registrationUrl, '_blank')}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      More Info
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
          Suggest an Event
        </Button>
      </div>
    </div>
  );
};

export default EventsSection;