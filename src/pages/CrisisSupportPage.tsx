import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, MessageCircle, Heart, AlertTriangle, Clock } from 'lucide-react';

interface CrisisSupportPageProps {
  onBack: () => void;
}

const CrisisSupportPage: React.FC<CrisisSupportPageProps> = ({ onBack }) => {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      type: 'emergency'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text',
      type: 'text'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      type: 'support'
    }
  ];

  const copingStrategies = [
    {
      title: 'Breathing Exercise',
      description: 'Take 5 deep breaths, hold for 4 seconds each',
      icon: Heart,
      color: 'bg-red-500/20 text-red-400'
    },
    {
      title: 'Grounding Technique',
      description: 'Name 5 things you can see, 4 you can touch, 3 you can hear',
      icon: AlertTriangle,
      color: 'bg-orange-500/20 text-orange-400'
    },
    {
      title: 'Call Someone',
      description: 'Reach out to a trusted friend, family member, or sponsor',
      icon: Phone,
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Safe Space',
      description: 'Go to a safe, comfortable place where you feel secure',
      icon: Heart,
      color: 'bg-blue-500/20 text-blue-400'
    }
  ];

  const handleCall = (number: string) => {
    if (number.includes('Text')) {
      // Handle text instructions
      alert('Text HOME to 741741 for crisis support');
    } else {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800">
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
          <h1 className="text-2xl font-bold text-white">Crisis Support</h1>
        </div>

        <Card className="bg-red-500/20 backdrop-blur-sm border-red-400/30 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Need Immediate Help?</h2>
            </div>
            <p className="text-gray-200 mb-4">
              If you're in crisis or having thoughts of self-harm, please reach out immediately.
            </p>
            <Button 
              onClick={() => handleCall('988')}
              className="bg-red-500 hover:bg-red-600 text-white w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 988 - Crisis Lifeline
            </Button>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{contact.name}</h4>
                      <p className="text-sm text-gray-300">{contact.description}</p>
                      <p className="text-orange-400 font-mono text-sm mt-1">{contact.number}</p>
                    </div>
                    <Button 
                      onClick={() => handleCall(contact.number)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {contact.type === 'text' ? (
                        <MessageCircle className="w-4 h-4" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Immediate Coping Strategies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {copingStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedResource(selectedResource === strategy.title ? null : strategy.title)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${strategy.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{strategy.title}</h4>
                        <p className="text-sm text-gray-300">{strategy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-lg font-bold text-white">Remember</h3>
            </div>
            <ul className="text-gray-200 space-y-2">
              <li>• This feeling is temporary</li>
              <li>• You are not alone in this journey</li>
              <li>• Asking for help is a sign of strength</li>
              <li>• Every day sober is a victory</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrisisSupportPage;