import { Camera, CheckCircle, Globe, Heart, ImageIcon, Lock, Palette, Send, Sparkles, Upload, Users } from "lucide-react"

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

export default function WeddingFiturForm({
    handleChange,
    formData
}) {
    return (
        <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-8 mb-8">
        <div className="relative text-center text-white">
          <Palette className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Tema & Fitur</h2>
          <p className="text-white/90 text-lg">Personalisasi undangan Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Theme */}
        <div className="space-y-8">
          {/* Color Picker */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mr-3">
                    <Palette className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Warna Tema Pernikahan</h3>
                    <p className="text-sm text-gray-500">Pilih warna yang mewakili cinta kalian</p>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>

              {/* Preview Color */}
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 p-4" style={{ borderColor: formData.primaryColor + '40' }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundColor: formData.primaryColor }}></div>
                <div className="relative flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    <Heart className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Warna tema yang dipilih:</p>
                    <p className="font-semibold text-gray-800 text-lg">{formData.primaryColor}</p>
                  </div>
                </div>
              </div>

              {/* Preset Colors */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Heart className="w-4 h-4 text-pink-500 mr-2" />
                  Koleksi Warna Pernikahan
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {WEDDING_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleChange('primaryColor', color.value)}
                      className="group relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                      style={{ 
                        borderColor: formData.primaryColor === color.value ? color.value : 'transparent',
                        backgroundColor: formData.primaryColor === color.value ? color.value + '10' : 'white'
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg mb-2 shadow-md group-hover:shadow-lg transition-all"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs font-medium text-gray-700">{color.name}</span>
                      <span className="text-[10px] text-gray-500">{color.description}</span>
                      
                      {formData.primaryColor === color.value && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color */}
              <div>
                <button
                  type="button"
                  onClick={() => document.getElementById('customColorInput').click()}
                  className="flex items-center text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Pilih warna custom
                </button>
                <input
                  id="customColorInput"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="sr-only"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 text-pink-500 mr-2" />
              Logo Pasangan
            </h3>
            
            <div className="flex items-center space-x-4">
              {formData.logoUrl ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-3 border-pink-300 shadow-lg">
                  <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleChange('logoUrl', '')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center shadow-md"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-24 h-24 rounded-xl border-3 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('logoUrl', e)}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">Upload Logo</span>
                </label>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Logo/Inisial Pasangan</p>
                <p className="text-xs text-gray-500 mt-1">
                  Format: JPG, PNG (Maks 2MB)<br/>
                  Ukuran ideal: 200x200px
                </p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="w-5 h-5 text-pink-500 mr-2" />
              Foto Sampul
            </h3>
            
            {formData.coverImageUrl ? (
              <div className="relative rounded-xl overflow-hidden border-3 border-pink-300 shadow-lg">
                <img src={formData.coverImageUrl} alt="Cover" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => handleChange('coverImageUrl', '')}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm flex items-center justify-center shadow-md"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="relative block w-full h-48 rounded-xl border-3 border-dashed border-gray-300 cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('coverImageUrl', e)}
                  className="hidden"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-600">Upload Foto Sampul</span>
                  <span className="text-xs text-gray-500 mt-2">Ukuran ideal: 1200x630px</span>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Right Column - Access & Features */}
        <div className="space-y-8">
          {/* Access Settings */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 text-pink-500 mr-2" />
              Akses & Privasi
            </h3>
            
            <div className="space-y-4">
              {INVITATION_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <label
                    key={type.value}
                    className={`
                      relative flex items-start p-5 border-2 rounded-xl cursor-pointer
                      transition-all duration-300 hover:scale-[1.02]
                      ${formData.invitationType === type.value
                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="invitationType"
                      value={type.value}
                      checked={formData.invitationType === type.value}
                      onChange={(e) => handleChange('invitationType', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${formData.invitationType === type.value
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{type.label}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {formData.invitationType === type.value && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-pink-600" />
                    )}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Wedding Features */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
              Fitur Undangan Digital
            </h3>
            
            <div className="space-y-4">
              {/* Photo on Check-in */}
              <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all">
                <div className="flex items-center">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mr-4
                    ${formData.allowPhotoOnCheckIn ? 'bg-pink-100' : 'bg-gray-100'}
                  `}>
                    <Camera className={`
                      w-7 h-7
                      ${formData.allowPhotoOnCheckIn ? 'text-pink-600' : 'text-gray-400'}
                    `} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-base">Foto Saat Check-in</p>
                    <p className="text-sm text-gray-500">Ambil foto tamu saat check-in</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.allowPhotoOnCheckIn ?? true}
                    onChange={(e) => handleChange('allowPhotoOnCheckIn', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-14 h-7 rounded-full transition-colors duration-200
                    ${formData.allowPhotoOnCheckIn ? 'bg-pink-600' : 'bg-gray-300'}
                  `}>
                    <div className={`
                      w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                      ${formData.allowPhotoOnCheckIn ? 'translate-x-7' : 'translate-x-1'}
                    `} />
                  </div>
                </div>
              </label>

              {/* Auto-send to WhatsApp */}
              <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="flex items-center">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mr-4
                    ${formData.autoSendPhotoToWA ? 'bg-green-100' : 'bg-gray-100'}
                  `}>
                    <Send className={`
                      w-7 h-7
                      ${formData.autoSendPhotoToWA ? 'text-green-600' : 'text-gray-400'}
                    `} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-base">Kirim Otomatis ke WhatsApp</p>
                    <p className="text-sm text-gray-500">Foto langsung dikirim ke WA tamu</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.autoSendPhotoToWA ?? true}
                    onChange={(e) => handleChange('autoSendPhotoToWA', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-14 h-7 rounded-full transition-colors duration-200
                    ${formData.autoSendPhotoToWA ? 'bg-green-600' : 'bg-gray-300'}
                  `}>
                    <div className={`
                      w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                      ${formData.autoSendPhotoToWA ? 'translate-x-7' : 'translate-x-1'}
                    `} />
                  </div>
                </div>
              </label>

              {/* RSVP */}
              <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
                <div className="flex items-center">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mr-4
                    ${formData.enableRSVP ? 'bg-purple-100' : 'bg-gray-100'}
                  `}>
                    <Users className={`
                      w-7 h-7
                      ${formData.enableRSVP ? 'text-purple-600' : 'text-gray-400'}
                    `} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-base">RSVP Online</p>
                    <p className="text-sm text-gray-500">Tamu bisa konfirmasi kehadiran</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.enableRSVP ?? true}
                    onChange={(e) => handleChange('enableRSVP', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-14 h-7 rounded-full transition-colors duration-200
                    ${formData.enableRSVP ? 'bg-purple-600' : 'bg-gray-300'}
                  `}>
                    <div className={`
                      w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                      ${formData.enableRSVP ? 'translate-x-7' : 'translate-x-1'}
                    `} />
                  </div>
                </div>
              </label>

              {/* Live Count */}
              <label className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                <div className="flex items-center">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mr-4
                    ${formData.showLiveCount ? 'bg-blue-100' : 'bg-gray-100'}
                  `}>
                    <Users className={`
                      w-7 h-7
                      ${formData.showLiveCount ? 'text-blue-600' : 'text-gray-400'}
                    `} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-base">Live Counter</p>
                    <p className="text-sm text-gray-500">Tampilkan jumlah tamu real-time</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.showLiveCount ?? true}
                    onChange={(e) => handleChange('showLiveCount', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-14 h-7 rounded-full transition-colors duration-200
                    ${formData.showLiveCount ? 'bg-blue-600' : 'bg-gray-300'}
                  `}>
                    <div className={`
                      w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200
                      ${formData.showLiveCount ? 'translate-x-7' : 'translate-x-1'}
                    `} />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}