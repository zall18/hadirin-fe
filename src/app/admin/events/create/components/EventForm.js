'use client'

import { useState, useEffect } from 'react'
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Globe, 
  Lock,
  Camera,
  Send,
  Users,
  Palette,
  Image as ImageIcon,
  Upload,
  Map,
  CheckCircle,
  Info,
  Sparkles,
  Building,
  Home,
  TreePine,
  Umbrella,
  Church,
  Mosque
} from 'lucide-react'
import ColorPicker from './ColorPicker'
import DateTimePicker from './DateTimePicker'

// Constants sesuai dengan Prisma schema
export const VENUE_TYPES = [
  { value: 'BALLROOM', label: 'Ballroom', icon: '🏨', description: 'Hotel mewah dengan ballroom' },
  { value: 'HOTEL', label: 'Hotel', icon: '🏨', description: 'Hotel bintang 4-5' },
  { value: 'GARDEN', label: 'Taman', icon: '🌳', description: 'Outdoor garden' },
  { value: 'BEACH', label: 'Pantai', icon: '🏖️', description: 'Resepsi di tepi pantai' },
  { value: 'CHURCH', label: 'Gereja', icon: '⛪', description: 'Gedung gereja' },
  { value: 'MOSQUE', label: 'Masjid', icon: '🕌', description: 'Gedung masjid' },
  { value: 'HOUSE', label: 'Rumah', icon: '🏠', description: 'Kediaman pribadi' },
  { value: 'VILLA', label: 'Villa', icon: '🏡', description: 'Villa pribadi' },
  { value: 'GEDUNG', label: 'Gedung', icon: '🏛️', description: 'Gedung serbaguna' },
]

export const INVITATION_TYPES = [
  { 
    value: 'PUBLIC', 
    label: 'Undangan Publik', 
    icon: Globe, 
    description: 'Semua tamu bisa mengakses undangan' 
  },
  { 
    value: 'PRIVATE', 
    label: 'Undangan Privat', 
    icon: Lock, 
    description: 'Hanya tamu undangan khusus' 
  },
]

