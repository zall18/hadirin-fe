'use client'

import { useState } from 'react'
import { Mail, Phone, Calendar, Edit2, Trash2, MoreVertical, Shield } from 'lucide-react'
import StaffRoleBadge from './StaffRoleBadge'

export default function StaffTableRow({ staff, onEdit, onDelete, onUpdateRole }) {
  const [showMenu, setShowMenu] = useState(false)

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getAvatarColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-500'
      case 'ADMIN': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Staff Info */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(staff.role)} flex items-center justify-center text-white font-medium`}>
            {staff.avatarUrl ? (
              <img src={staff.avatarUrl} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              getInitials(staff.name)
            )}
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">{staff.name}</p>
            <div className="flex items-center mt-1">
              <StaffRoleBadge role={staff.role} />
            </div>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Mail className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <span className="text-gray-600">{staff.email}</span>
          </div>
          {staff.phone && (
            <div className="flex items-center text-sm">
              <Phone className="w-3.5 h-3.5 text-gray-400 mr-2" />
              <span className="text-gray-600">{staff.phone}</span>
            </div>
          )}
        </div>
      </td>

      {/* Last Login */}
      <td className="px-6 py-4">
        {staff.lastLoginAt ? (
          <div className="flex items-center text-sm">
            <Calendar className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <span className="text-gray-600">
              {new Date(staff.lastLoginAt).toLocaleDateString('id-ID')}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">Belum pernah login</span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          staff.isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {staff.isActive ? 'Aktif' : 'Nonaktif'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onEdit?.(staff)}
            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete?.(staff)}
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
                  <Shield className="w-4 h-4 inline mr-2" />
                  Ubah Role
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Reset Password
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                  Nonaktifkan Akun
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}