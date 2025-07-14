import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (nickname: string) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'splash' | 'disclaimer' | 'nickname'>('splash');
  const [nickname, setNickname] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Splash screen with fade-in animation
  if (currentStep === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68473fd6c864303e0d0d208e_1751972796317_8ffb3fa4.png" 
              alt="Recovr Logo" 
              className="w-32 h-32 mx-auto mb-6"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 opacity-0 animate-fade-in-delay">
            Welcome to your recovery journey...
          </h1>
          <div className="mt-8">
            <Button 
              onClick={() => setCurrentStep('disclaimer')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Disclaimer screen
  if (currentStep === 'disclaimer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68473fd6c864303e0d0d208e_1751972796317_8ffb3fa4.png" 
                alt="Recovr Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-2">Recovr User Agreement & Disclaimer</h2>
              <p className="text-gray-300 text-sm">
                Welcome to Recovr — a community platform designed to support those on a clean and sober journey.
              </p>
            </div>
            
            <div className="text-gray-200 space-y-4 text-sm">
              <p>By using this app, you acknowledge and agree to the following:</p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-white mb-1">1. Privacy & Safety</h3>
                  <p>You may choose to remain anonymous by using a nickname.</p>
                  <p>Do not share sensitive personal information publicly.</p>
                  <p>We do not sell or share your data with third parties.</p>
                  <p>This app does not require account verification at this time; participation is voluntary and based on mutual respect.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-1">2. Community Guidelines</h3>
                  <p>No hate speech, harassment, or triggering content.</p>
                  <p>Respect the anonymity and lived experiences of others.</p>
                  <p>Sharing is encouraged, but keep it supportive and recovery-focused.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-1">3. Legal & Medical Disclaimer</h3>
                  <p>Recovr is not a substitute for professional medical, mental health, or legal support.</p>
                  <p>This platform is community-based and peer-led.</p>
                  <p>Always consult with professionals for medical, mental health, or legal needs.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-1">4. App Use</h3>
                  <p>This app is provided "as is" without warranties.</p>
                  <p>Features may change as the app evolves.</p>
                  <p>Participation is at your own discretion and risk.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-1">5. Responsibility</h3>
                  <p>You are responsible for your own words and actions on this platform.</p>
                  <p>Misuse may result in restricted access.</p>
                </div>
              </div>
              
              <p className="text-yellow-300 font-medium mt-6">
                If you do not agree with any part of this disclaimer or terms, please refrain from using Recovr. 
                By continuing, you accept and acknowledge these terms.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => setCurrentStep('nickname')}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3"
              >
                I Agree & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Nickname setup screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center p-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68473fd6c864303e0d0d208e_1751972796317_8ffb3fa4.png" 
              alt="Recovr Logo" 
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Nickname</h2>
            <p className="text-gray-300 text-sm">
              This will be how you appear to others in the community. You can remain anonymous.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nickname" className="text-white">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                maxLength={20}
              />
            </div>
            
            <Button 
              onClick={() => onComplete(nickname)}
              disabled={!nickname.trim()}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;