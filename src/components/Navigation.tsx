import React from 'react';
import { Home, BookOpen, Calendar, User } from 'lucide-react';

type ActiveTab = 'home' | 'resources' | 'events' | 'profile' | 'mantras' | 'journal' | 'crisis' | 'meetings';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'resources' as ActiveTab, label: 'Resources', icon: BookOpen },
    { id: 'events' as ActiveTab, label: 'Events', icon: Calendar },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around py-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors min-w-0 flex-shrink-0 ${
                  isActive 
                    ? 'text-teal-400 bg-teal-400/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;