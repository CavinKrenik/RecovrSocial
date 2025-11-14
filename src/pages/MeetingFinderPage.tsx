import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Clock, Users, Search, Filter } from 'lucide-react';

interface MeetingFinderPageProps {
  onBack: () => void;
}

interface Meeting {
  id: string;
  name: string;
  type: string;
  time: string;
  day: string;
  location: string;
  address: string;
  description: string;
  distance: string;
}

const MeetingFinderPage: React.FC<MeetingFinderPageProps> = ({ onBack }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');

  const meetings: Meeting[] = [
    {
      id: '1',
      name: 'EDI',
      type: 'AA',
      time: '7:30 AM',
      day: 'Monday-Sunday',
      location: 'downtown Shelton',
      address: '125 w cota',
      description: 'Open discussion meeting for all levels',
      distance: '0.5 miles'
    },
    {
      id: '2',
      name: 'Sunrise Support Circle',
      type: 'NA',
      time: '8:00 AM',
      day: 'Tuesday',
      location: 'St. Mary\'s Church',
      address: '456 Oak Ave, Midtown',
      description: 'Morning meditation and sharing',
      distance: '1.2 miles'
    },
    {
      id: '3',
      name: 'Hope & Healing',
      type: 'SMART',
      time: '6:30 PM',
      day: 'Wednesday',
      location: 'Library Meeting Room',
      address: '789 Pine St, Uptown',
      description: 'SMART Recovery tools and techniques',
      distance: '2.1 miles'
    },
    {
      id: '4',
      name: 'Evening Reflections',
      type: 'AA',
      time: '7:30 PM',
      day: 'Thursday',
      location: 'Unity Hall',
      address: '321 Elm St, Westside',
      description: 'Step study and personal sharing',
      distance: '1.8 miles'
    }
  ];

  const meetingTypes = ['all', 'AA', 'NA', 'SMART', 'Al-Anon'];
  const days = ['all', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    const matchesDay = selectedDay === 'all' || meeting.day === selectedDay;
    const matchesLocation = searchLocation === '' || 
      meeting.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      meeting.address.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesType && matchesDay && matchesLocation;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'AA': return 'bg-green-500/20 text-green-400';
      case 'NA': return 'bg-blue-500/20 text-blue-400';
      case 'SMART': return 'bg-purple-500/20 text-purple-400';
      case 'Al-Anon': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-teal-800">
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
          <h1 className="text-2xl font-bold text-white">Meeting Finder</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Type</label>
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md p-2"
                  >
                    {meetingTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                  <select 
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md p-2"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>
                        {day === 'all' ? 'All Days' : day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Nearby Meetings</h3>
            <span className="text-gray-300 text-sm">{filteredMeetings.length} meetings found</span>
          </div>
          
          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white">{meeting.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(meeting.type)}`}>
                        {meeting.type}
                      </span>
                      <span className="text-gray-300 text-sm">{meeting.day}</span>
                    </div>
                  </div>
                  <span className="text-teal-400 text-sm font-medium">{meeting.distance}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{meeting.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{meeting.address}</span>
                  </div>
                </div>
                
                <p className="text-gray-200 text-sm mb-4">{meeting.description}</p>
                
                <div className="flex space-x-2">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/20"
                  >
                    Save Meeting
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

export default MeetingFinderPage;