'use client'

import { Heart, ArrowLeft, Sparkles, Send, Save, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function FormActions({ 
  activeStep = 1,
  loading = false, 
  isValid = true,
  handleSaveDraft,
  saving,
  handleNext,
  handlePrevious,
  onSubmit
}) {
  return (
    <div className="sticky bottom-0 bg-white border-t-2 border-pink-100 p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Link
                  href="/admin/events"
                  className="flex items-center px-5 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Batal
                </Link>
                
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className={`
                    flex items-center px-5 py-3 font-medium rounded-xl transition-all duration-300 border-2
                    ${saving
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-pink-600 border-pink-300 hover:bg-pink-50 hover:border-pink-500'
                    }
                  `}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Menyimpan...' : 'Simpan Draft'}
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                {activeStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Sebelumnya
                  </button>
                )}
                
                {activeStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isValid}
                    className={`
                      flex items-center px-6 py-3 font-medium rounded-xl shadow-lg transition-all duration-300
                      ${!isValid
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-xl'
                      }
                    `}
                  >
                    Selanjutnya
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading || !isValid}
                    className={`
                      flex items-center px-8 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105
                      ${loading || !isValid
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-2xl'
                      }
                    `}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" fill="white" />
                        Buat Undangan Pernikahan
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Validation Status */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-600">{isValid ? 'Semua data valid' : 'Lengkapi data wajib'}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Auto-save aktif</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-amber-500 mr-2" />
                <span className="text-gray-600">Draft tersimpan</span>
              </div>
            </div>
          </div>
  )
}