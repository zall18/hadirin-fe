'use client'

import { Calendar, MapPin, Users, Camera, CheckSquare, Eye, Edit2, Trash2, Heart, Gift, Clock } from 'lucide-react'
import Link from 'next/link'

export default function EventTableRow({ event, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    if (!timeString) return '-'
    const date = new Date(timeString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeRelative = (dateString) => {
    const now = new Date()
    const eventDate = new Date(dateString)
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

  const getVenueTypeLabel = (type) => {
    const types = {
      'BALLROOM': { label: 'Ballroom', emoji: '🏨' },
      'HOTEL': { label: 'Hotel', emoji: '🏨' },
      'GARDEN': { label: 'Taman', emoji: '🌳' },
      'BEACH': { label: 'Pantai', emoji: '🏖️' },
      'CHURCH': { label: 'Gereja', emoji: '⛪' },
      'MOSQUE': { label: 'Masjid', emoji: '🕌' },
      'HOUSE': { label: 'Rumah', emoji: '🏠' },
      'VILLA': { label: 'Villa', emoji: '🏡' },
      'GEDUNG': { label: 'Gedung', emoji: '🏛️' }
    }
    return types[type] || { label: type, emoji: '📍' }
  }

  const getInvitationTypeLabel = (type) => {
    return type === 'PRIVATE' ? 'Privat' : 'Publik'
  }

  const weddingTitle = event.weddingTitle || event.name || `Pernikahan ${event.brideName || ''} & ${event.groomName || ''}`
  const brideName = event.brideName || 'Nama'
  const groomName = event.groomName || 'Nama'
  const primaryColor = event.primaryColor || '#F472B6'
  const venueType = getVenueTypeLabel(event.venueType)
  const invitationType = getInvitationTypeLabel(event.invitationType)
  const totalGuests = event.totalGuests || event._count?.guests || 0
  const photoCount = event._count?.photos || 0
  const checkInCount = event._count?.checkIns || 0
  const isActive = event.isActive
  const isPublished = event.isPublished
  const shortCode = event.shortCode || '-'

  // Hitung persentase RSVP/konfirmasi
  const rsvpPercentage = totalGuests > 0 
    ? Math.round((event.confirmedCount || 0) / totalGuests * 100) 
    : 0

  return (
    <div className="grid grid-cols-12 gap-4 p-5 hover:bg-pink-50/30 transition-colors duration-200">
      {/* Event Info - Wedding Details */}
      <div className="col-span-5">
        <div className="flex items-start space-x-3">
          {/* Color Indicator */}
          <div 
            className="w-3 h-12 rounded-lg flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          ></div>
          
          <div className="min-w-0 flex-1">
            {/* Wedding Title & Names */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800 truncate">
                {weddingTitle}
              </h3>
              {shortCode && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {shortCode}
                </span>
              )}
            </div>
            
            {/* Bride & Groom */}
            <div className="flex items-center mt-1 text-sm">
              <Heart className="w-3.5 h-3.5 text-pink-500 mr-1 flex-shrink-0" />
              <span className="text-gray-700 truncate">
                {brideName} & {groomName}
              </span>
            </div>
            
            {/* Venue & Location */}
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span className="mr-1">{venueType.emoji}</span>
              <span className="font-medium mr-1">{event.venueName || 'Venue'}</span>
              <span className="text-gray-400 truncate">• {event.address?.split(',')[0] || 'Alamat'}</span>
            </div>

            {/* Slug */}
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
        <div className="flex flex-col text-sm">
          <div className="flex items-center font-medium text-gray-800">
            <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center mt-1 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {getTimeRelative(event.date)}
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="col-span-2">
        <div className="space-y-1.5">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 text-purple-500 mr-2" />
            <span>{totalGuests} tamu</span>
          </div>
          <div className="flex items-center text-sm">
            <Camera className="w-4 h-4 text-blue-500 mr-2" />
            <span>{photoCount} foto</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckSquare className="w-4 h-4 text-green-500 mr-2" />
            <span>{checkInCount} check-in</span>
          </div>
          <div className="flex items-center text-sm">
            <Gift className="w-4 h-4 text-amber-500 mr-2" />
            <span>{event.confirmedCount || 0} konfirmasi</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="col-span-2">
        <div className="flex flex-col space-y-2">
          {/* Active/Published Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
              ${isActive && isPublished 
                ? 'bg-green-100 text-green-800' 
                : isActive 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }
            `}>
              {isActive && isPublished 
                ? 'Aktif & Published' 
                : isActive 
                  ? 'Aktif' 
                  : 'Tidak Aktif'}
            </span>
            
            <span className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
              ${event.invitationType === 'PUBLIC' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
              }
            `}>
              {invitationType}
            </span>
          </div>
          
          {/* RSVP Progress Bar */}
          {event.enableRSVP && (
            <div className="mt-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">RSVP</span>
                <span className="font-medium text-gray-700">{rsvpPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${rsvpPercentage}%`,
                    backgroundColor: primaryColor 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="flex items-center gap-1 mt-1">
            {event.enableRSVP && (
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full" title="RSVP Aktif">
                RSVP
              </span>
            )}
            {event.allowPhotoOnCheckIn && (
              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full" title="Foto Check-in">
                📸
              </span>
            )}
            {event.showLiveCount && (
              <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full" title="Live Count">
                📊
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="col-span-1">
        <div className="flex items-center justify-end space-x-1">
          <Link
            href={`/admin/events/${event.slug}`}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Lihat Detail"
          >
            <Eye className="w-4 h-4" />
          </Link>
          
          <Link
            href={`/admin/events/${event.slug}/edit`}
            className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          
          <button
            onClick={() => onDelete(event)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}