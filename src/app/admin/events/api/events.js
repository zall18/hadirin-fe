const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const eventsApi = {
  // ========== EVENT MANAGEMENT ==========
  
  // GET /api/events - Get all events dengan filter, sorting & pagination
  async getEvents(params = {}) {
    try {
      // Build query params
      const queryParams = new URLSearchParams()
      if (params.search) queryParams.append('search', params.search)
      if (params.status) queryParams.append('status', params.status)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder || 'asc')
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit || 10)
      if (params.venueType) queryParams.append('venueType', params.venueType)
      if (params.invitationType) queryParams.append('invitationType', params.invitationType)
      if (params.fromDate) queryParams.append('fromDate', params.fromDate)
      if (params.toDate) queryParams.append('toDate', params.toDate)

      const url = `${API_URL}/events${queryParams.toString() ? `?${queryParams}` : ''}`
      
      const res = await fetch(url, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const responseData = await res.json()
      
      // Jika API sudah support filtering & pagination
      if (responseData.data && responseData.pagination) {
        return {
          data: responseData.data,
          total: responseData.pagination.total || 0,
          page: responseData.pagination.page || 1,
          limit: responseData.pagination.limit || 10,
          totalPages: responseData.pagination.totalPages || 0,
          summary: responseData.summary || null
        }
      }
      
      // Fallback: client-side filtering (jika API belum support)
      let events = responseData.data || responseData.events || []
      
      // Filter
      if (params.search) {
        const searchTerm = params.search.toLowerCase()
        events = events.filter(event => 
          event.weddingTitle?.toLowerCase().includes(searchTerm) ||
          event.groomName?.toLowerCase().includes(searchTerm) ||
          event.brideName?.toLowerCase().includes(searchTerm) ||
          event.venueName?.toLowerCase().includes(searchTerm) ||
          event.shortCode?.toLowerCase().includes(searchTerm)
        )
      }
      
      if (params.status && params.status !== 'all') {
        events = events.filter(event => {
          if (params.status === 'active') return event.isActive === true
          if (params.status === 'inactive') return event.isActive === false
          if (params.status === 'published') return event.isPublished === true
          if (params.status === 'draft') return event.isPublished === false
          return true
        })
      }
      
      // Sorting
      if (params.sortBy) {
        const sortOrder = params.sortOrder === 'desc' ? -1 : 1
        events.sort((a, b) => {
          if (params.sortBy === 'date') return sortOrder * (new Date(a.date) - new Date(b.date))
          if (params.sortBy === 'createdAt') return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt))
          if (params.sortBy === 'name') return sortOrder * (a.weddingTitle || '').localeCompare(b.weddingTitle || '')
          if (params.sortBy === 'guestCount') return sortOrder * ((a.totalGuests || 0) - (b.totalGuests || 0))
          if (params.sortBy === 'confirmedCount') return sortOrder * ((a.confirmedCount || 0) - (b.confirmedCount || 0))
          return 0
        })
      }
      
      // Pagination
      const page = params.page || 1
      const limit = params.limit || 10
      const startIndex = (page - 1) * limit
      const paginatedEvents = events.slice(startIndex, startIndex + limit)
      
      return {
        data: paginatedEvents,
        total: events.length,
        page,
        limit,
        totalPages: Math.ceil(events.length / limit),
        summary: {
          total: events.length,
          active: events.filter(e => e.isActive).length,
          published: events.filter(e => e.isPublished).length,
          draft: events.filter(e => !e.isPublished).length,
          upcoming: events.filter(e => new Date(e.date) > new Date()).length
        }
      }
    } catch (error) {
      console.error('❌ Error fetching events:', error)
      throw error
    }
  },

  // GET /api/events/:identifier - Get single event by ID or slug
  async getEvent(identifier) {
    try {
      const res = await fetch(`${API_URL}/events/${identifier}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        if (res.status === 404) return null
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const responseData = await res.json()
      console.log(responseData.data);
      return responseData.data || responseData.event || null
    } catch (error) {
      console.error(`❌ Error fetching event ${identifier}:`, error)
      throw error
    }
  },

  // GET /api/events/public/:shortCode - Get event by short code (public)
  async getEventByShortCode(shortCode) {
    try {
      const res = await fetch(`${API_URL}/events/public/${shortCode}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        if (res.status === 404) return null
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const responseData = await res.json()
      return responseData.data || null
    } catch (error) {
      console.error(`❌ Error fetching event by short code ${shortCode}:`, error)
      throw error
    }
  },

  // POST /api/events - Create new event
  async createEvent(eventData) {
    try {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      const responseData = await res.json()
      
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: responseData.message || 'Failed to create event',
          errors: responseData.errors || null
        }
      }

      return {
        success: true,
        status: res.status,
        data: responseData.data || responseData.event,
        message: responseData.message || 'Event created successfully'
      }
    } catch (error) {
      console.error('❌ Error creating event:', error)
      throw error
    }
  },

  // PUT /api/events/:id - Update event
  async updateEvent(id, eventData) {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      const responseData = await res.json()
      
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: responseData.message || 'Failed to update event',
          errors: responseData.errors || null
        }
      }

      return {
        success: true,
        status: res.status,
        data: responseData.data || responseData.event,
        message: responseData.message || 'Event updated successfully'
      }
    } catch (error) {
      console.error(`❌ Error updating event ${id}:`, error)
      throw error
    }
  },

  // PATCH /api/events/:id/toggle - Toggle event activation
  async toggleEventActivation(id) {
    try {
      const res = await fetch(`${API_URL}/events/${id}/toggle`, {
        method: 'PATCH',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: responseData.message || 'Failed to toggle event'
        }
      }

      return {
        success: true,
        status: res.status,
        data: responseData.data,
        message: responseData.message || 'Event toggled successfully'
      }
    } catch (error) {
      console.error(`❌ Error toggling event ${id}:`, error)
      throw error
    }
  },

  // PATCH /api/events/:id/publish - Publish event
  async publishEvent(id) {
    try {
      const res = await fetch(`${API_URL}/events/${id}/publish`, {
        method: 'PATCH',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isPublished: true })
      })

      const responseData = await res.json()
      return {
        success: res.ok,
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error(`❌ Error publishing event ${id}:`, error)
      throw error
    }
  },

  // PATCH /api/events/:id/unpublish - Unpublish event
  async unpublishEvent(id) {
    try {
      const res = await fetch(`${API_URL}/events/${id}/publish`, {
        method: 'PATCH',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isPublished: false })
      })

      const responseData = await res.json()
      return {
        success: res.ok,
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error(`❌ Error unpublishing event ${id}:`, error)
      throw error
    }
  },

  // DELETE /api/events/:id - Delete event
  async deleteEvent(id) {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      
      return {
        success: res.ok,
        status: res.status,
        message: responseData.message || 'Event deleted successfully'
      }
    } catch (error) {
      console.error(`❌ Error deleting event ${id}:`, error)
      throw error
    }
  },

  // ========== EVENT STATISTICS ==========

  // GET /api/events/stats/summary - Get global event statistics
  async getStatistics() {
    try {
      const res = await fetch(`${API_URL}/events/stats/summary`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const responseData = await res.json()
      const stats = responseData.data || {}
      
      return {
        totalEvents: stats.totalEvents || 0,
        activeEvents: stats.activeEvents || 0,
        publishedEvents: stats.publishedEvents || 0,
        draftEvents: stats.draftEvents || 0,
        totalGuests: stats.totalGuests || 0,
        totalConfirmed: stats.totalConfirmed || 0,
        totalAttended: stats.totalAttended || 0,
        upcomingEvents: stats.upcomingEvents || 0,
        pastEvents: stats.pastEvents || 0,
        recentEvents: stats.recentEvents || 0,
        eventsThisMonth: stats.eventsThisMonth || 0,
        eventsNextMonth: stats.eventsNextMonth || 0,
        averageGuestsPerEvent: stats.averageGuestsPerEvent || 0,
        confirmationRate: stats.confirmationRate || 0,
        attendanceRate: stats.attendanceRate || 0
      }
    } catch (error) {
      console.error('❌ Error fetching event statistics:', error)
      throw error
    }
  },

  // GET /api/events/stats/calendar - Get events by month for calendar
  async getCalendarEvents(year, month) {
    try {
      const res = await fetch(`${API_URL}/events/stats/calendar?year=${year}&month=${month}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      return responseData.data || []
    } catch (error) {
      console.error('❌ Error fetching calendar events:', error)
      throw error
    }
  },

  // GET /api/events/stats/trends - Get event trends
  async getEventTrends(period = 'month') {
    try {
      const res = await fetch(`${API_URL}/events/stats/trends?period=${period}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      return responseData.data || []
    } catch (error) {
      console.error('❌ Error fetching event trends:', error)
      throw error
    }
  },

  // ========== BULK OPERATIONS ==========

  // POST /api/events/bulk - Bulk create events
  async bulkCreateEvents(eventsData) {
    try {
      const res = await fetch(`${API_URL}/events/bulk`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events: eventsData })
      })

      const responseData = await res.json()
      return {
        success: res.ok,
        status: res.status,
        data: responseData.data,
        summary: responseData.summary,
        message: responseData.message
      }
    } catch (error) {
      console.error('❌ Error bulk creating events:', error)
      throw error
    }
  },

  // DELETE /api/events/bulk - Bulk delete events
  async bulkDeleteEvents(ids) {
    try {
      const res = await fetch(`${API_URL}/events/bulk`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      })

      const responseData = await res.json()
      return {
        success: res.ok,
        status: res.status,
        summary: responseData.summary,
        message: responseData.message
      }
    } catch (error) {
      console.error('❌ Error bulk deleting events:', error)
      throw error
    }
  },

  // ========== EXPORT/IMPORT ==========

  // GET /api/events/export - Export events to CSV/Excel
  async exportEvents(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.format) queryParams.append('format', params.format || 'csv')
      if (params.fromDate) queryParams.append('fromDate', params.fromDate)
      if (params.toDate) queryParams.append('toDate', params.toDate)
      if (params.status) queryParams.append('status', params.status)

      const res = await fetch(`${API_URL}/events/export?${queryParams}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      if (params.format === 'csv' || params.format === 'excel') {
        const blob = await res.blob()
        const filename = res.headers.get('Content-Disposition')?.split('filename=')[1] || 
                        `events-export-${new Date().toISOString().split('T')[0]}.${params.format || 'csv'}`
        
        return {
          success: res.ok,
          status: res.status,
          data: blob,
          filename
        }
      }

      const responseData = await res.json()
      return responseData
    } catch (error) {
      console.error('❌ Error exporting events:', error)
      throw error
    }
  },

  // GET /api/events/template - Download import template
  async downloadTemplate() {
    try {
      const res = await fetch(`${API_URL}/events/template`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const blob = await res.blob()
      return {
        success: res.ok,
        status: res.status,
        data: blob,
        filename: 'event-import-template.xlsx'
      }
    } catch (error) {
      console.error('❌ Error downloading template:', error)
      throw error
    }
  },

  // ========== UTILITY ==========

  // GET /api/events/check-slug/:slug - Check if slug is available
  async checkSlugAvailability(slug) {
    try {
      const res = await fetch(`${API_URL}/events/check-slug/${slug}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return {
        available: responseData.available || false,
        message: responseData.message
      }
    } catch (error) {
      console.error('❌ Error checking slug:', error)
      throw error
    }
  },

  // POST /api/events/generate-shortcode - Generate unique short code
  async generateShortCode() {
    try {
      const res = await fetch(`${API_URL}/events/generate-shortcode`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      return responseData.shortCode
    } catch (error) {
      console.error('❌ Error generating short code:', error)
      throw error
    }
  }
}