'use client'

import { Calendar, Plus } from 'lucide-react'
import Link from 'next/link'
import EventTableRow from './EventTableRow'

export default function EventsTable({ events, loading, onDelete, totalEvents, page, perPage }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-700">
          <div className="col-span-5">Event</div>
          <div className="col-span-2">Tanggal & Waktu</div>
          <div className="col-span-2">Statistik</div>
          <div className="col-span-2">Status</div>
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
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="col-span-2">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-end space-x-2">
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
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada event ditemukan</h3>
          <p className="text-gray-500 mb-6">Coba ubah filter pencarian atau tambahkan event baru</p>
          <Link
            href="/dashboard/events/create"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buat Event Pertama
          </Link>
        </div>
      </div>
    )
  }

  const startIndex = (page - 1) * perPage + 1
  const endIndex = Math.min(startIndex + perPage - 1, totalEvents)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-700">
        <div className="col-span-5">Event</div>
        <div className="col-span-2">Tanggal & Waktu</div>
        <div className="col-span-2">Statistik</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Aksi</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <EventTableRow key={event.id} event={event} onDelete={onDelete} />
        ))}
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
        Menampilkan {startIndex}-{endIndex} dari {totalEvents} event
      </div>
    </div>
  )
}