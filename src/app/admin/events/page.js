'use client'

import { useState } from 'react'
import {
  Search, Filter, Calendar, MapPin,
  MoreVertical, Edit2, Trash2, Eye,
  Users, Image, CheckSquare, Clock,
  Plus, ChevronLeft, ChevronRight,
  AlertCircle, TrendingUp, TrendingDown
} from 'lucide-react'
import Link from 'next/link'

// Data dummy events
const dummyEvents = [
  {
    id: 1,
    slug: 'tech-conference-2024',
    name: 'Tech Conference 2024',
    date: new Date('2024-03-15T09:00:00'),
    location: 'Grand Ballroom, Jakarta',
    themeColor: '#3B82F6',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    guestCount: 245,
    photoCount: 156,
    checkInCount: 187,
    rsvpPercentage: 76
  },
  {
    id: 2,
    slug: 'product-launch-q2',
    name: 'Product Launch Q2',
    date: new Date('2024-04-22T14:00:00'),
    location: 'Innovation Center, Bandung',
    themeColor: '#10B981',
    isActive: true,
    createdAt: new Date('2024-02-05'),
    guestCount: 120,
    photoCount: 89,
    checkInCount: 98,
    rsvpPercentage: 82
  },
  {
    id: 3,
    slug: 'annual-gala-dinner',
    name: 'Annual Gala Dinner',
    date: new Date('2024-05-30T19:00:00'),
    location: 'Luxury Hotel, Bali',
    themeColor: '#8B5CF6',
    isActive: false,
    createdAt: new Date('2024-01-25'),
    guestCount: 300,
    photoCount: 210,
    checkInCount: 0,
    rsvpPercentage: 65
  },
  {
    id: 4,
    slug: 'workshop-digital-marketing',
    name: 'Digital Marketing Workshop',
    date: new Date('2024-03-08T10:00:00'),
    location: 'Co-working Space, Surabaya',
    themeColor: '#F59E0B',
    isActive: true,
    createdAt: new Date('2024-02-15'),
    guestCount: 80,
    photoCount: 45,
    checkInCount: 72,
    rsvpPercentage: 90
  },
  {
    id: 5,
    slug: 'startup-networking-night',
    name: 'Startup Networking Night',
    date: new Date('2024-04-05T18:00:00'),
    location: 'Rooftop Lounge, Jakarta',
    themeColor: '#EF4444',
    isActive: true,
    createdAt: new Date('2024-02-20'),
    guestCount: 150,
    photoCount: 95,
    checkInCount: 132,
    rsvpPercentage: 88
  },
  {
    id: 6,
    slug: 'leadership-summit',
    name: 'Leadership Summit 2024',
    date: new Date('2024-06-12T08:30:00'),
    location: 'Convention Hall, Jakarta',
    themeColor: '#06B6D4',
    isActive: true,
    createdAt: new Date('2024-02-01'),
    guestCount: 500,
    photoCount: 320,
    checkInCount: 0,
    rsvpPercentage: 45
  },
  {
    id: 7,
    slug: 'art-exhibition-opening',
    name: 'Art Exhibition Opening',
    date: new Date('2024-03-25T17:00:00'),
    location: 'Modern Art Gallery, Yogyakarta',
    themeColor: '#EC4899',
    isActive: true,
    createdAt: new Date('2024-02-10'),
    guestCount: 200,
    photoCount: 180,
    checkInCount: 165,
    rsvpPercentage: 83
  },
  {
    id: 8,
    slug: 'charity-fundraiser',
    name: 'Charity Fundraiser Gala',
    date: new Date('2024-05-18T20:00:00'),
    location: 'Five Star Hotel, Jakarta',
    themeColor: '#6366F1',
    isActive: false,
    createdAt: new Date('2024-01-30'),
    guestCount: 180,
    photoCount: 120,
    checkInCount: 0,
    rsvpPercentage: 70
  }
]

