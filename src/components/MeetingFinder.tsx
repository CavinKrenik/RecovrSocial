import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, ExternalLink, Search, Navigation, ArrowLeft } from 'lucide-react';

interface MeetingResource {
  id: string;
  name: string;
  type: string;
  url: string;
  description: string;
  coverage: string;
}

interface MeetingFinderProps {
  onBack?: () => void;
}

const meetingResources: MeetingResource[] = [
  {
    id: '1',
    name: 'AA Meeting Guide',
    type: 'AA',
    url: 'https://www.aa.org/find-aa/north-america',
    description: 'Official AA meeting finder for North America',
    coverage: 'North America'
  },
  {
    id: '2',
    name: 'NA Meeting Search',
    type: 'NA',
    url: 'https://www.na.org/meetingsearch/',
    description: 'Official NA meeting locator worldwide',
    coverage: 'Worldwide'
  },
  {
    id: '3',
    name: 'Online AA Meetings',
    type: 'AA Online',
    url: 'https://aa-intergroup.org/',
    description: '24/7 online AA meetings and resources',
    coverage: 'Online'
  },
  {
    id: '4',
    name: 'Online NA Meetings',
    type: 'NA Online',
    url: 'https://virtual-na.org/',
    description: 'Virtual NA meetings around the clock',
    coverage: 'Online'
  },
  {
    id: '5',
    name: 'SMART Recovery',
    type: 'SMART',
    url: 'https://www.smartrecovery.org/meetings/',
    description: 'SMART Recovery meeting finder',
    coverage: 'Worldwide'
  }
];

const regionalResources = [
  { state: 'Washington', url: 'https://aawa.org/meetings/', name: 'AA Washington Area' },
  { state: 'California', url: 'https://www.caaonline.org/', name: 'California AA' },
  { state: 'New York', url: 'https://www.nyintergroup.org/', name: 'NY Intergroup' },
  { state: 'Texas', url: 'https://www.aa-texas.org/', name: 'AA Texas' },
  { state: 'Florida', url: 'https://www.aa-florida.org/', name: 'AA Florida' }
];

const MeetingFinder: React.FC<MeetingFinderProps> = ({ onBack }) => {
  const [searchCity, setSearchCity] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      try {
        const permission = await navigator.permissions.query({name: 'geolocation'});
        setLocationPermission(permission.state);
      } catch (error) {
        console.log('Location permission check failed');
      }
    }
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.log('Location access denied');
          setLocationPermission('denied');
        }
      );
    }
  };

  const searchMeetings = (city: string) => {
    const searchQuery = encodeURIComponent(city);
    const aaUrl = `https://www.aa.org/find-aa/north-america?search=${searchQuery}`;
    window.open(aaUrl, '_blank');
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'aa': return 'bg-blue-500/20 text-blue-300';
      case 'na': return 'bg-green-500/20 text-green-300';
      case 'aa online': return 'bg-purple-500/20 text-purple-300';
      case 'na online': return 'bg-teal-500/20 text-teal-300';
      case 'smart': return 'bg-orange-500/20 text-orange-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 p-4">
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
          <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Meeting Finder</h1>
          <p className="text-gray-300">Find recovery meetings in your area</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Search by Location</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                placeholder="Enter city, state (e.g., Seattle, WA)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white flex-1"
                onKeyPress={(e) => e.key === 'Enter' && searchCity && searchMeetings(searchCity)}
              />
              <Button
                onClick={() => searchCity && searchMeetings(searchCity)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!searchCity.trim()}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            {locationPermission === 'prompt' && (
              <Button
                onClick={requestLocation}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </Button>
            )}
            
            {userLocation && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm">
                  Location enabled. Search results will be more accurate.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Official Meeting Resources</h2>
          <div className="grid gap-4">
            {meetingResources.map((resource) => (
              <Card key={resource.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{resource.name}</h3>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {resource.coverage}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <Button
                    onClick={() => window.open(resource.url, '_blank')}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Regional Resources</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {regionalResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{resource.name}</span>
                    <span className="text-gray-400 text-sm ml-2">({resource.state})</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(resource.url, '_blank')}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Visit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-6">
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Privacy Notice</h3>
            <p className="text-gray-300 text-sm">
              This app respects AA/NA traditions. We don't store meeting data but connect you to official resources.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingFinder;