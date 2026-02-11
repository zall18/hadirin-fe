'use client'

import { Heart, AlertCircle } from 'lucide-react'

export default function DeleteModal({ 
  isOpen, 
  event, 
  onClose, 
  onConfirm,
  loading = false 
}) {
  if (!isOpen || !event) return null

  const weddingTitle = event.weddingTitle || `Pernikahan ${event.brideName || ''} & ${event.groomName || ''}`

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Hapus Pernikahan</h3>
            <p className="text-gray-500 text-sm">Konfirmasi penghapusan undangan</p>
          </div>
        </div>
        
        <div className="mb-6 p-5 bg-red-50 rounded-xl border border-red-100">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium mb-2">
                Anda akan menghapus pernikahan:
              </p>
              <p className="text-lg font-semibold text-red-800 mb-2">
                {weddingTitle}
              </p>
              <p className="text-sm text-red-600">
                • Kode Undangan: <span className="font-mono bg-red-100 px-2 py-0.5 rounded">{event.shortCode || '-'}</span>
              </p>
              <p className="text-sm text-red-600 mt-1">
                • Pengantin: {event.brideName || '-'} & {event.groomName || '-'}
              </p>
              <p className="text-sm text-red-600 mt-1">
                • Total Tamu: {event.totalGuests || 0} orang
              </p>
              <p className="text-xs text-red-500 mt-3 font-medium">
                ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data tamu, foto, dan check-in akan ikut terhapus permanen.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-4 py-2.5 font-medium rounded-lg shadow-md transition-all duration-300
              flex items-center
              ${loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-lg'
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Menghapus...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Hapus Pernikahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}