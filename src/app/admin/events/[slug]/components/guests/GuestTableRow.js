'use client'

import { useState } from 'react'
import {
  Phone, Mail, Users, QrCode,
  CheckCircle, XCircle, Clock,
  Edit2, Trash2, Camera, Send,
  MoreVertical, UserCheck, UserX
} from 'lucide-react'

const statusConfig = {
  INVITED: {
    label: 'Diundang',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    icon: Clock
  },
  CONFIRMED: {
    label: 'Konfirmasi',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    icon: CheckCircle
  },
  ATTENDED: {
    label: 'Hadir',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    icon: UserCheck
  },
  CANCELLED: {
    label: 'Batal',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    icon: XCircle
  },
  NO_SHOW: {
    label: 'Tidak Hadir',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    icon: UserX
  }
}

export default function GuestTableRow({ guest, onEdit, onDelete, onCheckin, onSendWA }) {
  const [showMenu, setShowMenu] = useState(false)
  const Status = statusConfig[guest.status] || statusConfig.INVITED
  const StatusIcon = Status.icon

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Guest Info */}
      <td className="px-6 py-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              guest.status === 'ATTENDED' ? 'bg-green-500' :
              guest.status === 'CONFIRMED' ? 'bg-blue-500' :
              'bg-gray-300'
            }`} />
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{guest.name}</p>
            <div className="flex items-center mt-1 space-x-2 text-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                {guest.category}
              </span>
              {guest.groupName && (
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {guest.groupName}
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Phone className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <span className="text-gray-600">{guest.phone}</span>
          </div>
          {guest.email && (
            <div className="flex items-center text-sm">
              <Mail className="w-3.5 h-3.5 text-gray-400 mr-2" />
              <span className="text-gray-600">{guest.email}</span>
            </div>
          )}
        </div>
      </td>

      {/* Guests */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-400 mr-2" />
          <span className="font-medium text-gray-900">{guest.invitedCount}</span>
          {guest.plusOneAllowed > 0 && (
            <span className="ml-1 text-xs text-gray-500">
              (+{guest.plusOneAllowed})
            </span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex flex-col space-y-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${Status.bgColor} ${Status.textColor}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {Status.label}
          </span>
          {guest.rsvpDate && (
            <span className="text-xs text-gray-500">
              {new Date(guest.rsvpDate).toLocaleDateString('id-ID')}
            </span>
          )}
        </div>
      </td>

      {/* Check-in */}
      <td className="px-6 py-4">
        {guest.checkedInAt ? (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-green-600">✓ Check-in</span>
            <span className="text-xs text-gray-500">
              {new Date(guest.checkedInAt).toLocaleTimeString('id-ID')}
            </span>
            <span className="text-xs text-gray-400">by {guest.checkedInBy}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">Belum check-in</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onCheckin?.(guest)}
            disabled={guest.status === 'ATTENDED'}
            className={`p-1.5 rounded-lg transition-colors ${
              guest.status === 'ATTENDED'
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-green-600 hover:bg-green-50'
            }`}
            title="Check-in"
          >
            <Camera className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onSendWA?.(guest)}
            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            title="Kirim WhatsApp"
          >
            <Send className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onEdit?.(guest)}
            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete?.(guest)}
            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  <QrCode className="w-4 h-4 inline mr-2" />
                  Lihat QR Code
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Lihat History
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                  Undo Check-in
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}