export default function EventForm({ 
  activeStep = 0,
  formData = {}, 
  setFormData, 
  onSubmit, 
  loading = false,
  onNext,
  onPrevious
}) {
  
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (field, e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      handleChange(field, imageUrl)
    }
  }

  // Default values sesuai dengan Prisma schema
  const defaultFormData = {
    groomName: '',
    brideName: '',
    weddingTitle: '',
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    venueType: 'BALLROOM',
    address: '',
    googleMapsUrl: '',
    primaryColor: '#7C3AED', // Purple Royal
    logoUrl: '',
    coverImageUrl: '',
    invitationType: 'PRIVATE',
    isActive: false,
    isPublished: false,
    allowPhotoOnCheckIn: true,
    autoSendPhotoToWA: true,
    enableRSVP: true,
    showLiveCount: true,
    ...formData
  }

  const currentFormData = { ...defaultFormData, ...formData }

  // Auto-generate wedding title
  useEffect(() => {
    if (currentFormData.groomName && currentFormData.brideName && !currentFormData.weddingTitle) {
      const title = `The Wedding of ${currentFormData.groomName} & ${currentFormData.brideName}`
      handleChange('weddingTitle', title)
    }
  }, [currentFormData.groomName, currentFormData.brideName])

  // Validate current step
  const validateStep = () => {
    switch(activeStep) {
      case 0: // Step 1: Bride & Groom
        return currentFormData.groomName && currentFormData.brideName
      case 1: // Step 2: Date & Venue
        return currentFormData.date && currentFormData.venueName
      case 2: // Step 3: Theme & Features
        return true // Optional fields
      case 3: // Step 4: Review
        return true
      default:
        return false
    }
  }

  const isValid = validateStep()

  // STEP 1: Bride & Groom Information
  if (activeStep === 0) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(currentFormData) }} className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 p-8 mb-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/20 rounded-full"></div>
          
          <div className="relative text-center text-white">
            <Heart className="w-16 h-16 mx-auto mb-4" fill="white" />
            <h2 className="text-3xl font-bold mb-2">Mulai Cerita Cinta Anda</h2>
            <p className="text-white/90 text-lg">Isi data pengantin untuk memulai undangan digital</p>
          </div>
        </div>

        {/* Wedding Title Preview */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200 mb-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Preview Judul Undangan:</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {currentFormData.weddingTitle || `The Wedding of ${currentFormData.groomName || '...'} & ${currentFormData.brideName || '...'}`}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Judul akan otomatis dibuat dari nama pengantin
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Section */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-pink-300 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b-2 border-blue-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">👨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg">Mempelai Pria</h3>
                  <p className="text-sm text-blue-600">Data lengkap pengantin pria</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap Pria <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentFormData.groomName || ''}
                  onChange={(e) => handleChange('groomName', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Contoh: Andi Pratama"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Nama lengkap tanpa gelar (contoh: Andi Pratama)</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center text-blue-700">
                  <Info className="w-4 h-4 mr-2" />
                  <span className="text-sm">Nama akan muncul di undangan dan sertifikat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Section */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-pink-300 transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5 border-b-2 border-pink-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">👩</span>
                </div>
                <div>
                  <h3 className="font-semibold text-pink-800 text-lg">Mempelai Wanita</h3>
                  <p className="text-sm text-pink-600">Data lengkap pengantin wanita</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap Wanita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentFormData.brideName || ''}
                  onChange={(e) => handleChange('brideName', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                  placeholder="Contoh: Sari Wijaya"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Nama lengkap tanpa gelar (contoh: Sari Wijaya)</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-xl">
                <div className="flex items-center text-pink-700">
                  <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                  <span className="text-sm">Nama akan dipadukan dengan mempelai pria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Title - Optional */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Judul Undangan (Opsional)
              </label>
              <input
                type="text"
                value={currentFormData.weddingTitle || ''}
                onChange={(e) => handleChange('weddingTitle', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                placeholder={`The Wedding of ${currentFormData.groomName || 'Andi'} & ${currentFormData.brideName || 'Sari'}`}
              />
              <p className="text-xs text-gray-500 mt-2">
                Kosongkan untuk menggunakan judul otomatis. Maksimal 100 karakter.
              </p>
            </div>
          </div>
        </div>
      </form>
    )
  }

  // STEP 2: Date, Time & Venue
  if (activeStep === 1) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(currentFormData) }} className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 mb-8">
          <div className="relative text-center text-white">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Tempat & Waktu</h2>
            <p className="text-white/90 text-lg">Atur lokasi dan jadwal pernikahan Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Date & Time Section */}
          <div className="md:col-span-2">
            <DateTimePicker
              dateValue={currentFormData.date}
              startTimeValue={currentFormData.startTime}
              endTimeValue={currentFormData.endTime}
              onDateChange={(value) => handleChange('date', value)}
              onStartTimeChange={(value) => handleChange('startTime', value)}
              onEndTimeChange={(value) => handleChange('endTime', value)}
            />
          </div>

          {/* Venue Name */}
          <div>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Building className="w-4 h-4 inline mr-2 text-pink-600" />
                Nama Venue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentFormData.venueName || ''}
                onChange={(e) => handleChange('venueName', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                placeholder="Contoh: Hotel Indonesia Kempinski"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Nama gedung/venue tempat acara</p>
            </div>
          </div>

          {/* Venue Type */}
          <div>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipe Venue
              </label>
              <select
                value={currentFormData.venueType || 'BALLROOM'}
                onChange={(e) => handleChange('venueType', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
              >
                {VENUE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <MapPin className="w-4 h-4 inline mr-2 text-pink-600" />
                Alamat Lengkap
              </label>
              <textarea
                value={currentFormData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                placeholder="Jl. M.H. Thamrin No.1, Jakarta Pusat"
              />
            </div>
          </div>

          {/* Google Maps URL */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Map className="w-4 h-4 inline mr-2 text-pink-600" />
                Google Maps Link
              </label>
              <input
                type="url"
                value={currentFormData.googleMapsUrl || ''}
                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                placeholder="https://maps.google.com/?q=..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Tamu akan diarahkan ke Google Maps untuk navigasi
              </p>
            </div>
          </div>
        </div>
      </form>
    )
  }

  // STEP 3: Theme & Features
  if (activeStep === 2) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(currentFormData) }} className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-8 mb-8">
          <div className="relative text-center text-white">
            <Palette className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Tema & Fitur</h2>
            <p className="text-white/90 text-lg">Personalisasi undangan Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theme */}
          <div className="space-y-8">
            {/* Color Picker */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <ColorPicker
                value={currentFormData.primaryColor}
                onChange={(value) => handleChange('primaryColor', value)}
              />
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 text-pink-500 mr-2" />
                Logo Pasangan
              </h3>
              
              <div className="flex items-center space-x-4">
                {currentFormData.logoUrl ? (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-3 border-pink-300 shadow-lg">
                    <img src={currentFormData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleChange('logoUrl', '')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center shadow-md"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="w-24 h-24 rounded-xl border-3 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('logoUrl', e)}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Upload Logo</span>
                  </label>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Logo/Inisial Pasangan</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Format: JPG, PNG (Maks 2MB)<br/>
                    Ukuran ideal: 200x200px
                  </p>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Camera className="w-5 h-5 text-pink-500 mr-2" />
                Foto Sampul
              </h3>
              
              {currentFormData.coverImageUrl ? (
                <div className="relative rounded-xl overflow-hidden border-3 border-pink-300 shadow-lg">
                  <img src={currentFormData.coverImageUrl} alt="Cover" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => handleChange('coverImageUrl', '')}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm flex items-center justify-center shadow-md"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="relative block w-full h-48 rounded-xl border-3 border-dashed border-gray-300 cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('coverImageUrl', e)}
                    className="hidden"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-600">Upload Foto Sampul</span>
                    <span className="text-xs text-gray-500 mt-2">Ukuran ideal: 1200x630px</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Right Column - Access & Features */}
          <div className="space-y-8">
            {/* Access Settings */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Lock className="w-5 h-5 text-pink-500 mr-2" />
                Akses & Privasi
              </h3>
              
              <div className="space-y-4">
                {INVITATION_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <label
                      key={type.value}
                      className={`
                        relative flex items-start p-5 border-2 rounded-xl cursor-pointer
                        transition-all duration-300 hover:scale-[1.02]
                        ${currentFormData.invitationType === type.value
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="invitationType"
                        value={type.value}
                        checked={currentFormData.invitationType === type.value}
                        onChange={(e) => handleChange('invitationType', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`
                        w-14 h-14 rounded-xl flex items-center justify-center mr-4
                        ${currentFormData.invitationType === type.value
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-lg">{type.label}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {currentFormData.invitationType === type.value && (
                        <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-pink-600" />
                      )}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Wedding Features */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
                Fitur Undangan Digital
              </h3>
              
              <div className="space-y-4">
                {/* Photo on Check-in */}
                <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all">
                  <div className="flex items-center">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${currentFormData.allowPhotoOnCheckIn ? 'bg-pink-100' : 'bg-gray-100'}
                    `}>
                      <Camera className={`
                        w-7 h-7
                        ${currentFormData.allowPhotoOnCheckIn ? 'text-pink-600' : 'text-gray-400'}
                      `} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-base">Foto Saat Check-in</p>
                      <p className="text-sm text-gray-500">Ambil foto tamu saat check-in</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentFormData.allowPhotoOnCheckIn ?? true}
                      onChange={(e) => handleChange('allowPhotoOnCheckIn', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-14 h-7 rounded-full transition-colors duration-200
                      ${currentFormData.allowPhotoOnCheckIn ? 'bg-pink-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                        ${currentFormData.allowPhotoOnCheckIn ? 'translate-x-7' : 'translate-x-1'}
                      `} />
                    </div>
                  </div>
                </label>

                {/* Auto-send to WhatsApp */}
                <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
                  <div className="flex items-center">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${currentFormData.autoSendPhotoToWA ? 'bg-green-100' : 'bg-gray-100'}
                    `}>
                      <Send className={`
                        w-7 h-7
                        ${currentFormData.autoSendPhotoToWA ? 'text-green-600' : 'text-gray-400'}
                      `} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-base">Kirim Otomatis ke WhatsApp</p>
                      <p className="text-sm text-gray-500">Foto langsung dikirim ke WA tamu</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentFormData.autoSendPhotoToWA ?? true}
                      onChange={(e) => handleChange('autoSendPhotoToWA', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-14 h-7 rounded-full transition-colors duration-200
                      ${currentFormData.autoSendPhotoToWA ? 'bg-green-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                        ${currentFormData.autoSendPhotoToWA ? 'translate-x-7' : 'translate-x-1'}
                      `} />
                    </div>
                  </div>
                </label>

                {/* RSVP */}
                <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
                  <div className="flex items-center">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${currentFormData.enableRSVP ? 'bg-purple-100' : 'bg-gray-100'}
                    `}>
                      <Users className={`
                        w-7 h-7
                        ${currentFormData.enableRSVP ? 'text-purple-600' : 'text-gray-400'}
                      `} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-base">RSVP Online</p>
                      <p className="text-sm text-gray-500">Tamu bisa konfirmasi kehadiran</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentFormData.enableRSVP ?? true}
                      onChange={(e) => handleChange('enableRSVP', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-14 h-7 rounded-full transition-colors duration-200
                      ${currentFormData.enableRSVP ? 'bg-purple-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                        ${currentFormData.enableRSVP ? 'translate-x-7' : 'translate-x-1'}
                      `} />
                    </div>
                  </div>
                </label>

                {/* Live Count */}
                <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <div className="flex items-center">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${currentFormData.showLiveCount ? 'bg-blue-100' : 'bg-gray-100'}
                    `}>
                      <Users className={`
                        w-7 h-7
                        ${currentFormData.showLiveCount ? 'text-blue-600' : 'text-gray-400'}
                      `} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-base">Live Counter</p>
                      <p className="text-sm text-gray-500">Tampilkan jumlah tamu real-time</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={currentFormData.showLiveCount ?? true}
                      onChange={(e) => handleChange('showLiveCount', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-14 h-7 rounded-full transition-colors duration-200
                      ${currentFormData.showLiveCount ? 'bg-blue-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                        ${currentFormData.showLiveCount ? 'translate-x-7' : 'translate-x-1'}
                      `} />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  // STEP 4: Review & Publish
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(currentFormData) }} className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-pink-500 to-purple-600 p-8 mb-8">
        <div className="relative text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Review Undangan</h2>
          <p className="text-white/90 text-lg">Periksa kembali data pernikahan Anda</p>
        </div>
      </div>

      {/* Wedding Card Preview */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200">
          {/* Cover Image */}
          {currentFormData.coverImageUrl && (
            <div className="h-56 overflow-hidden">
              <img src={currentFormData.coverImageUrl} alt="Wedding Cover" className="w-full h-full object-cover" />
            </div>
          )}
          
          {/* Content */}
          <div className="p-8 text-center relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                {currentFormData.logoUrl ? (
                  <img src={currentFormData.logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover border-4 border-white" />
                ) : (
                  <Heart className="w-10 h-10 text-white" fill="white" />
                )}
              </div>
            </div>
            
            <div className="mt-12">
              {/* Wedding Title */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {currentFormData.weddingTitle || `The Wedding of ${currentFormData.groomName} & ${currentFormData.brideName}`}
              </h1>
              
              {/* Couple Names */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{currentFormData.groomName}</p>
                  <p className="text-sm text-gray-500">Putra dari Bpk. ... & Ibu ...</p>
                </div>
                <span className="text-pink-500 text-3xl">&</span>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-800">{currentFormData.brideName}</p>
                  <p className="text-sm text-gray-500">Putri dari Bpk. ... & Ibu ...</p>
                </div>
              </div>
              
              {/* Date & Time */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl mb-4">
                <Calendar className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">
                  {currentFormData.date ? new Date(currentFormData.date).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : '-'}
                </span>
                <br />
                <Clock className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">
                  {currentFormData.startTime || '-'} - {currentFormData.endTime || '-'} WIB
                </span>
              </div>
              
              {/* Venue */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                <MapPin className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">{currentFormData.venueName || '-'}</span>
                <p className="text-sm text-gray-600 mt-1">{currentFormData.address || '-'}</p>
                {currentFormData.googleMapsUrl && (
                  <a href={currentFormData.googleMapsUrl} target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center mt-3 text-sm text-pink-600 hover:text-pink-700 font-medium">
                    <Map className="w-4 h-4 mr-1" />
                    Buka Google Maps
                  </a>
                )}
              </div>
              
              {/* Features */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {currentFormData.allowPhotoOnCheckIn && (
                  <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs flex items-center">
                    <Camera className="w-3 h-3 mr-1" /> Foto Check-in
                  </span>
                )}
                {currentFormData.autoSendPhotoToWA && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                    <Send className="w-3 h-3 mr-1" /> Auto WA
                  </span>
                )}
                {currentFormData.enableRSVP && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" /> RSVP
                  </span>
                )}
                {currentFormData.showLiveCount && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" /> Live Counter
                  </span>
                )}
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center">
                  {currentFormData.invitationType === 'PUBLIC' ? 
                    <Globe className="w-3 h-3 mr-1" /> : 
                    <Lock className="w-3 h-3 mr-1" />
                  }
                  {currentFormData.invitationType === 'PUBLIC' ? 'Publik' : 'Privat'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Theme Preview */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: currentFormData.primaryColor }}></div>
          <span className="ml-2 text-sm text-gray-600">Warna Tema</span>
        </div>
        <div className="text-sm text-gray-500">
          {currentFormData.shortCode && (
            <>Kode Undangan: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{currentFormData.shortCode}</span></>
          )}
        </div>
      </div>

      {/* Submit Button sudah di-handle oleh FormActions */}
    </form>
  )
}