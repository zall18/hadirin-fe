'use client'

import { Heart, Calendar, MapPin, Share2, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function WeddingHero({ wedding }) {
  const [copied, setCopied] = useState(false)

  const copyShortCode = () => {
    navigator.clipboard.writeText(wedding.shortCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getVenueTypeIcon = (type) => {
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

  const weddingDate = new Date(wedding.date)
  const startTime = new Date(wedding.startTime)
  const endTime = new Date(wedding.endTime)

  const daysUntil = Math.ceil((weddingDate - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
        {wedding.coverImageUrl ? (
          <div className="absolute inset-0">
            <img
              src={wedding.coverImageUrl}
              alt="Wedding Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
        ) : (
          <div 
            className="absolute inset-0 bg-gradient-to-br"
            style={{ 
              background: `linear-gradient(135deg, ${wedding.primaryColor}40, ${wedding.primaryColor})` 
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-6 left-6 z-20">
          <div className="flex items-center space-x-3">
            <div className={`
              px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md
              ${wedding.isPublished && wedding.isActive
                ? 'bg-green-500/90 text-white'
                : wedding.isActive
                  ? 'bg-yellow-500/90 text-white'
                  : 'bg-gray-500/90 text-white'
              }
            `}>
              {wedding.isPublished && wedding.isActive
                ? '✓ Published & Aktif'
                : wedding.isActive
                  ? '⏸️ Draft'
                  : '⛔ Tidak Aktif'}
            </div>
            
            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-gray-800">
              {wedding.invitationType === 'PUBLIC' ? '🌐 Publik' : '🔒 Privat'}
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={copyShortCode}
            className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-gray-800 hover:bg-white transition-all"
          >
            <span className="font-mono">{wedding.shortCode}</span>
            {copied ? (
              <CheckCircle className="w-4 h-4 ml-2 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 ml-2 text-gray-600" />
            )}
          </button>
        </div>

        {/* Couple Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-20">
          <div className="max-w-7xl mx-auto">
            {/* Logo if exists */}
            {wedding.logoUrl && (
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <img src={wedding.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Wedding Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              {wedding.weddingTitle}
            </h1>

            {/* Couple Names */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-2xl md:text-3xl font-semibold">{wedding.groomName}</div>
              <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
              <div className="text-2xl md:text-3xl font-semibold">{wedding.brideName}</div>
            </div>

            {/* Date & Venue */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {weddingDate.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{wedding.venueName}</span>
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {getVenueTypeIcon(wedding.venueType)} {wedding.venueType}
              </div>
            </div>

            {/* Countdown */}
            {daysUntil > 0 && (
              <div className="mt-6 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                <span className="text-sm font-medium">⏰ {daysUntil} hari lagi</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}