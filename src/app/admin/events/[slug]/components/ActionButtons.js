'use client'

import { useState } from 'react'
import { 
  Edit2, Trash2, Globe, Eye, EyeOff, 
  Copy, CheckCircle, AlertCircle, Share2,
  Download, MoreVertical
} from 'lucide-react'
import Link from 'next/link'

import { eventsApi } from '../../api/events'

export default function ActionButtons({ wedding, onUpdate }) {
  const [loading, setLoading] = useState({
    publish: false,
    delete: false,
    copy: false
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const handlePublish = async () => {
    setLoading(prev => ({ ...prev, publish: true }))
    try {
    //   if (wedding.isPublished) {
    //     await weddingDetailApi.unpublishWedding(wedding.slug)
    //   } else {
    //     await weddingDetailApi.publishWedding(wedding.slug)
    //   }
    //   onUpdate?.()
    } catch (error) {
      console.error('Error toggling publish:', error)
    } finally {
      setLoading(prev => ({ ...prev, publish: false }))
    }
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/invitation/${wedding.slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    setLoading(prev => ({ ...prev, delete: true }))
    try {
      await eventsApi.deleteEvent(wedding.slug)
      window.location.href = '/admin/events'
    } catch (error) {
      console.error('Error deleting wedding:', error)
    } finally {
      setLoading(prev => ({ ...prev, delete: false }))
      setShowDeleteModal(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden top-24">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-5">
          <h3 className="text-white font-semibold flex items-center">
            <MoreVertical className="w-5 h-5 mr-2" />
            Aksi Cepat
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {/* Edit Button */}
          <Link
            href={`/admin/events/${wedding.slug}/edit`}
            className="flex items-center w-full p-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mr-3 transition-colors">
              <Edit2 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">Edit Undangan</span>
          </Link>

          {/* Publish/Unpublish Button */}
          <button
            onClick={handlePublish}
            disabled={loading.publish}
            className="flex items-center w-full p-3 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all group disabled:opacity-50"
          >
            <div className={`
              w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-colors
              ${wedding.isPublished 
                ? 'bg-green-100 group-hover:bg-green-200' 
                : 'bg-gray-100 group-hover:bg-gray-200'
              }
            `}>
              {wedding.isPublished ? (
                <Eye className="w-4 h-4 text-green-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-600" />
              )}
            </div>
            <span className="font-medium">
              {loading.publish 
                ? 'Memproses...' 
                : wedding.isPublished 
                  ? 'Unpublish Undangan' 
                  : 'Publish Undangan'
              }
            </span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="flex items-center w-full p-3 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center mr-3 transition-colors">
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-purple-600" />
              )}
            </div>
            <span className="font-medium">
              {copied ? 'Tersalin!' : 'Salin Link Undangan'}
            </span>
          </button>

          {/* Preview Button */}
          <a
            href={`/invitation/${wedding.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-full p-3 rounded-xl hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center mr-3 transition-colors">
              <Globe className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="font-medium">Preview Undangan</span>
          </a>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center w-full p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center mr-3 transition-colors">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <span className="font-medium">Hapus Undangan</span>
          </button>
        </div>

        {/* Status Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Status Publikasi</span>
            <span className={`
              px-2 py-1 rounded-full font-medium
              ${wedding.isPublished 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
              }
            `}>
              {wedding.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-gray-500">Status Aktif</span>
            <span className={`
              px-2 py-1 rounded-full font-medium
              ${wedding.isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
              }
            `}>
              {wedding.isActive ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Hapus Undangan</h3>
                <p className="text-gray-500 text-sm">Konfirmasi penghapusan</p>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-sm text-red-700">
                Anda akan menghapus undangan pernikahan{' '}
                <span className="font-bold">{wedding.weddingTitle}</span>
              </p>
              <p className="text-xs text-red-600 mt-2">
                ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data tamu, foto, dan check-in akan ikut terhapus.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loading.delete}
                className={`
                  px-4 py-2 font-medium rounded-lg shadow-md transition-all
                  ${loading.delete
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  }
                `}
              >
                {loading.delete ? 'Menghapus...' : 'Hapus Permanen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}