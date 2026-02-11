'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  // Icons untuk step 1
  Heart, Calendar, MapPin, Clock, Globe, Lock,
  Camera, Send, Users, Palette, Image as ImageIcon,
  Upload, Map, CheckCircle, Info, Sparkles,
  Building, Home, TreePine, Umbrella, Church, Mosque,
  ArrowLeft, Save, AlertCircle
} from 'lucide-react'
import { eventsApi } from '../api/events'
import BrideForm from './components/BrideForm'
import WeddingDetailForm from './components/WeddingDetailForm'
import WeddingFiturForm from './components/WeddingFiturForm'
import FormActions from './components/FormActions'

// ==================== CONSTANTS ====================


const INVITATION_TYPES = [
  { 
    value: 'PUBLIC', 
    label: 'Undangan Publik', 
    icon: Globe, 
    description: 'Semua tamu bisa mengakses undangan' 
  },
  { 
    value: 'PRIVATE', 
    label: 'Undangan Privat', 
    icon: Lock, 
    description: 'Hanya tamu undangan khusus' 
  },
]

const WEDDING_COLORS = [
  { name: 'Purple Royal', value: '#7C3AED', description: 'Elegan & Mewah' },
  { name: 'Pink Romantic', value: '#F472B6', description: 'Lembut & Romantis' },
  { name: 'Navy Classic', value: '#1E3A8A', description: 'Klasik & Formal' },
  { name: 'Green Natural', value: '#10B981', description: 'Alami & Segar' },
  { name: 'Gold Luxury', value: '#F59E0B', description: 'Mewah & Glamour' },
  { name: 'Blush Pink', value: '#FDA4AF', description: 'Manis & Lembut' },
  { name: 'Coral Warm', value: '#FB7185', description: 'Hangat & Ceria' },
  { name: 'Lavender', value: '#A78BFA', description: 'Lembut & Tenang' },
]



