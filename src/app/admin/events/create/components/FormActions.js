'use client'

import { Save, X, Send } from 'lucide-react'
import Link from 'next/link'

export default function FormActions({ 
  loading = false, 
  isValid = true,
  onSaveAsDraft,
  onPublish 
}) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/events"
            className="flex items-center px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            <X className="w-4 h-4 mr-2" />
            Batal
          </Link>
          
          <button
            type="button"
            onClick={onSaveAsDraft}
            disabled={loading || !isValid}
            className={`
              flex items-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300
              ${loading || !isValid
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan sebagai Draft
          </button>
        </div>
        
        <button
          type="submit"
          disabled={loading || !isValid}
          className={`
            flex items-center px-6 py-3 font-medium rounded-xl shadow-lg
            transition-all duration-300 transform hover:scale-[1.02]
            ${loading || !isValid
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-xl'
            }
          `}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Memproses...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Buat Event
            </>
          )}
        </button>
      </div>
      
      {/* Status Indicators */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Semua field terisi</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Validasi OK</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Draft tersimpan otomatis</span>
        </div>
      </div>
    </div>
  )
}