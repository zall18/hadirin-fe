'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, MapPin, 
  Users, 
  Tag,
  Heart,
  Cake,
  Music,
  Camera,
  Bell,
  Lock,
  Eye,
  TrendingUp,
  Gift,
  Flower2,
  Gem
} from 'lucide-react'
import ColorPicker from './ColorPicker'
import DateTimePicker from './DateTimePicker'

// Preset warna untuk tema pernikahan
const weddingColorPresets = [
  { name: 'Pink Romantic', value: '#F472B6' },
  { name: 'Purple Elegant', value: '#8B5CF6' },
  { name: 'Gold Luxury', value: '#F59E0B' },
  { name: 'Green Fresh', value: '#10B981' },
  { name: 'Blue Serene', value: '#3B82F6' },
  { name: 'Coral Warm', value: '#FB7185' },
  { name: 'Lavender Soft', value: '#A78BFA' },
  { name: 'Navy Classic', value: '#1E40AF' },
  { name: 'Blush Pink', value: '#FDA4AF' },
  { name: 'Mint Fresh', value: '#34D399' },
  { name: 'Warm Beige', value: '#D97706' },
  { name: 'Custom', value: 'custom' },
]

export default function EventForm({ 
  initialData = {}, 
  onSubmit,
  loading = false 
}) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    date: new Date().toISOString(),
    location: '',
    themeColor: '#F472B6', // Pink default untuk wedding
    description: '',
    isActive: true,
    maxGuests: 150,
    isPublic: true,
    brideName: '',
    groomName: '',
    venueType: 'hotel',
    enablePhotoBooth: true,
    enableGiftRegistry: true,
    enableGuestbook: true,
    enableMusicRequest: true,
    ...initialData
  })

  const [errors, setErrors] = useState({})

  // Generate slug otomatis dari nama
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.name])

  // Auto-generate wedding name jika ada nama pengantin
  useEffect(() => {
    if (formData.brideName && formData.groomName && !formData.name) {
      const weddingName = `Pernikahan ${formData.brideName} & ${formData.groomName}`
      setFormData(prev => ({ 
        ...prev, 
        name: weddingName,
        slug: weddingName
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')
          .substring(0, 50)
      }))
    }
  }, [formData.brideName, formData.groomName])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama pernikahan wajib diisi'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nama pernikahan minimal 3 karakter'
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug wajib diisi'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug hanya boleh mengandung huruf kecil, angka, dan strip'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi wajib diisi'
    }
    
    if (!formData.date || new Date(formData.date) < new Date()) {
      newErrors.date = 'Tanggal harus di masa depan'
    }
    
    if (!formData.brideName.trim()) {
      newErrors.brideName = 'Nama pengantin wanita wajib diisi'
    }
    
    if (!formData.groomName.trim()) {
      newErrors.groomName = 'Nama pengantin pria wajib diisi'
    }
    
    if (formData.maxGuests < 1) {
      newErrors.maxGuests = 'Jumlah tamu minimal 1'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const venueTypes = [
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
    { value: 'gedung', label: 'Gedung Serbaguna', icon: '🏛️' },
    { value: 'rumah', label: 'Rumah', icon: '🏠' },
    { value: 'villa', label: 'Villa', icon: '🏡' },
    { value: 'garden', label: 'Taman/Garden', icon: '🌳' },
    { value: 'beach', label: 'Pantai', icon: '🏖️' },
    { value: 'church', label: 'Gereja', icon: '⛪' },
    { value: 'mosque', label: 'Masjid', icon: '🕌' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pengantin Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center mr-4">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Informasi Pengantin</h3>
                <p className="text-sm text-gray-500">Data mempelai wanita dan pria</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengantin Wanita *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                    👰
                  </div>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 ${
                      errors.brideName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Nama lengkap pengantin wanita"
                  />
                </div>
                {errors.brideName && (
                  <p className="mt-2 text-sm text-red-600">{errors.brideName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengantin Pria *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    🤵
                  </div>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.groomName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Nama lengkap pengantin pria"
                  />
                </div>
                {errors.groomName && (
                  <p className="mt-2 text-sm text-red-600">{errors.groomName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                <Gem className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Detail Pernikahan</h3>
                <p className="text-sm text-gray-500">Informasi lengkap pernikahan</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Acara Pernikahan *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: Pernikahan Annisa & Rizki"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {formData.name.length}/100 karakter
                  </span>
                  <span className="text-xs text-blue-500">Akan otomatis generate dari nama pengantin</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug URL *
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-500">
                    /wedding/
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    className={`flex-1 px-4 py-3 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.slug ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="pernikahan-annisa-rizki"
                    readOnly
                  />
                </div>
                {errors.slug && (
                  <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  URL otomatis: https://anda.domain/wedding/{formData.slug}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Pernikahan
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ceritakan kisah cinta kalian atau pesan khusus untuk tamu undangan..."
                  maxLength={300}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {formData.description.length}/300 karakter
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Waktu & Lokasi</h3>
                <p className="text-sm text-gray-500">Jadwal dan tempat pernikahan</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateTimePicker
                value={formData.date}
                onChange={(value) => handleChange('date', value)}
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Venue
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => handleChange('venueType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {venueTypes.map((venue) => (
                      <option key={venue.value} value={venue.value}>
                        {venue.icon} {venue.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                        errors.location ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Contoh: Grand Ballroom Hotel Mulia, Jl. Gatot Subroto No.1, Jakarta"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Guest Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Pengaturan Tamu</h3>
                <p className="text-sm text-gray-500">Atur kapasitas dan sistem RSVP</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimal Tamu Undangan *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.maxGuests}
                    onChange={(e) => handleChange('maxGuests', parseInt(e.target.value) || 1)}
                    min="1"
                    max="5000"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.maxGuests ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.maxGuests && (
                  <p className="mt-2 text-sm text-red-600">{errors.maxGuests}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Kapasitas ideal: 150-250 tamu untuk pernikahan
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Undangan
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl hover:border-blue-300 cursor-pointer transition-all duration-300">
                    <input
                      type="radio"
                      name="accessType"
                      checked={formData.isPublic}
                      onChange={() => handleChange('isPublic', true)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-green-500 mr-2" />
                        <span className="font-medium text-gray-800">Publik</span>
                      </div>
                      <p className="text-sm text-gray-500">Semua tamu bisa lihat detail</p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-xl hover:border-blue-300 cursor-pointer transition-all duration-300">
                    <input
                      type="radio"
                      name="accessType"
                      checked={!formData.isPublic}
                      onChange={() => handleChange('isPublic', false)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 text-amber-500 mr-2" />
                        <span className="font-medium text-gray-800">Privat</span>
                      </div>
                      <p className="text-sm text-gray-500">Hanya tamu undangan khusus</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings & Preview */}
        <div className="space-y-8">
          {/* Wedding Theme Color */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center mr-4">
                <Flower2 className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Warna Tema Pernikahan</h3>
                <p className="text-sm text-gray-500">Pilih warna untuk tema undangan</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Preview Color */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div 
                  className="w-12 h-12 rounded-xl border border-gray-200"
                  style={{ backgroundColor: formData.themeColor }}
                />
                <div>
                  <div className="font-medium text-gray-800" style={{ color: formData.themeColor }}>
                    {formData.themeColor}
                  </div>
                  <div className="text-sm text-gray-500">Warna tema utama</div>
                </div>
              </div>

              {/* Wedding Color Presets */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Warna Pernikahan Populer:</h4>
                <div className="grid grid-cols-4 gap-2">
                  {weddingColorPresets.slice(0, 8).map((color) => (
                    color.value !== 'custom' && (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleChange('themeColor', color.value)}
                        className={`
                          relative p-2 rounded-lg transition-all duration-200 hover:scale-105
                          ${formData.themeColor === color.value 
                            ? 'ring-2 ring-offset-2 ring-blue-500' 
                            : ''
                          }
                        `}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {formData.themeColor === color.value && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.value }}></div>
                          </div>
                        )}
                      </button>
                    )
                  ))}
                </div>
              </div>

              {/* Custom Color */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Warna Custom
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={formData.themeColor}
                    onChange={(e) => handleChange('themeColor', e.target.value)}
                    className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                  />
                  <input
                    type="text"
                    value={formData.themeColor}
                    onChange={(e) => handleChange('themeColor', e.target.value)}
                    placeholder="#F472B6"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mr-4">
                <Gift className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Fitur Pernikahan</h3>
                <p className="text-sm text-gray-500">Aktifkan fitur untuk tamu</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border border-gray-300 rounded-xl hover:border-pink-300 cursor-pointer transition-all duration-300">
                <div className="flex items-center">
                  <Camera className="w-4 h-4 text-pink-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">Foto Booth</span>
                    <p className="text-sm text-gray-500">Tamu bisa foto langsung</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enablePhotoBooth}
                  onChange={(e) => handleChange('enablePhotoBooth', e.target.checked)}
                  className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-300 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-300">
                <div className="flex items-center">
                  <Gift className="w-4 h-4 text-purple-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">Registrasi Hadiah</span>
                    <p className="text-sm text-gray-500">Tamu bisa pilih hadiah</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableGiftRegistry}
                  onChange={(e) => handleChange('enableGiftRegistry', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-300 rounded-xl hover:border-blue-300 cursor-pointer transition-all duration-300">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">Buku Tamu Digital</span>
                    <p className="text-sm text-gray-500">Ucapan dan doa dari tamu</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableGuestbook}
                  onChange={(e) => handleChange('enableGuestbook', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-300 rounded-xl hover:border-green-300 cursor-pointer transition-all duration-300">
                <div className="flex items-center">
                  <Music className="w-4 h-4 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">Request Musik</span>
                    <p className="text-sm text-gray-500">Tamu bisa request lagu</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableMusicRequest}
                  onChange={(e) => handleChange('enableMusicRequest', e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-gray-300 rounded-xl hover:border-amber-300 cursor-pointer transition-all duration-300">
                <div className="flex items-center">
                  <Cake className="w-4 h-4 text-amber-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">Aktifkan Acara</span>
                    <p className="text-sm text-gray-500">Tampilkan di daftar pernikahan</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </label>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Preview Undangan</h3>
            <div 
              className="rounded-xl p-5 border-2 border-gray-200 relative overflow-hidden"
              style={{ borderColor: formData.themeColor }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10" 
                style={{ backgroundColor: formData.themeColor }}></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 opacity-10" 
                style={{ backgroundColor: formData.themeColor }}></div>
              
              <div className="relative">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2"
                    style={{ backgroundColor: formData.themeColor, color: 'white' }}>
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {formData.name || 'Pernikahan Anda'}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Pengantin Wanita</div>
                      <div className="font-semibold text-pink-600">{formData.brideName || 'Nama'}</div>
                    </div>
                    <div className="text-2xl text-gray-400">&</div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Pengantin Pria</div>
                      <div className="font-semibold text-blue-600">{formData.groomName || 'Nama'}</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {formData.date 
                          ? new Date(formData.date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Tanggal belum diatur'
                        }
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">
                        {formData.location || 'Lokasi belum diatur'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 mr-1" />
                  <span>{formData.maxGuests} tamu</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {formData.isActive ? 'Aktif' : 'Draft'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Tampilan ini akan muncul di halaman undangan digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}