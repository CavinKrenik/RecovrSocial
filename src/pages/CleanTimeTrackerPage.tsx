import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Trophy, Target, TrendingUp } from 'lucide-react';

interface CleanTimeTrackerPageProps {
  onBack: () => void;
}

const CleanTimeTrackerPage: React.FC<CleanTimeTrackerPageProps> = ({ onBack }) => {
  const [cleanDate, setCleanDate] = useState<Date | null>(null);
  const [daysClean, setDaysClean] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const savedDate = localStorage.getItem('recovr_clean_date');
    if (savedDate) {
      const date = new Date(savedDate);
      setCleanDate(date);
      calculateDays(date);
    }
  }, []);

  const calculateDays = (date: Date) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysClean(diffDays);
  };

  const handleDateChange = (dateString: string) => {
    const date = new Date(dateString);
    setCleanDate(date);
    localStorage.setItem('recovr_clean_date', date.toISOString());
    calculateDays(date);
    setShowDatePicker(false);
  };

  const milestones = [
    { days: 1, title: 'First Day', achieved: daysClean >= 1 },
    { days: 7, title: 'One Week', achieved: daysClean >= 7 },
    { days: 30, title: 'One Month', achieved: daysClean >= 30 },
    { days: 90, title: 'Three Months', achieved: daysClean >= 90 },
    { days: 180, title: 'Six Months', achieved: daysClean >= 180 },
    { days: 365, title: 'One Year', achieved: daysClean >= 365 }
  ];

  const getNextMilestone = () => {
    return milestones.find(m => !m.achieved) || milestones[milestones.length - 1];
  };

  const nextMilestone = getNextMilestone();
  const progress = nextMilestone ? (daysClean / nextMilestone.days) * 100 : 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-800">
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
          <h1 className="text-2xl font-bold text-white">Clean Time Tracker</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Calendar className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <div className="text-6xl font-bold text-teal-400 mb-2">{daysClean}</div>
              <p className="text-xl text-white font-semibold">Days Clean</p>
              {cleanDate && (
                <p className="text-gray-300 text-sm mt-2">
                  Since {formatDate(cleanDate)}
                </p>
              )}
            </div>
            
            {!cleanDate ? (
              <Button 
                onClick={() => setShowDatePicker(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Set Clean Date
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => setShowDatePicker(true)}
                className="border-white/20 text-white hover:bg-white/20"
              >
                Update Clean Date
              </Button>
            )}
          </CardContent>
        </Card>

        {showDatePicker && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Set Your Clean Date</h3>
              <input
                type="date"
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md p-2"
                max={new Date().toISOString().split('T')[0]}
              />
              <Button 
                variant="outline"
                onClick={() => setShowDatePicker(false)}
                className="mt-4 border-white/20 text-white hover:bg-white/20"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}

        {cleanDate && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Next Milestone</h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{nextMilestone.title}</span>
                  <span className="text-cyan-400">
                    {nextMilestone.achieved ? 'Achieved!' : `${nextMilestone.days - daysClean} days to go`}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div 
                    className="bg-cyan-400 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-lg font-bold text-white">Milestones</h3>
            </div>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    milestone.achieved 
                      ? 'bg-green-500/20 border border-green-400/30' 
                      : 'bg-gray-500/20 border border-gray-400/30'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      milestone.achieved ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                    <span className={`font-medium ${
                      milestone.achieved ? 'text-green-400' : 'text-gray-300'
                    }`}>
                      {milestone.title}
                    </span>
                  </div>
                  <span className={`text-sm ${
                    milestone.achieved ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {milestone.days} {milestone.days === 1 ? 'day' : 'days'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CleanTimeTrackerPage;