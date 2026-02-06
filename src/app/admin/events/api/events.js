export const eventsApi = {
  // Get all events
  async getEvents(params = {}) {

    const res = await fetch('http://localhost:5000/api/event/', {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    // Apply filters
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      events = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.location?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params.status && params.status !== 'all') {
      events = events.filter(event => 
        params.status === 'active' ? event.isActive : !event.isActive
      );
    }
    
    // Apply sorting
    if (params.sortBy) {
      events.sort((a, b) => {
        if (params.sortBy === 'date') return new Date(a.date) - new Date(b.date);
        if (params.sortBy === 'name') return a.name.localeCompare(b.name);
        if (params.sortBy === 'guestCount') return b.guestCount - a.guestCount;
        return 0;
      });
    }
    
    // Apply pagination
    const page = params.page || 1;
    const perPage = params.perPage || 5;
    const startIndex = (page - 1) * perPage;
    const paginatedEvents = events.slice(startIndex, startIndex + perPage);
    
    return {
      data: paginatedEvents,
      total: events.length,
      page,
      perPage,
      totalPages: Math.ceil(events.length / perPage)
    };
  },
  
  // Get single event
  async getEvent(id) {

    const res = await fetch(`http://localhost:5000/api/event/find/${id}`, {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    const event = events.find(e => e.id === id);
    return event || null;
  },
  
  // Create event
  async createEvent(eventData) {
    const res = await fetch('http://localhost:5000/api/event/', {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      createdAt: new Date()
    };
    events.unshift(newEvent);
    return newEvent;
  },
  
  // Update event
  async updateEvent(id, eventData) {
    const res = await fetch('http://localhost:5000/api/event/', {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...eventData };
      return events[index];
    }
    return null;
  },
  
  // Delete event
  async deleteEvent(id) {
    const res = await fetch('http://localhost:5000/api/event/', {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events.splice(index, 1);
      return true;
    }
    return false;
  },
  
  // Get statistics
  async getStatistics() {
    const res = await fetch('http://localhost:5000/api/event/', {
        'credentials' : 'include',
        'cache' : 'no-store'
    });

    const responseData = await res.json();
    let events = responseData.events;
    
    const activeEvents = events.filter(e => e.isActive);
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date());
    const totalGuests = events.reduce((sum, event) => sum + event.guestCount, 0);
    
    return {
      totalEvents: events.length,
      activeEvents: activeEvents.length,
      totalGuests,
      upcomingEvents: upcomingEvents.length,
      recentEvents: events.slice(0, 2).length
    };
  }
};