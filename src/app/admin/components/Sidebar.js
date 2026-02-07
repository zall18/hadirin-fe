'use client'

import { useState } from 'react'
import { 
  Home, Users, ShoppingCart, Package, 
  BarChart3, Settings, HelpCircle, 
  LogOut, ChevronDown, X, Menu,
  UserPlus, CreditCard, Database,
  Bell, Shield, Calendar,
  Calendars,
  UserRoundCog
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    href: '/admin/dashboard', 
    count: null,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  { 
    icon: Calendar, 
    label: 'Events', 
    href: '/admin/events', 
    count: 24,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  },
  { 
    icon: UserRoundCog, 
    label: 'Organizer', 
    href: '/dashboard/organizers', 
    count: 156,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  { 
    icon: UserRoundCog, 
    label: 'Staff', 
    href: '/dashboard/products', 
    count: 89,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  { 
    icon: BarChart3, 
    label: 'Report', 
    href: '/dashboard/reports', 
    count: null,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
]

const otherItems = [
  { 
    icon: Settings, 
    label: 'Pengaturan', 
    href: '/dashboard/settings',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50'
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  return (
    <>
      {/* Tombol Menu Mobile - Diperbarui */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-6 left-6 z-40 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <Menu className="text-white" size={24} />
        <div className="absolute -right-2 -top-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          3
        </div>
      </button>

      {/* Overlay Mobile dengan Animasi */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile - Desain Lebih Modern */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-100
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-300 ease-out
        flex flex-col h-screen shadow-xl
      `}>
        {/* Header dengan Gradien */}
        <div className="relative h-20 px-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <BarChart3 className="text-white" size={22} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Hadirin
              </span>
              <p className="text-xs text-gray-400">Hadirin Dashboard</p>
            </div>
          </div>
          
          {/* Tombol Close Mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <X className="text-gray-600" size={22} />
          </button>
        </div>

        {/* Profil User dengan Design Card */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover:border-blue-200 transition-all duration-300">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                AS
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">Admin Sistem</p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigasi dengan Jarak Lebih Besar */}
        <nav className="flex-1 p-5 overflow-y-auto">
          

          {/* Menu Utama */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Menu Utama
            </p>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center p-4 rounded-xl transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm' 
                          : 'hover:bg-gray-50 hover:border-gray-200 border border-transparent'
                        }
                        group
                      `}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {/* Indikator aktif */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"></div>
                      )}
                      
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center mr-4
                        ${isActive ? item.bgColor : 'bg-gray-50 group-hover:bg-white'}
                        transition-all duration-300
                      `}>
                        <item.icon className={`
                          w-5 h-5 ${isActive ? item.color : 'text-gray-400 group-hover:' + item.color.replace('text-', 'text-')}
                          transition-colors duration-300
                        `} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <span className={`
                          font-medium block truncate
                          ${isActive ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'}
                          transition-colors duration-300
                        `}>
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-400 truncate">Akses cepat ke {item.label.toLowerCase()}</p>
                      </div>
                      
                      {item.count && (
                        <span className={`
                          ml-3 px-2.5 py-1 rounded-full text-xs font-semibold
                          ${isActive 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }
                          transition-all duration-300
                        `}>
                          {item.count}
                        </span>
                      )}
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Menu Lainnya */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Lainnya
            </p>
            <ul className="space-y-2">
              {otherItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center mr-4 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown Demo dengan Design Lebih Baik */}
          <div className="mb-6">
            <button
              onClick={() => toggleDropdown('demo')}
              className="w-full group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-transparent hover:border-gray-200 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200 flex items-center justify-center mr-4 transition-all duration-300">
                  <Database className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                </div>
                <div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900 block">
                    Dropdown Demo
                  </span>
                  <p className="text-xs text-gray-400">Contoh menu dropdown</p>
                </div>
              </div>
              <ChevronDown className={`
                w-5 h-5 text-gray-400 transition-all duration-300
                ${activeDropdown === 'demo' ? 'rotate-180 text-blue-500' : 'group-hover:text-gray-600'}
              `} />
            </button>
            
            {/* Submenu */}
            {activeDropdown === 'demo' && (
              <div className="mt-2 ml-14 space-y-2 animate-fadeIn">
                <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-sm transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>Submenu 1</span>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-sm transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>Submenu 2</span>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-sm transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>Submenu 3</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Logout Button dengan Design Lebih Baik */}
        <div className="p-5 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <button className="group w-full flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:border-red-200 hover:from-red-50 hover:to-red-50/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 flex items-center justify-center mr-4 transition-all duration-300">
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors duration-300" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                Keluar
              </span>
              <p className="text-xs text-gray-400 group-hover:text-red-400 transition-colors duration-300">
                Logout dari sistem
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all duration-300">
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-500 rotate-270 transition-all duration-300" />
            </div>
          </button>
          
          {/* Info Versi */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">v2.1.0</p>
            <div className="flex items-center justify-center mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Sistem berjalan normal</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// Tambahkan styles CSS untuk animasi
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.rotate-270 {
  transform: rotate(270deg);
}
`

// Tambahkan styles ke dalam komponen
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}