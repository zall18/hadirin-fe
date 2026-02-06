'use client'

import { AlertCircle } from 'lucide-react'

export default function DeleteModal({ 
  isOpen, 
  event, 
  onClose, 
  onConfirm,
  loading = false 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Hapus Event</h3>
            <p className="text-gray-500 text-sm">Konfirmasi penghapusan event</p>
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-red-50 rounded-xl">
          <p className="text-red-700">
            Anda akan menghapus event <span className="font-bold">{event?.name}</span>. 
            Tindakan ini tidak dapat dibatalkan dan semua data terkait akan dihapus permanen.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors disabled:opacity-50"
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
              'Hapus Event'
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

// Tambahkan styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}