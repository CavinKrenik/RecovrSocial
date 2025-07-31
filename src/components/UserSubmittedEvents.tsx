import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Globe, ExternalLink } from 'lucide-react';

interface UserEvent {
  id: number;
  name: string;
  date: string;
  time?: string;
  location?: string;
  details?: string;
  website?: string;
  created_at: string;
}

const UserSubmittedEvents: React.FC = () => {
  const [events, setEvents] = useState<UserEvent[]>([]);

  const loadEvents = () => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('soberEvents') || '[]');
      
      // Filter out events older than 1 day
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const currentEvents = storedEvents.filter((event: UserEvent) => {
        const eventDate = new Date(event.date);
        return eventDate >= oneDayAgo;
      });
      
      // Update localStorage with filtered events
      localStorage.setItem('soberEvents', JSON.stringify(currentEvents));
      
      // Sort by date (earliest first)
      currentEvents.sort((a: UserEvent, b: UserEvent) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setEvents(currentEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();
    
    // Listen for custom event when new events are added
    const handleEventsUpdated = () => {
      loadEvents();
    };
    
    window.addEventListener('eventsUpdated', handleEventsUpdated);
    
    // Set up periodic cleanup (every hour)
    const cleanupInterval = setInterval(loadEvents, 60 * 60 * 1000);
    
    return () => {
      window.removeEventListener('eventsUpdated', handleEventsUpdated);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (events.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold text-white">Community Submitted Events</h3>
      {events.map((event) => (
        <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">{event.name}</h4>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-teal-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center text-teal-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatTime(event.time)}
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  )}
                </div>
                
                {event.details && (
                  <p className="text-sm text-gray-300 mt-2">{event.details}</p>
                )}
              </div>
              
              {event.website && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                  onClick={() => window.open(event.website, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserSubmittedEvents;