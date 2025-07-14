import React, { useState } from 'react';
import MainApp from './MainApp';
import Logo from './Logo';
import { CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <MainApp />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Logo />
            <button 
              onClick={() => setShowApp(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Connection for <span className="text-teal-400">Clean Living</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join a supportive community of people on their recovery journey. Share your story, find strength, and build lasting connections in a safe, judgment-free space.
          </p>
        </div>
      </section>

      {/* How Recovr Helps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            How Recovr Helps
          </h3>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="space-y-4">
              <HelpItem text="Connect with others who understand your journey" />
              <HelpItem text="Share your story in a safe, judgment-free environment" />
              <HelpItem text="Access meditation tools and recovery mantras" />
              <HelpItem text="Track your clean time and celebrate milestones" />
              <HelpItem text="Get crisis support when you need it most" />
              <HelpItem text="Keep a private recovery journal" />
              <HelpItem text="Practice daily gratitude and mindfulness" />
              <HelpItem text="Find local sober events and meetings" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Recovr. This app is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const HelpItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
      <span className="text-gray-200">{text}</span>
    </div>
  );
};

export default HomePage;