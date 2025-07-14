import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
}

interface EventCardProps {
  event: Event;
  onRSVP: (eventId: string, attending: boolean) => void;
  isAttending: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRSVP, isAttending }) => {
  const [loading, setLoading] = useState(false);

  const handleRSVP = async () => {
    setLoading(true);
    try {
      await onRSVP(event.id, !isAttending);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Education': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'Wellness': 'bg-green-500/20 text-green-400 border-green-400/30',
      'Support': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Social': 'bg-pink-500/20 text-pink-400 border-pink-400/30',
      'Outdoors': 'bg-orange-500/20 text-orange-400 border-orange-400/30',
      'Meeting': 'bg-teal-500/20 text-teal-400 border-teal-400/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">{event.title}</h3>
            <Badge className={getCategoryColor(event.category)}>
              {event.category}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-teal-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="w-4 h-4 mr-2 text-teal-400" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-teal-400" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <Users className="w-4 h-4 mr-2 text-teal-400" />
            <span>
              {event.attendees} attending
              {event.maxAttendees && ` / ${event.maxAttendees} max`}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {isAttending ? (
              <span className="text-green-400 font-medium">✓ Attending</span>
            ) : (
              <span className="text-gray-400">Not attending</span>
            )}
          </div>
          
          <Button
            onClick={handleRSVP}
            disabled={loading || (event.maxAttendees && event.attendees >= event.maxAttendees && !isAttending)}
            className={`${
              isAttending 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            } px-4 py-2 text-sm`}
          >
            {loading ? 'Loading...' : isAttending ? 'Cancel RSVP' : 'RSVP'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;