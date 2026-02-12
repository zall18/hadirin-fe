'use client'

import { useState } from 'react'
import { X, User, Phone, Mail, Users, Tag, Users2 } from 'lucide-react'

export default function GuestFormModal({ isOpen, onClose, onSubmit, guest = null, eventId }) {
  const [formData, setFormData] = useState({
    name: guest?.name || '',
    phone: guest?.phone || '',
    email: guest?.email || '',
    category: guest?.category || 'REGULAR',
    groupName: guest?.groupName || '',
    invitedCount: guest?.invitedCount || 1,
    plusOneAllowed: guest?.plusOneAllowed || 0,
    status: guest?.status || 'INVITED',
    eventId : eventId
  }); 
  
  const handleSubmit = (e) => {
      e.preventDefault()
      if(guest) {
          onSubmit(guest.id ,formData)
        console.log(formData);
      } else {

          onSubmit(formData)
      }
      setFormData({
          category: '',
          name : '',
          phone: '',
          email: '',
          groupName: '',
          invitedCount: 1,
         plusOneAllowed: 0,
         status: ''
    });
  }
  
  const categories = [
      { value: 'FAMILY', label: 'Keluarga', icon: '👨‍👩‍👧' },
      { value: 'FRIEND', label: 'Teman', icon: '👥' },
    { value: 'COWORKER', label: 'Rekan Kerja', icon: '💼' },
    { value: 'REGULAR', label: 'Umum', icon: '👤' }
]

if (!isOpen) return null


return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {guest ? 'Edit Tamu' : 'Tambah Tamu Baru'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nama Tamu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2 text-pink-500" />
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          {/* Kontak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2 text-pink-500" />
                No. WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="08123456789"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2 text-pink-500" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          {/* Kategori & Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-2 text-pink-500" />
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users2 className="w-4 h-4 inline mr-2 text-pink-500" />
                Nama Grup
              </label>
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Contoh: Keluarga Besar"
              />
            </div>
          </div>

          {/* Jumlah Tamu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2 text-pink-500" />
                Jumlah Undangan
              </label>
              <input
                type="number"
                min="1"
                value={formData.invitedCount}
                onChange={(e) => setFormData({ ...formData, invitedCount: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2 text-pink-500" />
                Plus One (Maks)
              </label>
              <input
                type="number"
                min="0"
                value={formData.plusOneAllowed}
                onChange={(e) => setFormData({ ...formData, plusOneAllowed: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Undangan
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="INVITED">Diundang</option>
              <option value="CONFIRMED">Konfirmasi Hadir</option>
              <option value="CANCELLED">Batal</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {guest ? 'Simpan Perubahan' : 'Tambah Tamu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}