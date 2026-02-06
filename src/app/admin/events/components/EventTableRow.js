'use client'

import { Calendar, MapPin, Users, Image, CheckSquare, Eye, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EventTableRow({ event, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeRelative = (date) => {
    const now = new Date()
    const eventDate = new Date(date)
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

  return (
    <div className="grid grid-cols-12 gap-4 p-5 hover:bg-gray-50 transition-colors duration-200">
      {/* Event Info */}
      <div className="col-span-5">
        <div className="flex items-start space-x-3">
          <div 
            className="w-3 h-12 rounded-lg flex-shrink-0"
            style={{ backgroundColor: event.themeColor }}
          ></div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{event.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
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
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
          <div>
            <p className="text-gray-800 font-medium">{formatDate(event.date)}</p>
            <p className="text-gray-500 text-xs mt-1">{getTimeRelative(event.date)}</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="col-span-2">
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 text-purple-500 mr-2" />
            <span>{event.guestCount} tamu</span>
          </div>
          <div className="flex items-center text-sm">
            <Image className="w-4 h-4 text-blue-500 mr-2" />
            <span>{event.photoCount} foto</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckSquare className="w-4 h-4 text-green-500 mr-2" />
            <span>{event.checkInCount} check-in</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="col-span-2">
        <div className="flex flex-col space-y-2">
          <span className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit
            ${event.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
            }
          `}>
            {event.isActive ? 'Aktif' : 'Tidak Aktif'}
          </span>
          
          {/* RSVP Percentage */}
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${event.rsvpPercentage}%`,
                  backgroundColor: event.themeColor 
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 ml-2">{event.rsvpPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="col-span-1">
        <div className="flex items-center justify-end space-x-1">
          <Link
            href={`/dashboard/events/${event.slug}`}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Lihat Detail"
          >
            <Eye className="w-4 h-4" />
          </Link>
          
          <Link
            href={`/dashboard/events/${event.slug}/edit`}
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