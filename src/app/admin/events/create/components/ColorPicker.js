'use client'

import { useState } from 'react'
import { Palette, Check, Heart, Sparkles } from 'lucide-react'

const weddingColorPresets = [
  { name: 'Pink Romantic', value: '#F472B6', description: 'Lembut & Romantis' },
  { name: 'Purple Royal', value: '#7C3AED', description: 'Elegan & Mewah' },
  { name: 'Navy Classic', value: '#1E3A8A', description: 'Klasik & Formal' },
  { name: 'Green Natural', value: '#10B981', description: 'Alami & Segar' },
  { name: 'Gold Luxury', value: '#F59E0B', description: 'Mewah & Glamour' },
  { name: 'Blush Pink', value: '#FDA4AF', description: 'Manis & Lembut' },
  { name: 'Coral Warm', value: '#FB7185', description: 'Hangat & Ceria' },
  { name: 'Lavender', value: '#A78BFA', description: 'Lembut & Tenang' },
]

export default function ColorPicker({ value = '#7C3AED', onChange }) {
  const [showCustom, setShowCustom] = useState(false)
  const [customColor, setCustomColor] = useState(value)

  const handlePresetClick = (colorValue) => {
    setShowCustom(false)
    onChange(colorValue)
  }

  const handleCustomColorChange = (e) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Preview Card */}
      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 p-4" style={{ borderColor: value + '40' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundColor: value }}></div>
        <div className="relative flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-xl shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: value }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Warna tema yang dipilih:</p>
            <p className="font-semibold text-gray-800 text-lg">{value}</p>
            <p className="text-xs text-gray-500">Klik untuk mengubah</p>
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
          {weddingColorPresets.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handlePresetClick(color.value)}
              className="group relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: value === color.value ? color.value : 'transparent',
                backgroundColor: value === color.value ? color.value + '10' : 'white'
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg mb-2 shadow-md group-hover:shadow-lg transition-all"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs font-medium text-gray-700">{color.name}</span>
              <span className="text-[10px] text-gray-500">{color.description}</span>
              
              {value === color.value && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="flex items-center text-sm text-pink-600 hover:text-pink-700 font-medium"
        >
          <Palette className="w-4 h-4 mr-2" />
          {showCustom ? 'Sembunyikan' : 'Pilih warna custom'}
        </button>

        {showCustom && (
          <div className="mt-4 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-16 h-16 cursor-pointer rounded-xl border-2 border-gray-300 hover:border-pink-400 transition-all"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const newColor = e.target.value
                    setCustomColor(newColor)
                    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                      onChange(newColor)
                    }
                  }}
                  placeholder="#7C3AED"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Masukkan kode HEX (contoh: #7C3AED)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}