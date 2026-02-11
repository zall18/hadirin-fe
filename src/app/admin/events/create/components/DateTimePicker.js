'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DateTimePicker({ 
  dateValue = '', 
  startTimeValue = '', 
  endTimeValue = '',
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  minDate = new Date().toISOString().split('T')[0]
}) {
  const [selectedDate, setSelectedDate] = useState(dateValue)
  const [startTime, setStartTime] = useState(startTimeValue || '10:00')
  const [endTime, setEndTime] = useState(endTimeValue || '14:00')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (selectedDate) {
      onDateChange(selectedDate)
    }
  }, [selectedDate, onDateChange])

  useEffect(() => {
    onStartTimeChange(startTime)
  }, [startTime, onStartTimeChange])

  useEffect(() => {
    onEndTimeChange(endTime)
  }, [endTime, onEndTimeChange])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getDayOfWeek = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[new Date(date).getDay()]
  }

  const suggestedTimes = [
    { start: '08:00', end: '12:00', label: 'Pagi (Akad)' },
    { start: '10:00', end: '14:00', label: 'Siang (Resepsi)' },
    { start: '13:00', end: '17:00', label: 'Sore' },
    { start: '18:00', end: '22:00', label: 'Malam' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mr-3">
          <Calendar className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Tanggal & Waktu Pernikahan</h3>
          <p className="text-sm text-gray-500">Atur momen spesial Anda</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl border-2 border-pink-100">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <Heart className="w-4 h-4 inline mr-2 text-pink-500" />
            Tanggal Pernikahan <span className="text-red-500">*</span>
          </label>
          {selectedDate && (
            <span className="text-xs bg-pink-200 text-pink-800 px-3 py-1 rounded-full">
              {getDayOfWeek(selectedDate)}
            </span>
          )}
        </div>
        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={minDate}
          className="w-full px-4 py-4 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
          required
        />

        {selectedDate && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-pink-100">
            <div className="flex items-center text-pink-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{formatDate(selectedDate)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Time Selection */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-purple-100">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <Clock className="w-4 h-4 inline mr-2 text-purple-500" />
          Waktu Acara
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Mulai</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Selesai</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* Quick Time Suggestions */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Pilihan waktu populer:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTimes.map((time) => (
              <button
                key={time.label}
                type="button"
                onClick={() => {
                  setStartTime(time.start)
                  setEndTime(time.end)
                }}
                className={`
                  px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${startTime === time.start && endTime === time.end
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-300'
                  }
                `}
              >
                {time.label} ({time.start}-{time.end})
              </button>
            ))}
          </div>
        </div>

        {/* Time Preview */}
        {startTime && endTime && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-700">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{startTime} - {endTime} WIB</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                {(() => {
                  const start = parseInt(startTime)
                  if (start < 12) return 'Akad Nikah'
                  if (start < 18) return 'Resepsi Siang'
                  return 'Resepsi Malam'
                })()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <Heart className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800">Tips Memilih Waktu</p>
            <p className="text-xs text-amber-700 mt-1">
              • Akad nikah biasanya pagi (08:00-10:00)<br/>
              • Resepsi siang (11:00-16:00)<br/>
              • Resepsi malam (18:00-22:00)<br/>
              • Sesuaikan dengan ketersediaan venue
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}