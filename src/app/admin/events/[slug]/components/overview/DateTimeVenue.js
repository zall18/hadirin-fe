'use client'

import { Calendar, Clock, MapPin, Map, ExternalLink } from 'lucide-react'

export default function DateTimeVenue({ wedding }) {
  const date = new Date(wedding.date)
  const startTime = new Date(wedding.startTime)
  const endTime = new Date(wedding.endTime)

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getVenueTypeLabel = (type) => {
    const types = {
      BALLROOM: 'Ballroom',
      HOTEL: 'Hotel',
      GARDEN: 'Taman',
      BEACH: 'Pantai',
      CHURCH: 'Gereja',
      MOSQUE: 'Masjid',
      HOUSE: 'Rumah',
      VILLA: 'Villa',
      GEDUNG: 'Gedung Serbaguna'
    }
    return types[type] || type
  }

  const getVenueIcon = (type) => {
    const icons = {
      BALLROOM: '🏨',
      HOTEL: '🏨',
      GARDEN: '🌳',
      BEACH: '🏖️',
      CHURCH: '⛪',
      MOSQUE: '🕌',
      HOUSE: '🏠',
      VILLA: '🏡',
      GEDUNG: '🏛️'
    }
    return icons[type] || '📍'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
        <div className="flex items-center text-white">
          <Calendar className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold">Waktu & Lokasi</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date & Time */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tanggal Pernikahan</p>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-pink-600 mr-2 flex-shrink-0" />
                <span className="font-semibold text-gray-800">
                  {date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Waktu Acara</p>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span className="font-semibold text-gray-800">
                  {formatTime(startTime)} - {formatTime(endTime)} WIB
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {startTime.getHours() < 12 ? '🌅 Akad Nikah' : 
                   startTime.getHours() < 18 ? '☀️ Resepsi Siang' : '🌙 Resepsi Malam'}
                </span>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tipe Venue</p>
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getVenueIcon(wedding.venueType)}</span>
                <div>
                  <span className="font-semibold text-gray-800">
                    {getVenueTypeLabel(wedding.venueType)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{wedding.venueType}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Nama Venue</p>
              <p className="font-semibold text-gray-800">{wedding.venueName}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Alamat Lengkap</p>
          <p className="text-gray-800 mb-4">{wedding.address}</p>
          
          {wedding.googleMapsUrl && (
            <a
              href={wedding.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-medium transition-all"
            >
              <Map className="w-4 h-4 mr-2" />
              Buka di Google Maps
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}