'use client'

import { useState } from 'react'
import { Palette, Check } from 'lucide-react'

const presetColors = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Custom', value: 'custom' },
]

export default function ColorPicker({ value, onChange }) {
  const [showCustom, setShowCustom] = useState(false)
  const [customColor, setCustomColor] = useState('#000000')

  const handlePresetClick = (colorValue) => {
    if (colorValue === 'custom') {
      setShowCustom(true)
      onChange(customColor)
    } else {
      setShowCustom(false)
      onChange(colorValue)
    }
  }

  const handleCustomColorChange = (e) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Warna Tema Event
        </label>
        <div className="flex items-center text-sm text-gray-500">
          <Palette className="w-4 h-4 mr-2" />
          <span>Pilih warna yang mewakili event Anda</span>
        </div>
      </div>

      {/* Preview Color */}
      <div className="flex items-center space-x-4">
        <div 
          className="w-12 h-12 rounded-xl border border-gray-200"
          style={{ backgroundColor: value }}
        />
        <div>
          <div className="font-medium text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">Kode warna HEX</div>
        </div>
      </div>

      {/* Preset Colors */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Pilih dari preset:</h4>
        <div className="grid grid-cols-6 gap-3">
          {presetColors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handlePresetClick(color.value)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl
                transition-all duration-200 hover:scale-105
                ${color.value === 'custom' 
                  ? 'border-2 border-dashed border-gray-300 hover:border-gray-400' 
                  : 'border border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {color.value !== 'custom' ? (
                <>
                  <div 
                    className="w-8 h-8 rounded-lg mb-2 border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-gray-600">{color.name}</span>
                  {value === color.value && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-lg mb-2 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-600">Custom</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Input */}
      {showCustom && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Warna Custom
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-16 h-16 cursor-pointer rounded-lg border border-gray-300"
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
                placeholder="#000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Masukkan kode warna HEX (contoh: #3B82F6)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Color Tips */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Tips Pemilihan Warna:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Pilih warna yang sesuai dengan brand atau tema event</li>
          <li>• Warna cerah untuk event yang energik</li>
          <li>• Warna gelap untuk event formal</li>
          <li>• Konsisten dengan materi promosi</li>
        </ul>
      </div>
    </div>
  )
}