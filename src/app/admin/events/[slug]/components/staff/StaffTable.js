'use client'

import { UserCog, Plus } from 'lucide-react'
import StaffTableRow from './StaffTableRow'

export default function StaffTable({
  staff = [],
  loading = false,
  onEdit,
  onDelete,
  onUpdateRole,
  onAdd
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data staff...</p>
        </div>
      </div>
    )
  }

  if (staff.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-20 h-20 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <UserCog className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Staff</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Tambahkan admin atau staff untuk membantu mengelola acara pernikahan
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Undang Staff
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontak
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terakhir Login
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map((member) => (
              <StaffTableRow
                key={member.id}
                staff={member}
                onEdit={onEdit}
                onDelete={onDelete}
                onUpdateRole={onUpdateRole}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}