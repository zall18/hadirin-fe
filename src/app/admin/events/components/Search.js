'use state'

import { Filter } from "lucide-react"

export default function Search({ events }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState('all') // all, active, inactive
  const [sortBy, setSortBy] = useState('date') // date, name, guestCount


  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (filterActive === 'all') return matchesSearch
      if (filterActive === 'active') return matchesSearch && event.isActive
      if (filterActive === 'inactive') return matchesSearch && !event.isActive
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'guestCount') return b.guestCount - a.guestCount
      return 0
    })

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
    const startIndex = (currentPage - 1) * eventsPerPage
    const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage)


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari event berdasarkan nama atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              >
                <option value="date">Tanggal</option>
                <option value="name">Nama</option>
                <option value="guestCount">Jumlah Tamu</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
}