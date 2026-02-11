'use client'

import { useState, useEffect } from 'react'
import { Users, Camera, CheckSquare, MessageSquare, Search, Filter } from 'lucide-react'


export default function GuestTabs({ wedding }) {
  const [activeTab, setActiveTab] = useState('guests')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'guests', label: 'Daftar Tamu', icon: Users, count: wedding._count?.guests || 0 },
    { id: 'photos', label: 'Galeri Foto', icon: Camera, count: wedding._count?.photos || 0 },
    { id: 'checkins', label: 'Log Check-in', icon: CheckSquare, count: wedding._count?.checkIns || 0 },
    { id: 'wishes', label: 'Ucapan & Doa', icon: MessageSquare, count: wedding._count?.guestWishes || 0 }
  ]

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      let response
      switch (activeTab) {
        case 'guests':
        //   response = await weddingDetailApi.getGuests(wedding.slug)
        //   setData(response.data)
        //   break
        case 'photos':
        //   response = await weddingDetailApi.getPhotos(wedding.slug)
        //   setData(response.data)
        //   break
        case 'checkins':
        //   response = await weddingDetailApi.getCheckIns(wedding.slug)
        //   setData(response.data)
        //   break
        default:
          setData([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-6 py-4 text-sm font-medium transition-all relative
                ${activeTab === tab.id
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
              <span className={`
                ml-2 px-2 py-0.5 rounded-full text-xs
                ${activeTab === tab.id
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Search & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Cari ${activeTab}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Belum ada data</h3>
            <p className="text-sm text-gray-500 mb-4">
              {activeTab === 'guests' && 'Tamu undangan akan muncul di sini'}
              {activeTab === 'photos' && 'Foto akan muncul setelah tamu check-in'}
              {activeTab === 'checkins' && 'Log check-in akan muncul saat hari H'}
              {activeTab === 'wishes' && 'Ucapan dan doa dari tamu undangan'}
            </p>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              {activeTab === 'guests' && 'Tambah Tamu'}
              {activeTab === 'photos' && 'Lihat Galeri'}
              {activeTab === 'checkins' && 'Refresh'}
              {activeTab === 'wishes' && 'Lihat Ucapan'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}