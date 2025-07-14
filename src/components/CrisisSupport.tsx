import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, ExternalLink, Heart, AlertTriangle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SupportResource {
  id: string;
  name: string;
  type: string;
  phone?: string;
  url?: string;
  description: string;
}

interface CrisisSupportProps {
  onBack?: () => void;
}

const defaultResources: SupportResource[] = [
  {
    id: '1',
    name: '988 Suicide & Crisis Lifeline',
    type: 'crisis',
    phone: '988',
    url: 'https://988lifeline.org/',
    description: '24/7 free and confidential support for people in distress'
  },
  {
    id: '2',
    name: 'SAMHSA National Helpline',
    type: 'substance abuse',
    phone: '1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    description: 'Treatment referral and information service'
  },
  {
    id: '3',
    name: 'Crisis Text Line',
    type: 'crisis',
    phone: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org/',
    description: 'Free, 24/7 support via text message'
  },
  {
    id: '4',
    name: 'National Domestic Violence Hotline',
    type: 'domestic violence',
    phone: '1-800-799-7233',
    url: 'https://www.thehotline.org/',
    description: '24/7 confidential support for domestic violence survivors'
  },
  {
    id: '5',
    name: 'Emergency Services',
    type: 'emergency',
    phone: '911',
    description: 'For immediate life-threatening emergencies'
  }
];

const CrisisSupport: React.FC<CrisisSupportProps> = ({ onBack }) => {
  const [resources, setResources] = useState<SupportResource[]>(defaultResources);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('support_resources')
        .select('*')
        .order('type', { ascending: true });
      
      if (data && data.length > 0) {
        setResources(data);
      }
    } catch (error) {
      console.log('Using default resources');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length >= 3) {
      window.location.href = `tel:${phone}`;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'crisis': return 'bg-red-500/20 text-red-300';
      case 'substance abuse': return 'bg-blue-500/20 text-blue-300';
      case 'domestic violence': return 'bg-purple-500/20 text-purple-300';
      case 'emergency': return 'bg-orange-500/20 text-orange-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'crisis': return AlertTriangle;
      case 'emergency': return AlertTriangle;
      default: return Heart;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 p-4">
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
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Crisis Support</h1>
          <p className="text-gray-300">Immediate help when you need it most</p>
        </div>

        <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Emergency Notice</h2>
            </div>
            <p className="text-gray-200 mb-4">
              If you are in immediate danger or having thoughts of self-harm, please call 911 or go to your nearest emergency room.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleCall('911')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button
                onClick={() => handleCall('988')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 988
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {resources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <TypeIcon className="w-6 h-6 text-white mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {resource.phone && (
                      <Button
                        onClick={() => handleCall(resource.phone!)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {resource.phone}
                      </Button>
                    )}
                    {resource.url && (
                      <Button
                        onClick={() => window.open(resource.url, '_blank')}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">You Are Not Alone</h3>
            <p className="text-gray-300">
              Recovery is a journey, and it's okay to ask for help. These resources are here for you 24/7.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrisisSupport;