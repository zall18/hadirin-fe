'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filter, Plus } from 'lucide-react'
import Link from 'next/link'
import { eventsApi } from './api/events'
import EventStats from './components/EventStats'
import EventFilters from './components/EventFilters'
import EventsTable from './components/EventsTable'
import Pagination from './components/Pagination'
import DeleteModal from './components/DeleteModal'

export default function ManageEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    perPage: 5,
    totalPages: 1
  })

  // Fetch events dengan debounce
  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        search: searchTerm,
        status: filterActive,
        sortBy,
        page: currentPage,
        perPage: 5
      }
      
      const response = await eventsApi.getEvents(params)
      setEvents(response.data)
      setPagination({
        total: response.total,
        page: response.page,
        perPage: response.perPage,
        totalPages: response.totalPages
      })
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, filterActive, sortBy, currentPage])

  // Initial fetch dan fetch saat filter berubah
  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Handle delete event
  const handleDelete = (event) => {
    setSelectedEvent(event)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedEvent) return
    
    try {
      await eventsApi.deleteEvent(selectedEvent.id)
      setShowDeleteModal(false)
      setSelectedEvent(null)
      fetchEvents() // Refresh data
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Kelola Event</h1>
          <p className="text-gray-500">Atur dan pantau semua event Anda di satu tempat</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300">
            <Filter className="w-4 h-4 mr-2" />
            Ekspor
          </button>
          
          <Link
            href="/dashboard/events/create"
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Event Baru
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <EventStats />

      {/* Filters */}
      <EventFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterActive={filterActive}
        onFilterChange={setFilterActive}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Events Table */}
      <EventsTable
        events={events}
        loading={loading}
        onDelete={handleDelete}
        totalEvents={pagination.total}
        page={currentPage}
        perPage={pagination.perPage}
      />

      {/* Pagination */}
      {events.length > 0 && pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        event={selectedEvent}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedEvent(null)
        }}
        onConfirm={confirmDelete}
      />

      {/* Quick Actions Footer */}
      <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Tips & Saran</h4>
            <p className="text-gray-600 text-sm">
              Buat event setidaknya 2 minggu sebelumnya untuk persiapan optimal. 
              Gunakan tema warna yang konsisten untuk branding.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard/events/templates"
              className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Lihat Template
            </Link>
            <Link
              href="/dashboard/events/analytics"
              className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Lihat Analitik
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}