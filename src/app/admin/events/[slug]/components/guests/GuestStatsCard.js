'use client'

import { Users, CheckCircle, Clock, XCircle, UserCheck, UserX } from 'lucide-react'

export default function GuestStatsCard({ stats = {} }) {
  const {
    total = 0,
    confirmed = 0,
    attended = 0,
    invited = 0,
    cancelled = 0,
    noShow = 0
  } = stats

  const cards = [
    {
      label: 'Total Tamu',
      value: total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Konfirmasi',
      value: confirmed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Hadir',
      value: attended,
      icon: UserCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Belum Konfirmasi',
      value: invited,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      label: 'Batal',
      value: cancelled,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      label: 'Tidak Hadir',
      value: noShow,
      icon: UserX,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{card.value}</span>
          </div>
          <p className="text-xs text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  )
}