import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus, Search, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CreateEventModal from './CreateEventModal';

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
}

const EventsComponent: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Sober Art Society at Graffiti',
      description: 'A free weekly art group for people in recovery to socialize and create art, followed by a shared lunch.',
      date: 'Every Wednesday',
      time: '10:00 AM - 1:00 PM',
      location: 'Graffiti Creative Arts Center, 215 W Railroad Ave, Shelton, WA',
      category: 'Art & Creativity',
      attendees: 8,
      isRSVP: false,
      registrationUrl: 'https://chamber.masonchamber.com'
    },

    {
      id: '3',
      title: 'Open Mic Night @ Sober AF Bottle Shop',
      description: 'Monthly sober open-mic event for musicians, poets, and performers from the recovery community.',
      date: 'Last Thursday of each month',
      time: '6:00 PM - 9:00 PM',
      location: 'Sober AF Zero-Proof Bottle Shop, Tacoma, WA',
      category: 'Entertainment',
      attendees: 15,
      isRSVP: false,
      registrationUrl: 'https://thesobercurator.com'
    },

    {
      id: '5',
      title: 'WA Oxford House Campout',
      description: 'Statewide sober campout for Oxford House residents & alumni. Beachside camping weekend.',
      date: 'August 5-7, 2025',
      time: 'Weekend Campout',
      location: 'Twin Harbors State Park, Westport, WA',
      category: 'Camping',
      attendees: 45,
      isRSVP: false,
      registrationUrl: 'https://wa.oxfordhouse.us'
    },
    {
      id: '6',
      title: 'NA Family Barbecue',
      description: 'Family-friendly recovery BBQ hosted by NA. Features outdoor games and Family Feud.',
      date: 'August 9, 2025',
      time: '11:00 AM - 3:00 PM',
      location: 'Weatherwood Private Park, 6708 33rd Ave SE, Lacey, WA',
      category: 'Social',
      attendees: 35,
      isRSVP: false,
      registrationUrl: 'https://spsana.org'
    },
    {
      id: '7',
      title: 'Lakefest 2025 (Recovery Campout)',
      description: '4-day clean & sober camping festival for the recovery community with campfire meetings.',
      date: 'July 31 - August 3, 2025',
      time: '4-Day Event',
      location: 'Camp Lakeview, 32919 Benbow Dr E, Graham, WA',
      category: 'Camping',
      attendees: 60,
      isRSVP: false,
      registrationUrl: 'https://pcana.org'
    },
    {
      id: '8',
      title: 'Fall into Freedom Recovery Fest',
      description: 'Afternoon recovery celebration for National Recovery Month with speakers and music.',
      date: 'September 13, 2025',
      time: '12:00 PM - 5:00 PM',
      location: 'Tumwater Historical Park (Lower Level), Tumwater, WA',
      category: 'Festival',
      attendees: 40,
      isRSVP: false,
      registrationUrl: 'https://spsana.org'
    },
    {
      id: '9',
      title: 'Recovery Day at the Park',
      description: 'Community recovery celebration with live music, wellness activities, and resource booths.',
      date: 'September 6, 2025',
      time: '11:00 AM - 2:00 PM',
      location: 'Evergreen Rotary Park, 1500 Park Ave, Bremerton, WA',
      category: 'Community',
      attendees: 50,
      isRSVP: false,
      registrationUrl: 'https://facebook.com'
    },
    {
      id: '10',
      title: 'Recovery 5K Run/Walk',
      description: '5K fun run/walk celebrating resilience in recovery. Open to all fitness levels.',
      date: 'September 6, 2025',
      time: '9:00 AM start',
      location: 'Starts at Evergreen Park, Bremerton, WA',
      category: 'Fitness',
      attendees: 30,
      isRSVP: false,
      registrationUrl: 'https://findarace.com'
    },
    {
      id: '11',
      title: 'Recovery Day at the Mariners',
      description: 'Join thousands in recovery at a Seattle Mariners game with pre-game rally and festivities.',
      date: 'September 14, 2025',
      time: 'Rally 10:30 AM; Game 1:10 PM',
      location: 'T-Mobile Park, 1250 1st Ave S, Seattle, WA',
      category: 'Sports',
      attendees: 200,
      isRSVP: false,
      registrationUrl: 'https://thesobercurator.com'
    },
    {
      id: '12',
      title: 'Sober New Years Eve Party',
      description: 'Ring in 2026 sober! Music, karaoke, early countdown for kids, and midnight celebration.',
      date: 'December 31, 2025',
      time: '8:00 PM - 12:30 AM',
      location: 'First United Methodist Church, 1224 Legion Way SE, Olympia, WA',
      category: 'Celebration',
      attendees: 75,
      isRSVP: false,
      registrationUrl: 'https://fumcoly.org'
    }
  ]);
  
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm]);

  const filterEvents = () => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
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
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} interested</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Interested
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

      {showCreateModal && (
        <CreateEventModal 
          onClose={() => setShowCreateModal(false)}
          userId="user123"
          onEventCreated={() => {}}
        />
      )}
    </div>
  );
};

export default EventsComponent;