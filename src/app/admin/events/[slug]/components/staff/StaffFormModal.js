'use client'

import { useState } from 'react'
import { X, Mail, User, Phone, Shield, UserCog, User as UserIcon } from 'lucide-react'

export default function StaffFormModal({ isOpen, onClose, onSubmit, staff = null }) {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    role: staff?.role || 'STAFF'
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const roles = [
    { 
      value: 'ADMIN', 
      label: 'Admin', 
      icon: UserCog,
      description: 'Full access - bisa manage tamu & staff',
      color: 'blue'
    },
    { 
      value: 'STAFF', 
      label: 'Staff', 
      icon: UserIcon,
      description: 'Check-in & foto tamu',
      color: 'gray'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-scroll">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {staff ? 'Edit Staff' : 'Undang Staff Baru'}
            </h3>
            <p className="text-sm text-gray-500">
              {staff ? 'Perbarui data staff' : 'Kirim undangan ke email staff'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2 text-purple-500" />
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Contoh: Siti Rahma"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2 text-purple-500" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="email@contoh.com"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Staff akan menerima email undangan untuk membuat akun
            </p>
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2 text-purple-500" />
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="08123456789"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Shield className="w-4 h-4 inline mr-2 text-purple-500" />
              Pilih Role
            </label>
            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <label
                    key={role.value}
                    className={`
                      relative flex items-start p-4 border-2 rounded-xl cursor-pointer
                      transition-all duration-200
                      ${formData.role === role.value
                        ? `border-${role.color}-500 bg-${role.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mr-4
                      ${formData.role === role.value
                        ? `bg-${role.color}-500 text-white`
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{role.label}</p>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </label>
                )
              })}
            </div>
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
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {staff ? 'Simpan Perubahan' : 'Undang Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}