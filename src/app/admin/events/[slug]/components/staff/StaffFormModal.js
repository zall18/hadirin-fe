'use client'

import { useState } from 'react'
import { X, Mail, User, Phone, Shield, UserCog, User as UserIcon, Key, Eye, EyeOff } from 'lucide-react'

export default function StaffFormModal({ isOpen, onClose, onSubmit, staff = null, eventId }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    password: '', // Password untuk staff baru
    role: staff?.role || 'STAFF',
    eventId: eventId, // Event ID akan diisi dari props
    avatarUrl: staff?.avatarUrl || ''
  })


  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if(staff) {
      onSubmit(formData, staff.id)
    } else {
      onSubmit(formData)

    }
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulasi upload - dalam implementasi real akan upload ke server
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, avatarUrl: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const roles = [
    { 
      value: 'ADMIN', 
      label: 'Admin', 
      icon: UserCog,
      description: 'Full access - bisa manage tamu & staff',
      color: 'blue',
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50'
    },
    { 
      value: 'STAFF', 
      label: 'Staff', 
      icon: UserIcon,
      description: 'Check-in & foto tamu',
      color: 'gray',
      bgColor: 'bg-gray-500',
      lightBg: 'bg-gray-50'
    }
  ]

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {staff ? 'Edit Staff' : 'Tambah Staff Baru'}
            </h3>
            <p className="text-sm text-gray-500">
              {staff ? 'Perbarui data staff' : 'Buat akun staff untuk event ini'}
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
          {/* Avatar Upload */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {formData.avatarUrl ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-purple-200">
                  <img 
                    src={formData.avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                  formData.role === 'ADMIN' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  {getInitials(formData.name)}
                </div>
              )}
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <User className="w-4 h-4 text-white" />
              </label>
            </div>
            <div>
              <p className="font-medium text-gray-800">Foto Profil</p>
              <p className="text-xs text-gray-500 mt-1">
                Upload foto untuk staff (opsional)
              </p>
            </div>
          </div>

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
              disabled={!!staff} // Email tidak bisa diubah untuk edit
            />
            {staff && (
              <p className="text-xs text-gray-500 mt-2">
                Email tidak dapat diubah
              </p>
            )}
          </div>

          {/* Phone */}
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

          {/* Password - Hanya untuk create baru */}
          {!staff && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Key className="w-4 h-4 inline mr-2 text-purple-500" />
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Minimal 6 karakter"
                  required={!staff}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Password minimal 6 karakter
              </p>
            </div>
          )}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Shield className="w-4 h-4 inline mr-2 text-purple-500" />
              Pilih Role <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = formData.role === role.value
                return (
                  <label
                    key={role.value}
                    className={`
                      relative flex items-start p-4 border-2 rounded-xl cursor-pointer
                      transition-all duration-200 hover:scale-[1.02]
                      ${isSelected
                        ? `border-${role.color}-500 ${role.lightBg}`
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={isSelected}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mr-4
                      ${isSelected ? role.bgColor : 'bg-gray-100 text-gray-600'}
                      ${isSelected ? 'text-white' : ''}
                      transition-all duration-200
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{role.label}</p>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Event ID (hidden) - akan diisi dari parent component */}
          <input type="hidden" name="eventId" value={formData.eventId} />

          {/* Info Tambahan */}
          {staff && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Edit Staff</p>
                  <p className="text-sm text-blue-700 mt-1">
                    • Email tidak dapat diubah<br/>
                    • Password dapat di-reset melalui halaman reset password<br/>
                    • Role dapat diubah sesuai kebutuhan
                  </p>
                </div>
              </div>
            </div>
          )}

          {!staff && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start">
                <Key className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Informasi Akun</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Staff akan menerima email dengan instruksi login.<br/>
                    Password dapat diubah nanti oleh staff.
                  </p>
                </div>
              </div>
            </div>
          )}

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
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {staff ? 'Simpan Perubahan' : 'Tambah Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}