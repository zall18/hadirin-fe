'use client'

import { useState } from 'react'
import { Trash2, Send, CheckSquare, XSquare } from 'lucide-react'

export default function GuestBulkActions({
  selectedCount = 0,
  onSelectAll,
  onClearAll,
  onBulkDelete,
  onBulkSendWA,
  onBulkCheckin
}) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [action, setAction] = useState(null)

  if (selectedCount === 0) return null

  const handleAction = (type) => {
    setAction(type)
    setShowConfirm(true)
  }

  const confirmAction = () => {
    switch (action) {
      case 'delete':
        onBulkDelete()
        break
      case 'sendWA':
        onBulkSendWA()
        break
      case 'checkin':
        onBulkCheckin()
        break
    }
    setShowConfirm(false)
  }

  return (
    <>
      <div className="sticky bottom-6 left-0 right-0 mx-auto max-w-fit bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 flex items-center space-x-4 animate-fadeIn">
        <span className="text-sm font-medium text-gray-700 px-3">
          {selectedCount} tamu dipilih
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onSelectAll}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <CheckSquare className="w-4 h-4 inline mr-1" />
            Pilih Semua
          </button>
          
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XSquare className="w-4 h-4 inline mr-1" />
            Hapus Pilihan
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAction('checkin')}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <CheckSquare className="w-4 h-4 inline mr-1" />
            Check-in
          </button>
          
          <button
            onClick={() => handleAction('sendWA')}
            className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Send className="w-4 h-4 inline mr-1" />
            Kirim WA
          </button>
          
          <button
            onClick={() => handleAction('delete')}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 inline mr-1" />
            Hapus
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                action === 'delete' ? 'bg-red-100' :
                action === 'sendWA' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {action === 'delete' && <Trash2 className="w-6 h-6 text-red-600" />}
                {action === 'sendWA' && <Send className="w-6 h-6 text-blue-600" />}
                {action === 'checkin' && <CheckSquare className="w-6 h-6 text-green-600" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Konfirmasi Tindakan</h3>
                <p className="text-sm text-gray-500">
                  {action === 'delete' && `Hapus ${selectedCount} tamu yang dipilih?`}
                  {action === 'sendWA' && `Kirim undangan ke ${selectedCount} tamu?`}
                  {action === 'checkin' && `Check-in ${selectedCount} tamu?`}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 text-white font-medium rounded-lg shadow-md ${
                  action === 'delete' ? 'bg-red-500 hover:bg-red-600' :
                  action === 'sendWA' ? 'bg-blue-500 hover:bg-blue-600' :
                  'bg-green-500 hover:bg-green-600'
                }`}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}