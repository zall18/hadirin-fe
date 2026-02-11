'use client'

import { useState, useEffect } from 'react'
const { Heart, Sparkles, Info } = require("lucide-react");

export default function BrideForm({
    formData,
    handleChange
}) {
    return (
        <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 p-8 mb-8">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/20 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/20 rounded-full"></div>
        
        <div className="relative text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-4" fill="white" />
          <h2 className="text-3xl font-bold mb-2">Mulai Cerita Cinta Anda</h2>
          <p className="text-white/90 text-lg">Isi data pengantin untuk memulai undangan digital</p>
        </div>
      </div>

      {/* Wedding Title Preview */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200 mb-6">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
            <Sparkles className="w-6 h-6 text-pink-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">Preview Judul Undangan:</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {formData.weddingTitle || `The Wedding of ${formData.groomName || '...'} & ${formData.brideName || '...'}`}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Judul akan otomatis dibuat dari nama pengantin
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Groom Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-pink-300 transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b-2 border-blue-200">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">👨</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Mempelai Pria</h3>
                <p className="text-sm text-blue-600">Data lengkap pengantin pria</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap Pria <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.groomName || ''}
                onChange={(e) => handleChange('groomName', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Contoh: Andi Pratama"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Nama lengkap tanpa gelar</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-blue-700">
                <Info className="w-4 h-4 mr-2" />
                <span className="text-sm">Nama akan muncul di undangan dan sertifikat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bride Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-pink-300 transition-all duration-300">
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5 border-b-2 border-pink-200">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">👩</span>
              </div>
              <div>
                <h3 className="font-semibold text-pink-800 text-lg">Mempelai Wanita</h3>
                <p className="text-sm text-pink-600">Data lengkap pengantin wanita</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap Wanita <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.brideName || ''}
                onChange={(e) => handleChange('brideName', e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                placeholder="Contoh: Sari Wijaya"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Nama lengkap tanpa gelar</p>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-xl">
              <div className="flex items-center text-pink-700">
                <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                <span className="text-sm">Nama akan dipadukan dengan mempelai pria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Title - Optional */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Judul Undangan (Opsional)
            </label>
            <input
              type="text"
              value={formData.weddingTitle || ''}
              onChange={(e) => handleChange('weddingTitle', e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
              placeholder={`The Wedding of ${formData.groomName || 'Andi'} & ${formData.brideName || 'Sari'}`}
            />
            <p className="text-xs text-gray-500 mt-2">
              Kosongkan untuk menggunakan judul otomatis. Maksimal 100 karakter.
            </p>
          </div>
        </div>
      </div>
    </div>
    )
}