'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock } from 'lucide-react'

export default function DateTimePicker({ 
  value, 
  onChange,
  minDate = new Date().toISOString().split('T')[0]
}) {
  const [date, setDate] = useState(value ? new Date(value).toISOString().split('T')[0] : '')
  const [time, setTime] = useState(value ? new Date(value).toTimeString().slice(0,5) : '09:00')

  useEffect(() => {
    if (date && time) {
      const dateTime = new Date(`${date}T${time}`)
      onChange(dateTime.toISOString())
    }
  }, [date, time, onChange])

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const getSuggestedTimes = () => {
    return [
      '09:00', '10:00', '11:00', 
      '13:00', '14:00', '15:00',
      '18:00', '19:00', '20:00'
    ]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Tanggal & Waktu Event
        </label>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Atur jadwal event</span>
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tanggal
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            min={minDate}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Time Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Waktu
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Quick Time Suggestions */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Pilihan waktu cepat:</p>
        <div className="flex flex-wrap gap-2">
          {getSuggestedTimes().map((suggestedTime) => (
            <button
              key={suggestedTime}
              type="button"
              onClick={() => setTime(suggestedTime)}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition-all duration-200
                ${time === suggestedTime
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {suggestedTime}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {date && time && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Jadwal Event:</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(`${date}T${time}`).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Waktu tersisa:</p>
              <p className="font-medium text-blue-600">
                {(() => {
                  const eventDate = new Date(`${date}T${time}`)
                  const now = new Date()
                  const diffTime = eventDate - now
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  
                  if (diffDays > 0) {
                    return `${diffDays} hari lagi`
                  } else if (diffDays === 0) {
                    return 'Hari ini'
                  } else {
                    return 'Tanggal telah lewat'
                  }
                })()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}