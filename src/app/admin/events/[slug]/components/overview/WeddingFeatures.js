'use client'

import { 
  Camera, Send, Users, Eye, Globe, Lock,
  CheckCircle, XCircle
} from 'lucide-react'

export default function WeddingFeatures({ wedding }) {
  const features = [
    {
      key: 'allowPhotoOnCheckIn',
      icon: Camera,
      label: 'Foto Saat Check-in',
      description: 'Tamu dapat berfoto saat check-in',
      color: 'pink'
    },
    {
      key: 'autoSendPhotoToWA',
      icon: Send,
      label: 'Auto Kirim WhatsApp',
      description: 'Foto langsung dikirim ke WA tamu',
      color: 'green'
    },
    {
      key: 'enableRSVP',
      icon: Users,
      label: 'RSVP Online',
      description: 'Tamu bisa konfirmasi kehadiran',
      color: 'purple'
    },
    {
      key: 'showLiveCount',
      icon: Eye,
      label: 'Live Counter',
      description: 'Tampilkan jumlah tamu real-time',
      color: 'blue'
    }
  ]

  const getStatusColor = (active) => {
    return active 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-500 border-gray-200'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5">
        <div className="flex items-center text-white">
          <Camera className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-semibold">Fitur Undangan</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {features.map((feature) => {
            const isActive = wedding[feature.key]
            const Icon = feature.icon
            
            return (
              <div
                key={feature.key}
                className={`
                  flex items-center justify-between p-4 rounded-xl border-2 transition-all
                  ${isActive 
                    ? `bg-${feature.color}-50 border-${feature.color}-200` 
                    : 'bg-gray-50 border-gray-200 opacity-75'
                  }
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center mr-4
                    ${isActive 
                      ? `bg-${feature.color}-100 text-${feature.color}-600` 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{feature.label}</p>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
                
                <div className={`
                  flex items-center px-3 py-1 rounded-full text-xs font-medium border
                  ${getStatusColor(isActive)}
                `}>
                  {isActive ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Aktif
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Nonaktif
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Access Type */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {wedding.invitationType === 'PUBLIC' ? (
                <Globe className="w-5 h-5 text-blue-600 mr-3" />
              ) : (
                <Lock className="w-5 h-5 text-purple-600 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-800">
                  {wedding.invitationType === 'PUBLIC' ? 'Undangan Publik' : 'Undangan Privat'}
                </p>
                <p className="text-xs text-gray-500">
                  {wedding.invitationType === 'PUBLIC'
                    ? 'Semua tamu bisa mengakses undangan'
                    : 'Hanya tamu undangan khusus'}
                </p>
              </div>
            </div>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${wedding.invitationType === 'PUBLIC'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
              }
            `}>
              {wedding.invitationType}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}