import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, Shield, HelpCircle, User } from 'lucide-react';
import CleanDatePicker from './CleanDatePicker';

interface ProfilePagesProps {
  currentPage: string;
  onBack: () => void;
  userNickname: string;
  onNicknameChange: (nickname: string) => void;
}

const ProfilePages: React.FC<ProfilePagesProps> = ({ 
  currentPage, 
  onBack, 
  userNickname, 
  onNicknameChange 
}) => {
  const [nickname, setNickname] = useState(userNickname);
  const [cleanDate, setCleanDate] = useState('');
  const [cleanDays, setCleanDays] = useState(0);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const savedCleanDate = localStorage.getItem('recovr_clean_date');
    const savedAnonymous = localStorage.getItem('recovr_anonymous_mode');
    const savedProfileVisible = localStorage.getItem('recovr_profile_visible');
    
    if (savedCleanDate) {
      setCleanDate(savedCleanDate);
      const cleanDateObj = new Date(savedCleanDate);
      const today = new Date();
      const diffTime = today.getTime() - cleanDateObj.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setCleanDays(Math.max(0, diffDays));
    }
    if (savedAnonymous) setAnonymousMode(savedAnonymous === 'true');
    if (savedProfileVisible) setProfileVisible(savedProfileVisible === 'true');
  }, []);

  const handleNicknameSave = () => {
    if (nickname.trim()) {
      localStorage.setItem('recovr_nickname', nickname);
      onNicknameChange(nickname);
      onBack();
    }
  };

  const handleCleanDateSave = (date: string) => {
    localStorage.setItem('recovr_clean_date', date);
    setCleanDate(date);
    const cleanDateObj = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - cleanDateObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setCleanDays(Math.max(0, diffDays));
    setShowDatePicker(false);
    window.dispatchEvent(new Event('cleanDateUpdated'));
  };

  const handlePrivacySave = () => {
    localStorage.setItem('recovr_anonymous_mode', anonymousMode.toString());
    localStorage.setItem('recovr_profile_visible', profileVisible.toString());
    onBack();
  };

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      const subject = encodeURIComponent('Recovr App Feedback');
      const body = encodeURIComponent(`Feedback from user:\n\n${feedbackText}`);
      const mailtoLink = `mailto:cavinkrenik5@icloud.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      setFeedbackText('');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'change-nickname':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Change Nickname</h2>
              <p className="text-gray-300">Update your display name</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nickname" className="text-white">New Nickname</Label>
                <Input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  maxLength={20}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleNicknameSave}
                  disabled={!nickname.trim()}
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                >
                  Save Changes
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'set-clean-date':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Clean Time Tracker</h2>
              <p className="text-gray-300">Track your recovery progress</p>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calendar className="w-6 h-6 text-teal-400" />
                    <h3 className="text-xl font-bold text-white">Clean Time Tracker</h3>
                  </div>
                  <div className="text-4xl font-bold text-teal-400 mb-2">{cleanDays} Days</div>
                  <p className="text-gray-300 text-sm">Strong and counting</p>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setShowDatePicker(true)}
                  >
                    {cleanDays > 0 ? 'Update Date' : 'Set Clean Date'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
          </div>
        );
        
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Privacy Settings</h2>
              <p className="text-gray-300">Control your visibility and data</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Anonymous Mode</h3>
                  <p className="text-gray-400 text-sm">Post anonymously in the feed</p>
                </div>
                <Switch
                  checked={anonymousMode}
                  onCheckedChange={setAnonymousMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Profile Visibility</h3>
                  <p className="text-gray-400 text-sm">Make your profile public</p>
                </div>
                <Switch
                  checked={profileVisible}
                  onCheckedChange={setProfileVisible}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handlePrivacySave}
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                >
                  Save Settings
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'help':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <HelpCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Help & Support</h2>
              <p className="text-gray-300">Get help and submit feedback</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Frequently Asked Questions</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• How do I reset my clean date?</p>
                  <p>• Can I change my nickname?</p>
                  <p>• How do I enable anonymous posting?</p>
                  <p>• What if I need crisis support?</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedback" className="text-white">Submit Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience or report a bug..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackText.trim()}
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                >
                  Submit
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Button 
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-white">Profile Settings</h1>
          </div>
          
          {renderContent()}
        </CardContent>
      </Card>
      
      {showDatePicker && (
        <CleanDatePicker
          currentDate={cleanDate}
          onSave={handleCleanDateSave}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default ProfilePages;