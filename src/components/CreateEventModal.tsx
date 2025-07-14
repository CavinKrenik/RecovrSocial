import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface CreateEventModalProps {
  onClose: () => void;
  userId: string;
  onEventCreated: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, userId, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location_name: '',
    category: '',
    is_free: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        try {
          const { data, error } = await supabase.storage
            .from('event-images')
            .upload(fileName, imageFile);

          if (data) {
            const { data: { publicUrl } } = supabase.storage
              .from('event-images')
              .getPublicUrl(fileName);
            imageUrl = publicUrl;
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

      const eventData = {
        ...formData,
        created_by: userId,
        image_url: imageUrl
      };

      try {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (!error) {
          onEventCreated();
          onClose();
        }
      } catch (error) {
        console.error('Error creating event:', error);
        // Fallback to localStorage
        const localEvent = {
          id: Date.now().toString(),
          ...eventData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        const localEvents = JSON.parse(localStorage.getItem('local_events') || '[]');
        const updatedEvents = [...localEvents, localEvent];
        localStorage.setItem('local_events', JSON.stringify(updatedEvents));
        onEventCreated();
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 [color-scheme:dark]"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 [color-scheme:dark]"
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="City"
            value={formData.location_name}
            onChange={(e) => setFormData({...formData, location_name: e.target.value})}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-3 bg-slate-700 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="" className="bg-slate-700 text-white">Select Category</option>
            <option value="Meeting" className="bg-slate-700 text-white">Meeting</option>
            <option value="Social" className="bg-slate-700 text-white">Social</option>
            <option value="Wellness" className="bg-slate-700 text-white">Wellness</option>
            <option value="Education" className="bg-slate-700 text-white">Education</option>
            <option value="Other" className="bg-slate-700 text-white">Other</option>
          </select>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_free"
              checked={formData.is_free}
              onChange={(e) => setFormData({...formData, is_free: e.target.checked})}
              className="w-4 h-4 text-teal-500"
            />
            <label htmlFor="is_free" className="text-white">Free Event</label>
          </div>
          
          <div>
            <label className="block text-white mb-2">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
          >
            {uploading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;