'use client'

import { useState } from 'react'
import { X, Upload, Download, FileSpreadsheet, AlertCircle } from 'lucide-react'

export default function GuestImportModal({ isOpen, onClose, onImport }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    
    // Simulasi preview
    setPreview([
      { name: 'Budi Santoso', phone: '08123456789', category: 'FAMILY' },
      { name: 'Siti Aminah', phone: '08129876543', category: 'FRIEND' }
    ])
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulasi import
    setTimeout(() => {
      onImport(preview)
      setLoading(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Import Tamu</h3>
            <p className="text-sm text-gray-500">Upload file CSV daftar tamu</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Download */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start">
              <FileSpreadsheet className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-800">Belum punya template?</p>
                <p className="text-sm text-blue-600 mb-3">
                  Download template Excel untuk memudahkan import data
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template CSV
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-500 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-medium text-gray-700">
                  {file ? file.name : 'Klik untuk upload file'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Format: XLSX, XLS, CSV (Maks 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Preview Data */}
          {preview.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">Preview Data</h4>
                <span className="text-xs text-gray-500">{preview.length} data</span>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">Nama</th>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">No. WA</th>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Informasi Import</p>
                <ul className="text-sm text-amber-700 mt-1 space-y-1">
                  <li>• Pastikan nomor WhatsApp dalam format internasional (62xxx)</li>
                  <li>• Data yang sama akan otomatis diupdate</li>
                  <li>• Maksimal 1000 data per import</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`
              px-6 py-3 font-medium rounded-xl shadow-md transition-all
              ${!file || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg'
              }
            `}
          >
            {loading ? 'Mengimport...' : 'Import Data'}
          </button>
        </div>
      </div>
    </div>
  )
}