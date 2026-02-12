'use client'

import { useState, useEffect } from 'react'
import { Plus, Download, Upload, Users } from 'lucide-react'
import GuestStatsCard from './GuestStatsCard'
import GuestFilters from './GuestFilters'
import GuestTable from './GuestTable'
import GuestFormModal from './GuestFormModal'
import GuestImportModal from './GuestImportModal'
import GuestBulkActions from './GuestBulkActions'
import { guestApi } from '../../../api/guest'

export default function GuestManagement({ eventId, eventSlug, wedding }) {
  const [guests, setGuests] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(1)
  const [selectedGuests, setSelectedGuests] = useState([])
  const [showFormModal, setShowFormModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingGuest, setEditingGuest] = useState(null)

  // Fetch guests
  useEffect(() => {
    fetchGuests()
  }, [eventId, page, searchTerm, statusFilter, categoryFilter, sortBy])

  const fetchGuests = async () => {
    setLoading(true)
    try {
        // console.log(eventSlug);
      const response = await guestApi.getEventGuest(eventSlug);
      const guests = response.guests;
      setGuests(guests);
      setStats({
        total: guests.length,
        confirmed: guests.filter(guest => guest.status == "CONFIRMED").length,
        attended: guests.filter(guest => guest.status == "ATTENDED").length,
        invited: guests.filter(guest => guest.status == "INVITED").length,
        cancelled: guests.filter(guest => guest.status == "CANCELLED").length,
        noShow: guests.filter(guest => guest.status == "NO_SHOW").length
      })
    } catch (error) {
      console.error('Error fetching guests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGuest = async (data) => {
    const response = await guestApi.createGuest(data);
    if(response.status == 201) {
        setShowFormModal(false)
        fetchGuests()
    }
  }

  const handleEditGuest = (guest) => {
    console.log(guest);
    setEditingGuest(guest)
    setShowFormModal(true)
  }

  const handleUpdateGuest = async (id, data) => {
    // console.log(data);
    const response = await guestApi.updateGuest(id, data);
    if(response.status == 200) {
        // console.log(response.data);
        setShowFormModal(false)
        setEditingGuest(null)
        fetchGuests()
    }
  }

  const handleDeleteGuest = async (guest) => {
    if (confirm(`Hapus tamu ${guest.name}?`)) {
      const response = await guestApi.deleteGuest(guest.id);
      fetchGuests()
    }
  }

  const handleCheckin = async (guest) => {
    console.log('Check-in guest:', guest)
    fetchGuests()
  }

  const handleSendWA = async (guest) => {
    console.log('Send WA to:', guest)
  }

  const handleImport = async (data) => {
    console.log('Import guests:', data)
    setShowImportModal(false)
    fetchGuests()
  }

  const handleExport = async () => {
    console.log('Export guests')
  }

  const handleBulkDelete = async () => {
    console.log('Bulk delete:', selectedGuests)
    setSelectedGuests([])
  }

  const handleBulkSendWA = async () => {
    console.log('Bulk send WA:', selectedGuests)
  }

  const handleBulkCheckin = async () => {
    console.log('Bulk check-in:', selectedGuests)
  }

  const handleSelectAll = () => {
    setSelectedGuests(guests.map(g => g.id))
  }

  const handleClearAll = () => {
    setSelectedGuests([])
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <Users className="w-6 h-6 mr-3" />
            <h2 className="text-xl font-semibold">Manajemen Tamu</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowFormModal(true)}
              className="px-4 py-2 bg-white text-pink-600 rounded-lg text-sm font-medium hover:bg-pink-50 transition-all flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tamu
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <GuestStatsCard stats={stats} />
        
        <GuestFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <GuestTable
          guests={guests}
          loading={loading}
          onEdit={handleEditGuest}
          onDelete={handleDeleteGuest}
          onCheckin={handleCheckin}
          onSendWA={handleSendWA}
          onAdd={() => setShowFormModal(true)}
          onImport={() => setShowImportModal(true)}
          onExport={handleExport}
        />

        <GuestBulkActions
          selectedCount={selectedGuests.length}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          onBulkDelete={handleBulkDelete}
          onBulkSendWA={handleBulkSendWA}
          onBulkCheckin={handleBulkCheckin}
        />
      </div>

      {/* Modals */}
      <GuestFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingGuest(null)
        }}
        eventId={eventId}
        onSubmit={editingGuest ? handleUpdateGuest : handleAddGuest}
        guest={editingGuest}
        key={editingGuest?.id || 'new'}
      />

      <GuestImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />
    </div>
  )
}