export default function ManageEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState('all') // all, active, inactive
  const [sortBy, setSortBy] = useState('date') // date, name, guestCount
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const eventsPerPage = 5

  // Filter dan sort events
  const filteredEvents = dummyEvents
    .filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (filterActive === 'all') return matchesSearch
      if (filterActive === 'active') return matchesSearch && event.isActive
      if (filterActive === 'inactive') return matchesSearch && !event.isActive
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'guestCount') return b.guestCount - a.guestCount
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage)

  // Format tanggal
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Format waktu relatif
  const getTimeRelative = (date) => {
    const now = new Date()
    const eventDate = new Date(date)
    const diffTime = eventDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) {
      return `Dalam ${diffDays} hari`
    } else if (diffDays === 0) {
      return 'Hari ini'
    } else {
      return `${Math.abs(diffDays)} hari lalu`
    }
  }

  // Handle delete event
  const handleDelete = (event) => {
    setSelectedEvent(event)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    console.log('Deleting event:', selectedEvent?.name)
    // Implement delete logic here
    setShowDeleteModal(false)
    setSelectedEvent(null)
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Event</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{dummyEvents.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+2 event baru bulan ini</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Event Aktif</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {dummyEvents.filter(e => e.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-500">{dummyEvents.filter(e => e.isActive).length} event sedang berjalan</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tamu</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {dummyEvents.reduce((sum, event) => sum + event.guestCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs">
            <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-purple-500">Rata-rata 85% hadir</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Event Mendatang</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {dummyEvents.filter(e => new Date(e.date) > new Date()).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />
            <span className="text-amber-500">3 event perlu persiapan</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari event berdasarkan nama atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="date">Tanggal</option>
                <option value="name">Nama</option>
                <option value="guestCount">Jumlah Tamu</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-700">
          <div className="col-span-5">Event</div>
          <div className="col-span-2">Tanggal & Waktu</div>
          <div className="col-span-2">Statistik</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {currentEvents.map((event) => (
            <div key={event.id} className="grid grid-cols-12 gap-4 p-5 hover:bg-gray-50 transition-colors duration-200">
              {/* Event Info */}
              <div className="col-span-5">
                <div className="flex items-start space-x-3">
                  <div 
                    className="w-3 h-12 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: event.themeColor }}
                  ></div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{event.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {event.slug}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="col-span-2">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium">{formatDate(event.date)}</p>
                    <p className="text-gray-500 text-xs mt-1">{getTimeRelative(event.date)}</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="col-span-2">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-purple-500 mr-2" />
                    <span>{event.guestCount} tamu</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Image className="w-4 h-4 text-blue-500 mr-2" />
                    <span>{event.photoCount} foto</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckSquare className="w-4 h-4 text-green-500 mr-2" />
                    <span>{event.checkInCount} check-in</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <div className="flex flex-col space-y-2">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit
                    ${event.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {event.isActive ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                  
                  {/* RSVP Percentage */}
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${event.rsvpPercentage}%`,
                          backgroundColor: event.themeColor 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">{event.rsvpPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1">
                <div className="flex items-center justify-end space-x-1">
                  <Link
                    href={`/dashboard/events/${event.slug}`}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  
                  <Link
                    href={`/dashboard/events/${event.slug}/edit`}
                    className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(event)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada event ditemukan</h3>
            <p className="text-gray-500 mb-6">Coba ubah filter pencarian atau tambahkan event baru</p>
            <Link
              href="/dashboard/events/create"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Buat Event Pertama
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Menampilkan {startIndex + 1}-{Math.min(startIndex + eventsPerPage, filteredEvents.length)} dari {filteredEvents.length} event
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Hapus Event</h3>
                <p className="text-gray-500 text-sm">Konfirmasi penghapusan event</p>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-red-50 rounded-xl">
              <p className="text-red-700">
                Anda akan menghapus event <span className="font-bold">{selectedEvent?.name}</span>. 
                Tindakan ini tidak dapat dibatalkan dan semua data terkait akan dihapus permanen.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedEvent(null)
                }}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Hapus Event
              </button>
            </div>
          </div>
        </div>
      )}

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

// Tambahkan styles untuk animasi
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
`

// Tambahkan styles ke dalam komponen
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}