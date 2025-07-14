import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Star, ArrowLeft } from 'lucide-react';
import CleanDatePicker from './CleanDatePicker';

interface CleanTimeTrackerProps {
  onBack: () => void;
}

const CleanTimeTracker: React.FC<CleanTimeTrackerProps> = ({ onBack }) => {
  const [cleanDate, setCleanDate] = useState<string>('');
  const [daysClean, setDaysClean] = useState(0);
  const [nextMilestone, setNextMilestone] = useState(30);
  const [progress, setProgress] = useState(0);
  const [earnedMilestones, setEarnedMilestones] = useState<number[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const milestones = [30, 60, 90, 180, 365, 730, 1095]; // 30 days, 2 months, 3 months, 6 months, 1 year, 2 years, 3 years
  
  const motivationalQuotes = [
    "Every day clean is a victory worth celebrating.",
    "Progress, not perfection.",
    "One day at a time, one step at a time.",
    "Your recovery is your greatest achievement.",
    "Strength grows in the moments you think you can't go on.",
    "You are stronger than your struggles."
  ];

  useEffect(() => {
    const savedCleanDate = localStorage.getItem('recovr_clean_date');
    if (savedCleanDate) {
      setCleanDate(savedCleanDate);
      calculateProgress(savedCleanDate);
    }
  }, []);

  const calculateProgress = (dateString: string) => {
    const cleanDateObj = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - cleanDateObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysClean(Math.max(0, diffDays));
    
    // Find next milestone
    const nextMilestoneValue = milestones.find(m => m > diffDays) || milestones[milestones.length - 1];
    setNextMilestone(nextMilestoneValue);
    
    // Calculate progress to next milestone
    const previousMilestone = milestones.filter(m => m <= diffDays).pop() || 0;
    const progressPercent = ((diffDays - previousMilestone) / (nextMilestoneValue - previousMilestone)) * 100;
    setProgress(Math.min(progressPercent, 100));
    
    // Set earned milestones
    const earned = milestones.filter(m => m <= diffDays);
    setEarnedMilestones(earned);
  };

  const handleDateSave = (date: string) => {
    localStorage.setItem('recovr_clean_date', date);
    setCleanDate(date);
    calculateProgress(date);
    setShowDatePicker(false);
  };

  const getDaysToNextMilestone = () => {
    return Math.max(0, nextMilestone - daysClean);
  };

  const getRandomQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
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
            <h1 className="text-2xl font-bold text-white">Clean Time Tracker</h1>
          </div>
          
          {/* Main Counter */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{daysClean}</div>
                <div className="text-sm text-white/80">Days</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{daysClean} Days Strong</h2>
            <p className="text-gray-300">Clean since {cleanDate ? new Date(cleanDate).toLocaleDateString() : 'Not set'}</p>
          </div>
          
          {/* Progress to Next Milestone */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm sm:text-base">Next Milestone: {nextMilestone} Days</span>
              <span className="text-teal-400 text-sm">{getDaysToNextMilestone()} days to go</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          
          {/* Earned Milestones */}
          <div className="mb-8">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Earned Milestones
            </h3>
            <div className="flex flex-wrap gap-2">
              {earnedMilestones.map((milestone) => (
                <Badge key={milestone} className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                  <Star className="w-3 h-3 mr-1" />
                  {milestone} Days
                </Badge>
              ))}
              {earnedMilestones.length === 0 && (
                <p className="text-gray-400 text-sm">Complete your first 30 days to earn your first milestone!</p>
              )}
            </div>
          </div>
          
          {/* Motivational Quote */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <h3 className="text-white font-bold mb-2">Daily Motivation</h3>
            <p className="text-gray-300 italic">"{getRandomQuote()}"</p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => setShowDatePicker(true)}
              className="w-full bg-teal-500 hover:bg-teal-600"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {cleanDate ? 'Update Clean Date' : 'Set Clean Date'}
            </Button>
            
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Back to Resources
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showDatePicker && (
        <CleanDatePicker
          currentDate={cleanDate}
          onSave={handleDateSave}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default CleanTimeTracker;