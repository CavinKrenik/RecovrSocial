import React, { useState, useEffect } from 'react';
import OnboardingFlow from './OnboardingFlow';
import SplashScreen from './SplashScreen';
import Navigation from './Navigation';
import Logo from './Logo';
import UpdatedResourcesSection from './UpdatedResourcesSection';
import UpdatedEventsSection from './UpdatedEventsSection';
import ProfilePages from './ProfilePages';
import CleanTimeTrackerPage from '../pages/CleanTimeTrackerPage';

type AppState = 'splash' | 'onboarding' | 'main';
type ActiveTab = 'home' | 'resources' | 'events' | 'profile';
type ProfilePage = 'main' | 'change-nickname' | 'set-clean-date' | 'privacy' | 'help' | 'clean-tracker';

const MainApp: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [profilePage, setProfilePage] = useState<ProfilePage>('main');
  const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const savedNickname = localStorage.getItem('recovr_nickname');
    if (savedNickname) {
      setUserNickname(savedNickname);
      setAppState('main');
    }
  }, []);

  const handleOnboardingComplete = (nickname: string) => {
    setUserNickname(nickname);
    localStorage.setItem('recovr_nickname', nickname);
    setAppState('main');
  };

  const handleSplashComplete = () => {
    setAppState('onboarding');
  };

  const handleNicknameChange = (newNickname: string) => {
    setUserNickname(newNickname);
  };

  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="sm" />
            <div className="text-white text-sm">Welcome, {userNickname}</div>
          </div>
        </div>
      </header>

      <main className="pb-20">
        {activeTab === 'home' && (
          <div className="text-center py-12 px-4">
            <Logo size="lg" className="justify-center mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Recovr</h1>
            <p className="text-xl text-gray-300 mb-2">Connect • Share • Heal</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We're here to help people in recovery connect with clean and sober events! 
              Your recovery journey matters, and every day counts.
            </p>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <UpdatedResourcesSection />
        )}
        
        {activeTab === 'events' && <UpdatedEventsSection />}
        
        {activeTab === 'profile' && profilePage === 'main' && (
          <ProfileSection userNickname={userNickname} onNavigate={setProfilePage} />
        )}
        
        {activeTab === 'profile' && profilePage === 'clean-tracker' && (
          <CleanTimeTrackerPage onBack={() => setProfilePage('main')} />
        )}
        
        {activeTab === 'profile' && profilePage !== 'main' && profilePage !== 'clean-tracker' && (
          <ProfilePages
            currentPage={profilePage}
            onBack={() => setProfilePage('main')}
            userNickname={userNickname}
            onNicknameChange={handleNicknameChange}
          />
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setProfilePage('main');
      }} />
    </div>
  );
};

const ProfileSection: React.FC<{ userNickname: string; onNavigate: (page: ProfilePage) => void }> = ({ userNickname, onNavigate }) => {
  const [daysClean, setDaysClean] = useState(0);
  
  useEffect(() => {
    const savedCleanDate = localStorage.getItem('recovr_clean_date');
    if (savedCleanDate) {
      const cleanDate = new Date(savedCleanDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - cleanDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysClean(diffDays);
    }
  }, []);
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center py-8">
        <Logo size="sm" className="justify-center mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-300">Manage your recovery profile</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">
              {userNickname[0].toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{userNickname}</h2>
          <p className="text-gray-300 text-sm">Member since today</p>
          {daysClean > 0 && (
            <p className="text-teal-400 text-sm font-medium mt-1">
              {daysClean} days clean
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <button onClick={() => onNavigate('change-nickname')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-left transition-colors">
            Change Nickname
          </button>
          <button onClick={() => onNavigate('set-clean-date')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-left transition-colors">
            Set Clean Date
          </button>
          <button onClick={() => onNavigate('clean-tracker')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-left transition-colors">
            View Clean Time Tracker
          </button>
          <button onClick={() => onNavigate('privacy')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-left transition-colors">
            Privacy Settings
          </button>
          <button onClick={() => onNavigate('help')} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg text-left transition-colors">
            Help & Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainApp;