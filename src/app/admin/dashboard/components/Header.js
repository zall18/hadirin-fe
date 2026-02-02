'use client'

import { useState } from 'react'
import { Search, Bell, Mail, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Notifikasi dan Profil */}
        <div className="flex items-center space-x-4">
          {/* Notifikasi */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Pesan */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Mail className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* Profil Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                AS
              </div>
              <span className="hidden md:inline font-medium text-gray-700">Admin</span>
              <ChevronDown className="text-gray-500 w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profil Saya
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Pengaturan
                </a>
                <div className="border-t border-gray-200 my-1"></div>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Keluar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}