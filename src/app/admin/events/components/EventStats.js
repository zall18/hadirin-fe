'use client'

import { Calendar, CheckSquare, Users, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { eventsApi } from '../api/events'

export default function EventStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const data = await eventsApi.getStatistics()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Events Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Event</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalEvents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">+{stats.recentEvents} event baru</span>
        </div>
      </div>

      {/* Active Events Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Event Aktif</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.activeEvents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-500">{stats.activeEvents} event sedang berjalan</span>
        </div>
      </div>

      {/* Total Guests Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Tamu</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalGuests.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs">
          <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
          <span className="text-purple-500">Rata-rata 85% hadir</span>
        </div>
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Event Mendatang</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.upcomingEvents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />
          <span className="text-amber-500">{stats.upcomingEvents} event perlu persiapan</span>
        </div>
      </div>
    </div>
  )
}