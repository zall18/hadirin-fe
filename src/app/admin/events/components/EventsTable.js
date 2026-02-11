'use client'

import { Heart, Plus, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import EventTableRow from './EventTableRow'

export default function EventsTable({ events, loading, onDelete, totalEvents, page, perPage }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50 text-sm font-semibold text-gray-700">
          <div className="col-span-5">Detail Pernikahan</div>
          <div className="col-span-2">Tanggal & Waktu</div>
          <div className="col-span-2">Statistik</div>
          <div className="col-span-2">Status & Fitur</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>
        
        {/* Loading Skeleton */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 animate-pulse">
            <div className="col-span-5">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-12 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-end space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-16 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Belum Ada Pernikahan</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Mulai buat undangan pernikahan digital pertama Anda. 
            Isi detail pengantin, lokasi, dan tema sesuai keinginan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin/events/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              Buat Pernikahan Pertama
            </Link>
            <Link
              href="/admin/weddings/templates"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Lihat Template
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const startIndex = (page - 1) * perPage + 1
  const endIndex = Math.min(startIndex + perPage - 1, totalEvents)

  // Hitung statistik tambahan
  const totalGuests = events.reduce((sum, e) => sum + (e.totalGuests || 0), 0)
  const totalConfirmed = events.reduce((sum, e) => sum + (e.confirmedCount || 0), 0)
  const activeWeddings = events.filter(e => e.isActive && e.isPublished).length

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header dengan tema pernikahan */}
      <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50 text-sm font-semibold text-gray-700">
        <div className="col-span-5 flex items-center">
          <Heart className="w-4 h-4 text-pink-500 mr-2" />
          Detail Pernikahan
        </div>
        <div className="col-span-2 flex items-center">
          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
          Jadwal
        </div>
        <div className="col-span-2 flex items-center">
          <Users className="w-4 h-4 text-purple-500 mr-2" />
          Statistik
        </div>
        <div className="col-span-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Status & Fitur
        </div>
        <div className="col-span-1 text-right">Aksi</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <EventTableRow key={event.id} event={event} onDelete={onDelete} />
        ))}
      </div>

      {/* Table Footer dengan summary */}
      <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">
              Menampilkan <span className="font-semibold text-gray-900">{startIndex}-{endIndex}</span> dari{' '}
              <span className="font-semibold text-gray-900">{totalEvents}</span> pernikahan
            </span>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <span className="text-gray-600">
              Total <span className="font-semibold text-pink-600">{activeWeddings}</span> pernikahan aktif
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
              <span className="text-gray-600">Aktif & Published</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></div>
              <span className="text-gray-600">Aktif (Draft)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></div>
              <span className="text-gray-600">Tidak Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}