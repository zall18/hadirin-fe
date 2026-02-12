'use client'

import { useState, useEffect } from 'react'
import { Users, UserPlus } from 'lucide-react'
import StaffTable from './StaffTable'
import StaffFormModal from './StaffFormModal'

export default function StaffManagement({ eventId, wedding }) {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)

  useEffect(() => {
    fetchStaff()
  }, [eventId])

  const fetchStaff = async () => {
    setLoading(true)
    try {
      // Simulasi data staff
      const dummyStaff = [
        {
          id: 1,
          name: 'Admin Wedding',
          email: 'admin@hadirin.com',
          phone: '08123456789',
          role: 'ADMIN',
          lastLoginAt: '2026-02-11T08:30:00Z',
          isActive: true,
          avatarUrl: null
        },
        {
          id: 2,
          name: 'Staff Check-in',
          email: 'staff1@hadirin.com',
          phone: '08129876543',
          role: 'STAFF',
          lastLoginAt: '2026-02-10T14:20:00Z',
          isActive: true,
          avatarUrl: null
        },
        {
          id: 3,
          name: 'Staff Foto',
          email: 'staff2@hadirin.com',
          phone: '08131234567',
          role: 'STAFF',
          lastLoginAt: null,
          isActive: false,
          avatarUrl: null
        }
      ]

      setStaff(dummyStaff)
    } catch (error) {
      console.error('Error fetching staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStaff = async (data) => {
    console.log('Add staff:', data)
    setShowFormModal(false)
    fetchStaff()
  }

  const handleEditStaff = (staff) => {
    setEditingStaff(staff)
    setShowFormModal(true)
  }

  const handleUpdateStaff = async (data) => {
    console.log('Update staff:', data)
    setShowFormModal(false)
    setEditingStaff(null)
    fetchStaff()
  }

  const handleDeleteStaff = async (staff) => {
    if (confirm(`Hapus staff ${staff.name}?`)) {
      console.log('Delete staff:', staff)
      fetchStaff()
    }
  }

  const handleUpdateRole = async (staffId, role) => {
    console.log('Update role:', staffId, role)
    fetchStaff()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <Users className="w-6 h-6 mr-3" />
            <h2 className="text-xl font-semibold">Manajemen Staff</h2>
          </div>
          <button
            onClick={() => setShowFormModal(true)}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Undang Staff
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <StaffTable
          staff={staff}
          loading={loading}
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
          onUpdateRole={handleUpdateRole}
          onAdd={() => setShowFormModal(true)}
        />
      </div>

      {/* Modal */}
      <StaffFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingStaff(null)
        }}
        onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}
        staff={editingStaff}
      />
    </div>
  )
}