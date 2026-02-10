'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filter, Plus, Heart, Calendar, Users, Gift } from 'lucide-react'
import Link from 'next/link'
import { eventsApi } from './api/events'
import EventStats from './components/EventStats'
import EventFilters from './components/EventFilters'
import EventsTable from './components/EventsTable'
import Pagination from './components/Pagination'
import DeleteModal from './components/DeleteModal'

export default function ManageWeddings() {
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
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Kelola Pernikahan</h1>
            <p className="text-gray-500">Atur dan pantau semua undangan pernikahan Anda</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl border border-pink-200 transition-all duration-300">
            <Filter className="w-4 h-4 mr-2" />
            Export Data
          </button>
          
          <Link
            href="/admin/events/create"
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Heart className="w-5 h-5 mr-2" />
            Buat Pernikahan Baru
          </Link>
        </div>
      </div>

      {/* Wedding Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Pernikahan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pernikahan</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{events.length}</p>
              <p className="text-xs text-green-500 mt-2">+2 bulan ini</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>

        {/* Pernikahan Mendatang */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pernikahan Mendatang</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {events.filter(e => new Date(e.date) > new Date()).length}
              </p>
              <p className="text-xs text-blue-500 mt-2">Perlu persiapan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Total Tamu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tamu</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {events.reduce((sum, event) => sum + event.guestCount, 0)}
              </p>
              <p className="text-xs text-purple-500 mt-2">Rata-rata 150 tamu</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Konfirmasi Hadir */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Konfirmasi Hadir</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">85%</p>
              <p className="text-xs text-green-500 mt-2">+5% dari bulan lalu</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <Gift className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan nama pengantin atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all duration-300"
              >
                <option value="all">Semua Pernikahan</option>
                <option value="active">Aktif</option>
                <option value="inactive">Selesai</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all duration-300"
              >
                <option value="date">Tanggal Terdekat</option>
                <option value="name">Nama Pengantin</option>
                <option value="guestCount">Jumlah Tamu</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center mr-3">
              <span className="text-pink-600">💝</span>
            </div>
            <div>
              <p className="text-sm font-medium text-pink-800">Pernikahan Aktif</p>
              <p className="text-2xl font-bold text-pink-900">
                {events.filter(e => e.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center mr-3">
              <span className="text-blue-600">📅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Minggu Ini</p>
              <p className="text-2xl font-bold text-blue-900">
                {events.filter(e => {
                  const now = new Date()
                  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                  const eventDate = new Date(e.date)
                  return eventDate >= now && eventDate <= nextWeek
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center mr-3">
              <span className="text-green-600">🎉</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">RSVP Tertinggi</p>
              <p className="text-2xl font-bold text-green-900">
                {events.length > 0 ? Math.max(...events.map(e => e.rsvpPercentage)) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

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

      {/* Wedding Tips Footer */}
      <div className="mt-8 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
              <span className="text-pink-500 mr-2">💡</span>
              Tips Pernikahan
            </h4>
            <p className="text-gray-600 text-sm">
              • Buat undangan minimal 3 bulan sebelumnya<br/>
              • Siapkan backup venue untuk jaga-jaga<br/>
              • Gunakan tema warna yang konsisten<br/>
              • Test semua fitur digital sebelum disebar
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/weddings/templates"
              className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">🎨</span>
              Lihat Template
            </Link>
            <Link
              href="/admin/weddings/analytics"
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="mr-2">📊</span>
              Lihat Analitik
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/weddings/guests"
          className="p-4 bg-white border border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mr-3 transition-colors">
              <span className="text-blue-500">👥</span>
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Kelola Tamu</h5>
              <p className="text-sm text-gray-500">Atur daftar tamu undangan</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/weddings/seating"
          className="p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-300 group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center mr-3 transition-colors">
              <span className="text-green-500">💺</span>
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Tata Ruang</h5>
              <p className="text-sm text-gray-500">Atur tempat duduk tamu</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/weddings/gifts"
          className="p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mr-3 transition-colors">
              <span className="text-amber-500">🎁</span>
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Registrasi Hadiah</h5>
              <p className="text-sm text-gray-500">Kelola daftar hadiah</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}