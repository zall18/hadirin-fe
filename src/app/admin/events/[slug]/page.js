'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
// Components
import LoadingSkeleton from './components/LoadingSkeleton'
import WeddingHero from './components/WeddingHero'
import CoupleInfo from './components/CoupleInfo'
import DateTimeVenue from './components/DateTimeVenue'
import WeddingStats from './components/WeddingStats'
import ThemePreview from './components/ThemePreview'
import WeddingFeatures from './components/WeddingFeatures'
import ActionButtons from './components/ActionButtons'
import GuestTabs from './components/GuestTabs'
import { eventsApi } from '../api/events'

export default function WeddingDetailPage() {
  const params = useParams()
  const slug = params.slug

  const [wedding, setWedding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWeddingDetail = async () => {
    setLoading(true)
    try {
      const data = await eventsApi.getEvent(slug)
      setWedding(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching wedding detail:', err)
      setError('Gagal memuat data pernikahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchWeddingDetail()
    }
  }, [slug])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !wedding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-6">{error || 'Data tidak ditemukan'}</p>
          <Link
            href="/admin/events"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/events"
                className="p-2 rounded-xl hover:bg-pink-50 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
              </Link>
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Detail Pernikahan
                    </h1>
                    <p className="text-sm text-gray-500">
                      {wedding.weddingTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium border border-pink-200">
                #{wedding.shortCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <WeddingHero wedding={wedding} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <CoupleInfo wedding={wedding} />
            <DateTimeVenue wedding={wedding} />
            <WeddingStats wedding={wedding} />
            <GuestTabs wedding={wedding} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <ActionButtons 
              wedding={wedding} 
              onUpdate={fetchWeddingDetail} 
            />
            <ThemePreview wedding={wedding} />
            <WeddingFeatures wedding={wedding} />
          </div>
        </div>
      </div>
    </div>
  )
}