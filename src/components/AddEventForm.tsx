import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Clock, MapPin, Globe } from 'lucide-react';

const AddEventForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    details: '',
    website: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.date) {
      alert('Please fill in the event name and date.');
      return;
    }

    // Check if event date is in the past
    const eventDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
      alert('Please select a current or future date.');
      return;
    }

    try {
      // Store in localStorage with automatic cleanup
      const existingEvents = JSON.parse(localStorage.getItem('soberEvents') || '[]');
      
      // Clean up old events (older than 1 day)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const filteredEvents = existingEvents.filter((event: any) => {
        const eventDate = new Date(event.date);
        return eventDate >= oneDayAgo;
      });
      
      const newEvent = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString()
      };
      
      filteredEvents.push(newEvent);
      localStorage.setItem('soberEvents', JSON.stringify(filteredEvents));
      
      alert('Event added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        details: '',
        website: ''
      });
      setIsOpen(false);
      
      // Trigger a custom event to refresh the events list
      window.dispatchEvent(new CustomEvent('eventsUpdated'));
      
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
        <CardContent className="p-4">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Sober Event
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Sober Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Event Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Enter event name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-white flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Date *
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="time" className="text-white flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-white flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Enter location or 'Virtual'"
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-white flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Website Link
            </Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="details" className="text-white">Details</Label>
            <Textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Event description, requirements, etc."
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Add Event
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEventForm;