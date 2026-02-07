'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, Plus, Zap, CheckCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import EventForm from './components/EventForm'
import FormActions from './components/FormActions'
import { eventsApi } from '../api/events'
import { useRouter } from 'next/navigation'

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    date: '',
    location: '',
    themeColor: ''
  })

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      // Kirim data ke API
      const response = await eventsApi.createEvent(formData)
      
      // Show success message
      alert(`Pernikahan "${response.name}" berhasil dibuat!`)
      
      // Redirect ke detail event
      router.push(`/dashboard/events/${response.slug}`)
    } catch (error) {
      console.error('Error creating wedding event:', error)
      alert('Gagal membuat pernikahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAsDraft = () => {
    console.log('Menyimpan sebagai draft...')
    // Implement draft save logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 to-blue-50/30">
      {/* Header dengan tema pernikahan */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/events"
                className="p-2 rounded-lg hover:bg-pink-50 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
              </Link>
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Buat Undangan Pernikahan</h1>
                </div>
                <p className="text-gray-500">Isi form berikut untuk membuat undangan pernikahan digital</p>
              </div>
            </div>
            
            {/* Quick Stats dengan tema pernikahan */}
            <div className="flex items-center space-x-4">
                {/* Badge Momen Spesial */}
                <div className="flex items-center px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg border border-pink-100">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Momen Spesial</span>
                </div>

                {/* Badge Love Story - Perbaikan di bg-gradient */}
                <div className="flex items-center px-3 py-1.5 bg-linear-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Love Story</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
            {['Data Pengantin', 'Detail Acara', 'Pengaturan', 'Selesai'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center relative
                  ${index < 2 
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg' 
                    : index === 2
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  {index < 2 ? (
                    <CheckCircle className="w-5 h-5 text-black" />
                  ) : index === 2 ? (
                    <span className="text-sm font-bold">{index + 1}</span>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                  
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className={`
                        w-8 h-0.5
                        ${index < 2 ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200'}
                      `} />
                    </div>
                  )}
                </div>
                <span className={`
                  ml-3 text-sm font-medium hidden sm:block
                  ${index < 3 ? 'text-gray-800' : 'text-gray-400'}
                `}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Sidebar - Wedding Tips */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wedding Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-amber-500 mr-2" />
                Checklist Pernikahan
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                    formData.brideName && formData.groomName ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.brideName && formData.groomName ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <span className="text-xs text-gray-600 font-medium">1</span>
                    )}
                  </div>
                  <span className={`${formData.brideName && formData.groomName ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                    Nama pengantin lengkap
                  </span>
                </li>
                <li className="flex items-start">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                    formData.date ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.date ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <span className="text-xs text-gray-600 font-medium">2</span>
                    )}
                  </div>
                  <span className={`${formData.date ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                    Tanggal dan waktu
                  </span>
                </li>
                <li className="flex items-start">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                    formData.location ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.location ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <span className="text-xs text-gray-600 font-medium">3</span>
                    )}
                  </div>
                  <span className={`${formData.location ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                    Lokasi venue
                  </span>
                </li>
                <li className="flex items-start">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                    formData.themeColor ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.themeColor ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <span className="text-xs text-gray-600 font-medium">4</span>
                    )}
                  </div>
                  <span className={`${formData.themeColor ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                    Warna tema
                  </span>
                </li>
              </ul>
            </div>

            {/* Wedding Templates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Tema Pernikahan</h3>
              <div className="space-y-3">
                {[
                  { name: 'Romantis Pink', color: '#F472B6', desc: 'Tema lembut dan romantis' },
                  { name: 'Elegant Purple', color: '#8B5CF6', desc: 'Klasik dan elegan' },
                  { name: 'Natural Green', color: '#10B981', desc: 'Alami dan segar' },
                  { name: 'Luxury Gold', color: '#F59E0B', desc: 'Mewah dan glamour' },
                ].map((template) => (
                  <button
                    key={template.name}
                    type="button"
                    onClick={() => {
                      // Set theme color
                      const event = new CustomEvent('setThemeColor', { detail: template.color })
                      window.dispatchEvent(event)
                    }}
                    className="w-full flex items-start p-3 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-300"
                  >
                    <div 
                      className="w-8 h-8 rounded mr-3 flex-shrink-0"
                      style={{ backgroundColor: template.color }}
                    ></div>
                    <div className="text-left">
                      <span className="font-medium text-gray-700">{template.name}</span>
                      <p className="text-xs text-gray-500">{template.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wedding Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Tips Pernikahan</h3>
              <div className="space-y-3">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <p className="text-sm text-pink-700 font-medium">💝 Warna Tema</p>
                  <p className="text-xs text-pink-600 mt-1">
                    Pilih warna yang cocok dengan venue dan dekorasi
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">📅 Jadwal</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Buat jadwal fleksibel untuk akad dan resepsi
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">👥 Tamu</p>
                  <p className="text-xs text-green-600 mt-1">
                    Estimasi tamu 70-80% dari total undangan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Form Header dengan tema pernikahan */}
              <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-pink-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Formulir Pernikahan</h2>
                    <p className="text-gray-500">Lengkapi data pernikahan Anda dengan detail</p>
                  </div>
                  <div className="flex items-center px-3 py-1.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-md">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">New Wedding</span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <EventForm
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </div>

              {/* Form Actions */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard/events"
                      className="flex items-center px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali
                    </Link>
                    
                    <button
                      type="button"
                      onClick={handleSaveAsDraft}
                      disabled={loading}
                      className={`
                        flex items-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300
                        ${loading
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Simpan sebagai Draft
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault()
                      const form = document.querySelector('form')
                      form.dispatchEvent(new Event('submit', { cancelable: true }))
                    }}
                    className={`
                      flex items-center px-6 py-3 font-medium rounded-xl shadow-lg
                      transition-all duration-300 transform hover:scale-[1.02]
                      ${loading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:shadow-xl'
                      }
                    `}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Membuat...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Buat Undangan Pernikahan
                      </>
                    )}
                  </button>
                </div>
                
                {/* Status Indicators */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Data pengantin lengkap</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Undangan digital siap</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Butuh Bantuan?</h4>
                  <p className="text-gray-600 text-sm">
                    Konsultasi tema pernikahan atau bantuan teknis untuk undangan digital.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard/help/wedding"
                    className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Panduan Pernikahan
                  </Link>
                  <Link
                    href="/dashboard/support"
                    className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Konsultasi Gratis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}