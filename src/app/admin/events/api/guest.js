// Guest API Service untuk tamu undangan pernikahan
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const guestApi = {
  // ========== GUEST MANAGEMENT ==========
  
  // GET /api/guests - Get all guests (dengan filter & pagination)
  async getGuests(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.search) queryParams.append('search', params.search)
      if (params.eventId) queryParams.append('eventId', params.eventId)
      if (params.status) queryParams.append('status', params.status)
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)

      const url = `${API_URL}/guests${queryParams.toString() ? `?${queryParams}` : ''}`
      
      const res = await fetch(url, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      let guests = responseData.data || []
      
      // Client-side filtering (jika API belum mendukung)
      if (params.search && !responseData.data) {
        const searchTerm = params.search.toLowerCase()
        guests = guests.filter(guest => 
          guest.fullName?.toLowerCase().includes(searchTerm) ||
          guest.email?.toLowerCase().includes(searchTerm) ||
          guest.phone?.includes(searchTerm) ||
          guest.invitationCode?.toLowerCase().includes(searchTerm)
        )
      }
      
      if (params.status && params.status !== 'all' && !responseData.data) {
        guests = guests.filter(guest => {
          if (params.status === 'confirmed') return guest.isConfirmed === true
          if (params.status === 'attended') return guest.attended === true
          if (params.status === 'pending') return guest.isConfirmed === false && !guest.attended
          return true
        })
      }
      
      // Sorting
      if (params.sortBy && !responseData.data) {
        guests.sort((a, b) => {
          const order = params.sortOrder === 'desc' ? -1 : 1
          
          if (params.sortBy === 'name') {
            return order * (a.fullName || '').localeCompare(b.fullName || '')
          }
          if (params.sortBy === 'createdAt') {
            return order * (new Date(a.createdAt) - new Date(b.createdAt))
          }
          if (params.sortBy === 'confirmedAt') {
            return order * (new Date(a.confirmedAt || 0) - new Date(b.confirmedAt || 0))
          }
          return 0
        })
      }
      
      // Pagination
      const page = params.page || 1
      const limit = params.limit || 10
      const startIndex = (page - 1) * limit
      const paginatedGuests = guests.slice(startIndex, startIndex + limit)
      
      return {
        data: paginatedGuests,
        total: guests.length,
        page,
        limit,
        totalPages: Math.ceil(guests.length / limit),
        summary: {
          total: guests.length,
          confirmed: guests.filter(g => g.isConfirmed).length,
          attended: guests.filter(g => g.attended).length,
          pending: guests.filter(g => !g.isConfirmed && !g.attended).length
        }
      }
    } catch (error) {
      console.error('Error fetching guests:', error)
      throw error
    }
  },

  // GET /api/guests/:id - Get single guest
  async getGuest(id) {
    try {
      const res = await fetch(`${API_URL}/guests/${id}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return responseData.data || responseData
    } catch (error) {
      console.error('Error fetching guest:', error)
      throw error
    }
  },

  // GET /api/guests/by-code/:code - Get guest by invitation code
  async getGuestByCode(code) {
    try {
      const res = await fetch(`${API_URL}/guests/by-code/${code}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return responseData.data || responseData
    } catch (error) {
      console.error('Error fetching guest by code:', error)
      throw error
    }
  },

  // GET /api/guests/event/:eventId - Get guests by event
  async getGuestsByEvent(eventId, params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.status) queryParams.append('status', params.status)
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)

      const url = `${API_URL}/guests/event/${eventId}${queryParams.toString() ? `?${queryParams}` : ''}`
      
      const res = await fetch(url, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return responseData
    } catch (error) {
      console.error('Error fetching guests by event:', error)
      throw error
    }
  },

  // POST /api/guests - Create new guest
  async createGuest(guestData) {
    try {
      const res = await fetch(`${API_URL}/guests`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error creating guest:', error)
      throw error
    }
  },

  // POST /api/guests/bulk - Bulk create guests
  async bulkCreateGuests(eventId, guestsData) {
    try {
      const res = await fetch(`${API_URL}/guests/bulk`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          guests: guestsData
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message,
        summary: responseData.summary
      }
    } catch (error) {
      console.error('Error bulk creating guests:', error)
      throw error
    }
  },

  // PUT /api/guests/:id - Update guest
  async updateGuest(id, guestData) {
    try {
      const res = await fetch(`${API_URL}/guests/${id}`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error updating guest:', error)
      throw error
    }
  },

  // PATCH /api/guests/:id/confirm - Confirm guest attendance
  async confirmGuest(id, confirmationData = {}) {
    try {
      const res = await fetch(`${API_URL}/guests/${id}/confirm`, {
        method: 'PATCH',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isConfirmed: true,
          confirmedAt: new Date().toISOString(),
          ...confirmationData
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error confirming guest:', error)
      throw error
    }
  },

  // PATCH /api/guests/:id/attended - Mark guest as attended
  async markAttended(id, checkInData = {}) {
    try {
      const res = await fetch(`${API_URL}/guests/${id}/attended`, {
        method: 'PATCH',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          attended: true,
          attendedAt: new Date().toISOString(),
          ...checkInData
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error marking guest as attended:', error)
      throw error
    }
  },

  // DELETE /api/guests/:id - Delete guest
  async deleteGuest(id) {
    try {
      const res = await fetch(`${API_URL}/guests/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store'
      })

      return {
        status: res.status,
        message: res.status === 200 ? 'Guest deleted successfully' : 'Failed to delete guest'
      }
    } catch (error) {
      console.error('Error deleting guest:', error)
      throw error
    }
  },

  // DELETE /api/guests/bulk - Bulk delete guests
  async bulkDeleteGuests(ids) {
    try {
      const res = await fetch(`${API_URL}/guests/bulk`, {
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
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error bulk deleting guests:', error)
      throw error
    }
  },

  // ========== INVITATION & RSVP ==========

  // POST /api/guests/send-invitation - Send invitation to guest
  async sendInvitation(guestId, channel = 'whatsapp') {
    try {
      const res = await fetch(`${API_URL}/guests/send-invitation`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guestId,
          channel
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error sending invitation:', error)
      throw error
    }
  },

  // POST /api/guests/bulk-send-invitation - Bulk send invitations
  async bulkSendInvitations(eventId, guestIds, channel = 'whatsapp') {
    try {
      const res = await fetch(`${API_URL}/guests/bulk-send-invitation`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          guestIds,
          channel
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message,
        summary: responseData.summary
      }
    } catch (error) {
      console.error('Error bulk sending invitations:', error)
      throw error
    }
  },

  // GET /api/guests/:id/invitation - Get invitation details
  async getInvitationDetails(guestId) {
    try {
      const res = await fetch(`${API_URL}/guests/${guestId}/invitation`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return responseData.data || responseData
    } catch (error) {
      console.error('Error fetching invitation details:', error)
      throw error
    }
  },

  // ========== CHECK-IN & ATTENDANCE ==========

  // POST /api/guests/check-in - Check-in guest
  async checkInGuest(checkInData) {
    try {
      const res = await fetch(`${API_URL}/guests/check-in`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...checkInData,
          checkInTime: new Date().toISOString()
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error checking in guest:', error)
      throw error
    }
  },

  // POST /api/guests/bulk-check-in - Bulk check-in guests
  async bulkCheckIn(eventId, guestIds) {
    try {
      const res = await fetch(`${API_URL}/guests/bulk-check-in`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          guestIds,
          checkInTime: new Date().toISOString()
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message,
        summary: responseData.summary
      }
    } catch (error) {
      console.error('Error bulk checking in guests:', error)
      throw error
    }
  },

  // GET /api/guests/check-ins/event/:eventId - Get check-ins by event
  async getCheckInsByEvent(eventId, params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.date) queryParams.append('date', params.date)

      const url = `${API_URL}/guests/check-ins/event/${eventId}${queryParams.toString() ? `?${queryParams}` : ''}`
      
      const res = await fetch(url, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return responseData
    } catch (error) {
      console.error('Error fetching check-ins:', error)
      throw error
    }
  },

  // ========== STATISTICS ==========

  // GET /api/guests/stats/event/:eventId - Get guest statistics for event
  async getGuestStatistics(eventId) {
    try {
      const res = await fetch(`${API_URL}/guests/stats/event/${eventId}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      const data = responseData.data || {}
      
      return {
        total: data.total || 0,
        confirmed: data.confirmed || 0,
        attended: data.attended || 0,
        pending: data.pending || 0,
        notResponded: data.notResponded || 0,
        confirmationRate: data.total ? Math.round((data.confirmed / data.total) * 100) : 0,
        attendanceRate: data.confirmed ? Math.round((data.attended / data.confirmed) * 100) : 0,
        checkInsByHour: data.checkInsByHour || [],
        dailyStats: data.dailyStats || []
      }
    } catch (error) {
      console.error('Error fetching guest statistics:', error)
      throw error
    }
  },

  // GET /api/guests/stats/summary - Get global guest summary
  async getGuestSummary() {
    try {
      const res = await fetch(`${API_URL}/guests/stats/summary`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      const data = responseData.data || {}
      
      return {
        totalGuests: data.totalGuests || 0,
        totalConfirmed: data.totalConfirmed || 0,
        totalAttended: data.totalAttended || 0,
        totalEvents: data.totalEvents || 0,
        averagePerEvent: data.averagePerEvent || 0
      }
    } catch (error) {
      console.error('Error fetching guest summary:', error)
      throw error
    }
  },

  // ========== EXPORT ==========

  // GET /api/guests/export/event/:eventId - Export guests to CSV/Excel
  async exportGuests(eventId, format = 'csv') {
    try {
      const res = await fetch(`${API_URL}/guests/export/event/${eventId}?format=${format}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      if (format === 'csv') {
        const blob = await res.blob()
        return {
          status: res.status,
          data: blob,
          filename: `guests-${eventId}-${new Date().toISOString().split('T')[0]}.csv`
        }
      }

      const responseData = await res.json()
      return responseData
    } catch (error) {
      console.error('Error exporting guests:', error)
      throw error
    }
  },

  // GET /api/guests/template/download - Download import template
  async downloadTemplate() {
    try {
      const res = await fetch(`${API_URL}/guests/template/download`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const blob = await res.blob()
      return {
        status: res.status,
        data: blob,
        filename: 'guest-import-template.xlsx'
      }
    } catch (error) {
      console.error('Error downloading template:', error)
      throw error
    }
  },

  // ========== UTILITY ==========

  // Generate invitation codes for event
  async generateInvitationCodes(eventId, count = 1) {
    try {
      const res = await fetch(`${API_URL}/guests/generate-codes`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          count
        })
      })

      const responseData = await res.json()
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error generating invitation codes:', error)
      throw error
    }
  },

  // Validate invitation code
  async validateInvitationCode(code) {
    try {
      const res = await fetch(`${API_URL}/guests/validate-code/${code}`, {
        credentials: 'include',
        cache: 'no-store'
      })

      const responseData = await res.json()
      return {
        isValid: res.status === 200,
        data: responseData.data,
        message: responseData.message
      }
    } catch (error) {
      console.error('Error validating invitation code:', error)
      throw error
    }
  }
}