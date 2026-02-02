'use client'

import { useState } from 'react'
import Card from '../../../../components/ui/Card'

export default function Chart() {
  const [timeRange, setTimeRange] = useState('30days')

  const timeRanges = [
    { value: '7days', label: '7 hari terakhir' },
    { value: '30days', label: '30 hari terakhir' },
    { value: '90days', label: '90 hari terakhir' },
  ]

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Statistik Pengunjung</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Placeholder Chart */}
      <div className="h-64 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg animate-pulse-slow"></div>
      </div>

      <div className="mt-6 flex justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Pengunjung Baru</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">Pengunjung Kembali</span>
        </div>
      </div>
    </Card>
  )
}