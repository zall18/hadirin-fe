'use client'

import { Users, Download, Plus } from 'lucide-react'
import GuestTableRow from './GuestTableRow'

export default function GuestTable({
  guests = [],
  loading = false,
  onEdit,
  onDelete,
  onCheckin,
  onSendWA,
  onAdd,
  onImport,
  onExport
}) {

    console.log(guests);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data tamu...</p>
        </div>
      </div>
    )
  }

  if (guests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-20 h-20 mx-auto bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-pink-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Tamu</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Tambahkan tamu undangan secara manual atau import dari file Excel/CSV
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onAdd}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Tamu Manual
            </button>
            <button
              onClick={onImport}
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Import File
            </button>
          </div>
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
                Nama Tamu
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontak
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.map((guest) => (
              <GuestTableRow
                key={guest.id}
                guest={guest}
                onEdit={onEdit}
                onDelete={onDelete}
                onCheckin={onCheckin}
                onSendWA={onSendWA}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}