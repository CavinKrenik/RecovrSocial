import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, Globe } from 'lucide-react';
import { eventService } from '@/services/eventService';

interface EventSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSuggestionModal: React.FC<EventSuggestionModalProps> = ({ isOpen, onClose }) => {
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
    
    if (!formData.name || !formData.date) {
      alert('Please fill in the event name and date.');
      return;
    }

    const eventDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
      alert('Please select a current or future date.');
      return;
    }

    try {
      await eventService.addEvent(formData);
      
      alert('Event suggestion submitted successfully!');
      
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        details: '',
        website: ''
      });
      
      onClose();
      
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Suggest a Sober Event</DialogTitle>
        </DialogHeader>
        
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
          
          <div className="grid grid-cols-2 gap-3">
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

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Submit Event
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventSuggestionModal;