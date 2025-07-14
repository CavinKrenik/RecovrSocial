import React from 'react';
import EventsSection from './EventsSection';
import Logo from './Logo';

const UpdatedEventsSection: React.FC = () => {
  return (
    <div>
      <div className="text-center py-8">
        <Logo size="sm" className="justify-center mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Sober Events</h1>
        <p className="text-gray-300">Find clean & sober events near you</p>
      </div>
      <EventsSection />
    </div>
  );
};

export default UpdatedEventsSection;