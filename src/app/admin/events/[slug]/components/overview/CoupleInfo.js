'use client'

import { Heart, Users, Calendar, Edit2 } from 'lucide-react'
import Link from 'next/link'

export default function CoupleInfo({ wedding }) {
  const weddingDate = new Date(wedding.date)
  const createdAt = new Date(wedding.createdAt)
  const updatedAt = new Date(wedding.updatedAt)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <Heart className="w-6 h-6 mr-3" fill="white" />
            <h2 className="text-xl font-semibold">Informasi Pengantin</h2>
          </div>
          <Link
            href={`/admin/events/${wedding.slug}/edit`}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all flex items-center"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Groom */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">👨</span>
              </div>
              <div>
                <p className="text-sm text-blue-600">Mempelai Pria</p>
                <p className="font-bold text-gray-800 text-lg">{wedding.groomName}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Putra dari Bpk. ... & Ibu ...
            </div>
          </div>

          {/* Bride */}
          <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">👩</span>
              </div>
              <div>
                <p className="text-sm text-pink-600">Mempelai Wanita</p>
                <p className="font-bold text-gray-800 text-lg">{wedding.brideName}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Putri dari Bpk. ... & Ibu ...
            </div>
          </div>
        </div>

        {/* Wedding Info */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm">
                Dibuat: {createdAt.toLocaleDateString('id-ID')}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm">
                Diupdate: {updatedAt.toLocaleDateString('id-ID')}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full font-mono">
                ID: {wedding.shortCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}