'use client'

import { useState, useEffect } from 'react'
const { Heart, Sparkles, Info, MapPin, Building, Clock, Calendar, Map } = require("lucide-react");

const VENUE_TYPES = [
  { value: 'BALLROOM', label: 'Ballroom', icon: '🏨', description: 'Hotel mewah dengan ballroom' },
  { value: 'HOTEL', label: 'Hotel', icon: '🏨', description: 'Hotel bintang 4-5' },
  { value: 'GARDEN', label: 'Taman', icon: '🌳', description: 'Outdoor garden' },
  { value: 'BEACH', label: 'Pantai', icon: '🏖️', description: 'Resepsi di tepi pantai' },
  { value: 'CHURCH', label: 'Gereja', icon: '⛪', description: 'Gedung gereja' },
  { value: 'MOSQUE', label: 'Masjid', icon: '🕌', description: 'Gedung masjid' },
  { value: 'HOUSE', label: 'Rumah', icon: '🏠', description: 'Kediaman pribadi' },
  { value: 'VILLA', label: 'Villa', icon: '🏡', description: 'Villa pribadi' },
  { value: 'GEDUNG', label: 'Gedung', icon: '🏛️', description: 'Gedung serbaguna' },
]

export default function WeddingDetailForm({
    formData,
    handleChange
}) {
    return (
       <div className="space-y-8">
             {/* Hero Section */}
             <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 mb-8">
               <div className="relative text-center text-white">
                 <MapPin className="w-16 h-16 mx-auto mb-4" />
                 <h2 className="text-3xl font-bold mb-2">Tempat & Waktu</h2>
                 <p className="text-white/90 text-lg">Atur lokasi dan jadwal pernikahan Anda</p>
               </div>
             </div>
       
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Date & Time Section */}
               <div className="md:col-span-2">
                 <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-6">
                   <h3 className="font-semibold text-gray-800 text-lg flex items-center">
                     <Calendar className="w-5 h-5 text-pink-600 mr-2" />
                     Tanggal & Waktu Pernikahan
                   </h3>
                   
                   {/* Date Picker */}
                   <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl border-2 border-pink-100">
                     <label className="block text-sm font-medium text-gray-700 mb-3">
                       <Heart className="w-4 h-4 inline mr-2 text-pink-500" />
                       Tanggal Pernikahan <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="date"
                       value={formData.date || ''}
                       onChange={(e) => handleChange('date', e.target.value)}
                       min={new Date().toISOString().split('T')[0]}
                       className="w-full px-5 py-4 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-lg"
                       required
                     />
                   </div>
       
                   {/* Time Picker */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         <Clock className="w-4 h-4 inline mr-2 text-pink-600" />
                         Waktu Mulai
                       </label>
                       <input
                         type="time"
                         value={formData.startTime || ''}
                         onChange={(e) => handleChange('startTime', e.target.value)}
                         className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         <Clock className="w-4 h-4 inline mr-2 text-pink-600" />
                         Waktu Selesai
                       </label>
                       <input
                         type="time"
                         value={formData.endTime || ''}
                         onChange={(e) => handleChange('endTime', e.target.value)}
                         className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                       />
                     </div>
                   </div>
       
                   {/* Quick Time Suggestions */}
                   <div>
                     <p className="text-xs text-gray-500 mb-2">Pilihan waktu populer:</p>
                     <div className="flex flex-wrap gap-2">
                       {[
                         { start: '08:00', end: '12:00', label: 'Pagi (Akad)' },
                         { start: '10:00', end: '14:00', label: 'Siang (Resepsi)' },
                         { start: '13:00', end: '17:00', label: 'Sore' },
                         { start: '18:00', end: '22:00', label: 'Malam' },
                       ].map((time) => (
                         <button
                           key={time.label}
                           type="button"
                           onClick={() => {
                             handleChange('startTime', time.start)
                             handleChange('endTime', time.end)
                           }}
                           className={`
                             px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200
                             ${formData.startTime === time.start && formData.endTime === time.end
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
                 </div>
               </div>
       
               {/* Venue Name */}
               <div>
                 <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                   <label className="block text-sm font-medium text-gray-700 mb-3">
                     <Building className="w-4 h-4 inline mr-2 text-pink-600" />
                     Nama Venue <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     value={formData.venueName || ''}
                     onChange={(e) => handleChange('venueName', e.target.value)}
                     className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                     placeholder="Contoh: Hotel Indonesia Kempinski"
                     required
                   />
                 </div>
               </div>
       
               {/* Venue Type */}
               <div>
                 <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                   <label className="block text-sm font-medium text-gray-700 mb-3">
                     Tipe Venue
                   </label>
                   <select
                     value={formData.venueType || 'BALLROOM'}
                     onChange={(e) => handleChange('venueType', e.target.value)}
                     className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                   >
                     {VENUE_TYPES.map((type) => (
                       <option key={type.value} value={type.value}>
                         {type.icon} {type.label} - {type.description}
                       </option>
                     ))}
                   </select>
                 </div>
               </div>
       
               {/* Address */}
               <div className="md:col-span-2">
                 <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                   <label className="block text-sm font-medium text-gray-700 mb-3">
                     <MapPin className="w-4 h-4 inline mr-2 text-pink-600" />
                     Alamat Lengkap
                   </label>
                   <textarea
                     value={formData.address || ''}
                     onChange={(e) => handleChange('address', e.target.value)}
                     rows={3}
                     className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                     placeholder="Jl. M.H. Thamrin No.1, Jakarta Pusat"
                   />
                 </div>
               </div>
       
               {/* Google Maps URL */}
               <div className="md:col-span-2">
                 <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                   <label className="block text-sm font-medium text-gray-700 mb-3">
                     <Map className="w-4 h-4 inline mr-2 text-pink-600" />
                     Google Maps Link
                   </label>
                   <input
                     type="url"
                     value={formData.googleMapsUrl || ''}
                     onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                     className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                     placeholder="https://maps.google.com/?q=..."
                   />
                   <p className="text-xs text-gray-500 mt-2">
                     Tamu akan diarahkan ke Google Maps untuk navigasi
                   </p>
                 </div>
               </div>
       
               {/* Info Card */}
               <div className="md:col-span-2">
                 <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                   <div className="flex items-start">
                     <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                       <Heart className="w-4 h-4 text-amber-600" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-amber-800">Tips Memilih Venue</p>
                       <p className="text-xs text-amber-700 mt-1">
                         • Pilih venue minimal 6 bulan sebelum hari H<br/>
                         • Sesuaikan kapasitas dengan jumlah tamu<br/>
                         • Cek ketersediaan tanggal di venue favorit Anda
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
    )
}