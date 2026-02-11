'use client'

import { Palette, Image as ImageIcon, Heart, CheckCircle } from 'lucide-react'

export default function ThemePreview({ wedding }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5">
        <div className="flex items-center text-white">
          <Palette className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold">Tema & Branding</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Color Theme */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Warna Utama</p>
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-xl shadow-lg"
                style={{ backgroundColor: wedding.primaryColor }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{wedding.primaryColor}</p>
                <p className="text-xs text-gray-500 mt-1">Warna tema pernikahan</p>
              </div>
            </div>
          </div>

          {/* Logo */}
          {wedding.logoUrl && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Logo Pasangan</p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-pink-300 shadow-md">
                  <img src={wedding.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Logo Pasangan</p>
                  <p className="text-xs text-gray-500 mt-1">Digunakan di header undangan</p>
                </div>
              </div>
            </div>
          )}

          {/* Cover Image */}
          {wedding.coverImageUrl && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Foto Sampul</p>
              <div className="relative h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                <img 
                  src={wedding.coverImageUrl} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Theme Info */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Tema siap digunakan</p>
                <p className="text-xs text-gray-500 mt-1">
                  Warna dan branding akan tampil di undangan digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}