// ==================== MAIN PAGE ====================
export default function CreateWeddingPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // ========== FORM DATA ==========
  const [formData, setFormData] = useState({
    // Step 1: Bride & Groom
    groomName: '',
    brideName: '',
    weddingTitle: '',
    
    // Step 2: Date & Venue
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    venueType: 'BALLROOM',
    address: '',
    googleMapsUrl: '',
    
    // Step 3: Theme & Features
    primaryColor: '#7C3AED',
    logoUrl: '',
    coverImageUrl: '',
    invitationType: 'PRIVATE',
    allowPhotoOnCheckIn: true,
    autoSendPhotoToWA: true,
    enableRSVP: true,
    showLiveCount: true,
    
    // Status
    isActive: false,
    isPublished: false
  })

  // ========== AUTO-GENERATE WEDDING TITLE ==========
  useEffect(() => {
    if (formData.groomName && formData.brideName && !formData.weddingTitle) {
      setFormData(prev => ({
        ...prev,
        weddingTitle: `The Wedding of ${prev.groomName} & ${prev.brideName}`
      }))
    }
  }, [formData.groomName, formData.brideName])

  // ========== LOAD DRAFT FROM LOCALSTORAGE ==========
  useEffect(() => {
    const savedDraft = localStorage.getItem('weddingDraft')
    if (savedDraft) {
      const confirmed = confirm('Ada draft tersimpan. Muat kembali?')
      if (confirmed) {
        setFormData(JSON.parse(savedDraft))
      } else {
        localStorage.removeItem('weddingDraft')
      }
    }
  }, [])

  // ========== FORM HANDLERS ==========
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (field, e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      handleChange(field, imageUrl)
    }
  }

  // ========== VALIDATION ==========
  const validateStep = () => {
    switch(activeStep) {
      case 0: // Step 1: Bride & Groom
        return formData.groomName?.trim() && formData.brideName?.trim()
      case 1: // Step 2: Date & Venue
        return formData.date && formData.venueName?.trim()
      case 2: // Step 3: Theme & Features
        return true // Optional fields
      case 3: // Step 4: Review
        return true
      default:
        return false
    }
  }

  // ========== NAVIGATION ==========
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => Math.min(prev + 1, 3))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setActiveStep(prev => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ========== SUBMIT HANDLER ==========
  const handleSubmit = async (e) => {
  // 1. WAJIB: Biar halaman gak refresh/kedip
  if (e && e.preventDefault) e.preventDefault(); 

  setLoading(true)
  try {
    // 2. Langsung pakai formData dari state
    console.log("Data siap dikirim:", formData); 
    const response = await eventsApi.createEvent(formData);
    if(response == 201) {
      localStorage.removeItem('weddingDraft');
      alert('Undangan berhasil dibuat!');
      router.push('/admin/events');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Gagal membuat undangan.');
  } finally {
    setLoading(false);
  }
}

  // ========== SAVE DRAFT ==========
  const handleSaveDraft = () => {
    setSaving(true)
    try {
      localStorage.setItem('weddingDraft', JSON.stringify(formData))
      alert('Draft berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan draft')
    } finally {
      setSaving(false)
    }
  }

  // ========== FORMAT DATE ==========
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const isValid = validateStep()

  // ==================== RENDER STEP 0: BRIDE & GROOM ====================
  const renderStep0 = () => (
    <BrideForm formData={formData} handleChange={handleChange} />
  )

  // ==================== RENDER STEP 1: DATE & VENUE ====================
  const renderStep1 = () => (
      <WeddingDetailForm formData={formData} handleChange={handleChange} />
  )

  // ==================== RENDER STEP 2: THEME & FEATURES ====================
  const renderStep2 = () => (
      <WeddingFiturForm formData={formData} handleChange={handleChange} />
  )

  // ==================== RENDER STEP 3: REVIEW ====================
  const renderStep3 = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-pink-500 to-purple-600 p-8 mb-8">
        <div className="relative text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Review Undangan</h2>
          <p className="text-white/90 text-lg">Periksa kembali data pernikahan Anda</p>
        </div>
      </div>

      {/* Wedding Card Preview */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200">
          {/* Cover Image */}
          {formData.coverImageUrl && (
            <div className="h-56 overflow-hidden">
              <img src={formData.coverImageUrl} alt="Wedding Cover" className="w-full h-full object-cover" />
            </div>
          )}
          
          {/* Content */}
          <div className="p-8 text-center relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover border-4 border-white" />
                ) : (
                  <Heart className="w-10 h-10 text-white" fill="white" />
                )}
              </div>
            </div>
            
            <div className="mt-12">
              {/* Wedding Title */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {formData.weddingTitle || `The Wedding of ${formData.groomName} & ${formData.brideName}`}
              </h1>
              
              {/* Couple Names */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{formData.groomName}</p>
                  <p className="text-sm text-gray-500">Putra dari Bpk. ... & Ibu ...</p>
                </div>
                <span className="text-pink-500 text-3xl">&</span>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-800">{formData.brideName}</p>
                  <p className="text-sm text-gray-500">Putri dari Bpk. ... & Ibu ...</p>
                </div>
              </div>
              
              {/* Date & Time */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl mb-4">
                <Calendar className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">
                  {formatDate(formData.date)}
                </span>
                <br />
                <Clock className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">
                  {formData.startTime || '-'} - {formData.endTime || '-'} WIB
                </span>
              </div>
              
              {/* Venue */}
              <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                <MapPin className="w-5 h-5 text-pink-600 inline mr-2" />
                <span className="font-medium text-gray-800">{formData.venueName || '-'}</span>
                <p className="text-sm text-gray-600 mt-1">{formData.address || '-'}</p>
                {formData.googleMapsUrl && (
                  <a href={formData.googleMapsUrl} target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center mt-3 text-sm text-pink-600 hover:text-pink-700 font-medium">
                    <Map className="w-4 h-4 mr-1" />
                    Buka Google Maps
                  </a>
                )}
              </div>
              
              {/* Features */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {formData.allowPhotoOnCheckIn && (
                  <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs flex items-center">
                    <Camera className="w-3 h-3 mr-1" /> Foto Check-in
                  </span>
                )}
                {formData.autoSendPhotoToWA && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
                    <Send className="w-3 h-3 mr-1" /> Auto WA
                  </span>
                )}
                {formData.enableRSVP && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" /> RSVP
                  </span>
                )}
                {formData.showLiveCount && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" /> Live Counter
                  </span>
                )}
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center">
                  {formData.invitationType === 'PUBLIC' ? 
                    <Globe className="w-3 h-3 mr-1" /> : 
                    <Lock className="w-3 h-3 mr-1" />
                  }
                  {formData.invitationType === 'PUBLIC' ? 'Publik' : 'Privat'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Theme Preview */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: formData.primaryColor }}></div>
          <span className="ml-2 text-sm text-gray-600">Warna Tema</span>
        </div>
      </div>
    </div>
  )

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-pink-100 shadow-sm sticky top-0 z-30">
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
                      Buat Undangan Pernikahan
                    </h1>
                    <p className="text-sm text-gray-500">Hadirin Wedding Management System</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Wedding Stats */}
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-pink-50 rounded-xl border border-pink-200">
                <span className="text-sm text-pink-700 font-medium">
                  {activeStep === 0 && '📝 Data Pengantin'}
                  {activeStep === 1 && '📍 Lokasi & Waktu'}
                  {activeStep === 2 && '🎨 Tema & Fitur'}
                  {activeStep === 3 && '✨ Review'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 0 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' : 'bg-gray-200'
              }`}>
                {activeStep > 0 ? <CheckCircle className="w-4 h-4" /> : 1}
              </div>
              <span className={`text-sm ${activeStep >= 0 ? 'text-gray-800' : 'text-gray-400'}`}>Pengantin</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${activeStep >= 1 ? 'bg-pink-500' : 'bg-gray-200'}`} />
            
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 1 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' : 'bg-gray-200'
              }`}>
                {activeStep > 1 ? <CheckCircle className="w-4 h-4" /> : 2}
              </div>
              <span className={`text-sm ${activeStep >= 1 ? 'text-gray-800' : 'text-gray-400'}`}>Lokasi</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${activeStep >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`} />
            
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 2 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' : 'bg-gray-200'
              }`}>
                {activeStep > 2 ? <CheckCircle className="w-4 h-4" /> : 3}
              </div>
              <span className={`text-sm ${activeStep >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>Tema</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${activeStep >= 3 ? 'bg-pink-500' : 'bg-gray-200'}`} />
            
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= 3 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' : 'bg-gray-200'
              }`}>
                4
              </div>
              <span className={`text-sm ${activeStep >= 3 ? 'text-gray-800' : 'text-gray-400'}`}>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-pink-100 overflow-hidden">
          <div className="p-8">
            {activeStep === 0 && renderStep0()}
            {activeStep === 1 && renderStep1()}
            {activeStep === 2 && renderStep2()}
            {activeStep === 3 && renderStep3()}
            <FormActions handleSaveDraft={handleSaveDraft} saving={saving} activeStep={activeStep} isValid={isValid} loading={loading} handleNext={handleNext} handlePrevious={handlePrevious} onSubmit={handleSubmit}/>
          </div>

          {/* Form Actions */}
          
        </div>

        {/* Wedding Tips Footer */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Tips Pernikahan Bahagia</h4>
                <p className="text-white/90 text-sm">
                  Buat undangan minimal 2 bulan sebelum hari H untuk persiapan yang matang
                </p>
              </div>
            </div>
            <Link
              href="/admin/wedding-guide"
              className="px-6 py-3 bg-white text-pink-600 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Panduan Lengkap
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}