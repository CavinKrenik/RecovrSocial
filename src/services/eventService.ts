export interface UserEvent {
  id: string;
  name: string;
  date: string;
  time?: string;
  location?: string;
  details?: string;
  website?: string;
  category: string;
  created_at: string;
}

class EventService {
  private storageKey = 'user_events';

  // Get all events and automatically clean up old ones
  async getEvents(): Promise<UserEvent[]> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      let events: UserEvent[] = stored ? JSON.parse(stored) : [];
      
      // Remove events older than 1 day
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      events = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= oneDayAgo;
      });
      
      // Save cleaned events back to storage
      localStorage.setItem(this.storageKey, JSON.stringify(events));
      
      return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  // Add a new event
  async addEvent(eventData: Omit<UserEvent, 'id' | 'created_at' | 'category'>): Promise<UserEvent> {
    try {
      const newEvent: UserEvent = {
        id: crypto.randomUUID(),
        ...eventData,
        category: 'Community',
        created_at: new Date().toISOString()
      };

      const events = await this.getEvents();
      events.push(newEvent);
      
      localStorage.setItem(this.storageKey, JSON.stringify(events));
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('eventsUpdated'));
      
      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      throw new Error('Failed to add event');
    }
  }

  // Clean up old events (called periodically)
  async cleanupOldEvents(): Promise<void> {
    await this.getEvents(); // This automatically cleans up old events
  }
}

export const eventService = new EventService();