// services/userService.js atau api/users.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const usersApi = {
  // ========== USER CRUD ==========

  // GET /api/users - Get all users with filters
  async getAllUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filter parameters
      if (params.role) queryParams.append('role', params.role);
      if (params.eventId) queryParams.append('eventId', params.eventId);
      if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API_URL}/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        pagination: responseData.pagination,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // GET /api/users/me - Get current user profile
  async getCurrentUser() {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  // GET /api/users/:id - Get user by ID
  async getUserById(id) {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // POST /api/users - Create new user
  async createUser(userData) {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // PUT /api/users/:id - Update user
  async updateUser(id, userData) {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const responseData = await res.json();
      console.log(responseData);
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // PUT /api/users/:id/password - Update user password
  async updatePassword(id, passwordData) {
    try {
      const res = await fetch(`${API_URL}/users/${id}/password`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  // DELETE /api/users/:id - Delete user
  async deleteUser(id) {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store'
      });

      return {
        status: res.status,
        message: res.status === 200 ? 'User deleted successfully' : 'Failed to delete user'
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // ========== ROLE-BASED FILTERS ==========

  // GET /api/users/role/super-admin - Get all SUPER_ADMIN users
  async getSuperAdmins(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);

      const url = `${API_URL}/users/role/super-admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        pagination: responseData.pagination,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting super admins:', error);
      throw error;
    }
  },

  // GET /api/users/role/admin - Get all ADMIN users
  async getAdmins(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.eventId) queryParams.append('eventId', params.eventId);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);

      const url = `${API_URL}/users/role/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        pagination: responseData.pagination,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting admins:', error);
      throw error;
    }
  },

  // GET /api/users/role/staff - Get all STAFF users
  async getStaff(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.eventId) queryParams.append('eventId', params.eventId);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);

      const url = `${API_URL}/users/role/staff${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      console.log(responseData);
      return {
        status: res.status,
        data: responseData.data,
        pagination: responseData.pagination,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting staff:', error);
      throw error;
    }
  },

  // ========== EVENT ASSIGNMENT ==========

  // PUT /api/users/:id/assign - Assign user to event
  async assignToEvent(id, eventId) {
    try {
      const res = await fetch(`${API_URL}/users/${id}/assign`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId })
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error assigning user to event:', error);
      throw error;
    }
  },

  // GET /api/users/event/:eventId - Get users by event
  async getUsersByEvent(eventId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.role) queryParams.append('role', params.role);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const url = `${API_URL}/users/event/${eventId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        pagination: responseData.pagination,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting users by event:', error);
      throw error;
    }
  },

  // ========== STATUS MANAGEMENT ==========

  // PUT /api/users/:id/deactivate - Deactivate user
  async deactivateUser(id) {
    try {
      const res = await fetch(`${API_URL}/users/${id}/deactivate`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  },

  // PUT /api/users/:id/activate - Activate user
  async activateUser(id) {
    try {
      const res = await fetch(`${API_URL}/users/${id}/activate`, {
        method: 'PUT',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  },

  // ========== STATISTICS ==========

  // GET /api/users/statistics - Get user statistics (SUPER_ADMIN only)
  async getUserStatistics() {
    try {
      const res = await fetch(`${API_URL}/users/statistics`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error getting user statistics:', error);
      throw error;
    }
  },

  // ========== BULK OPERATIONS ==========

  // POST /api/users/bulk - Bulk create users
  async bulkCreateUsers(usersData) {
    try {
      const res = await fetch(`${API_URL}/users/bulk`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: usersData })
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg,
        results: responseData.results
      };
    } catch (error) {
      console.error('Error bulk creating users:', error);
      throw error;
    }
  },

  // DELETE /api/users/bulk - Bulk delete users
  async bulkDeleteUsers(ids) {
    try {
      const res = await fetch(`${API_URL}/users/bulk`, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });

      const responseData = await res.json();
      
      return {
        status: res.status,
        data: responseData.data,
        message: responseData.msg
      };
    } catch (error) {
      console.error('Error bulk deleting users:', error);
      throw error;
    }
  }
};