'use client'

import { Users, Camera, CheckSquare, Gift, MessageSquare, TrendingUp, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WeddingStats({ wedding }) {
  const [stats, setStats] = useState({
    guests: wedding._count?.guests || 0,
    photos: wedding._count?.photos || 0,
    checkIns: wedding._count?.checkIns || 0,
    whatsApp: wedding._count?.whatsAppLogs || 0,
    wishes: wedding._count?.guestWishes || 0
  })

  // Simulasi real-time update
  useEffect(() => {
    const interval = setInterval(() => {
      if (wedding.showLiveCount) {
        // Random increment untuk demo
        setStats(prev => ({
          ...prev,
          checkIns: prev.checkIns + (Math.random() > 0.7 ? 1 : 0),
          photos: prev.photos + (Math.random() > 0.8 ? 1 : 0)
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [wedding.showLiveCount])

  const rsvpPercentage = wedding.totalGuests > 0 
    ? Math.round((wedding.confirmedCount / wedding.totalGuests) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <Users className="w-6 h-6 mr-3" />
            <h2 className="text-xl font-semibold">Statistik Real-time</h2>
          </div>
          {wedding.showLiveCount && (
            <div className="flex items-center text-white/90 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              Live
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* RSVP Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Konfirmasi Kehadiran</span>
            <span className="text-sm font-bold text-purple-600">{rsvpPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${rsvpPercentage}%`,
                backgroundColor: wedding.primaryColor 
              }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{wedding.confirmedCount} konfirmasi</span>
            <span>dari {wedding.totalGuests} tamu</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.guests}</p>
            <p className="text-xs text-gray-500 mt-1">Tamu Undangan</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckSquare className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-600">Hadir</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.checkIns}</p>
            <p className="text-xs text-gray-500 mt-1">Check-in</p>
          </div>

          <div className="bg-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Camera className="w-5 h-5 text-pink-600" />
              <span className="text-xs text-pink-600">Foto</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.photos}</p>
            <p className="text-xs text-gray-500 mt-1">Foto Terupload</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-purple-600">Hadiah</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.wishes}</p>
            <p className="text-xs text-gray-500 mt-1">Ucapan</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>Konfirmasi: {wedding.confirmedCount}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Attended: {wedding.attendedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}