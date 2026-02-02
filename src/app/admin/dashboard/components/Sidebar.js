'use client'

import { useState } from 'react'
import { 
  Home, Users, ShoppingCart, Package, 
  BarChart3, Settings, HelpCircle, 
  LogOut, ChevronDown, X, Menu 
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', count: null },
  { icon: Users, label: 'Pengguna', href: '/dashboard/users', count: 24 },
  { icon: ShoppingCart, label: 'Pesanan', href: '/dashboard/orders', count: null },
  { icon: Package, label: 'Produk', href: '/dashboard/products', count: null },
  { icon: BarChart3, label: 'Analitik', href: '/dashboard/analytics', count: null },
]

const otherItems = [
  { icon: Settings, label: 'Pengaturan', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Bantuan', href: '/dashboard/help' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isUsersOpen, setIsUsersOpen] = useState(false)

  return (
    <>
      {/* Tombol Menu Mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay Mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300
        flex flex-col h-screen
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <BarChart3 className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Admin<span className="text-blue-500">Pro</span>
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profil User */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            AS
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">Admin Sistem</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Menu Utama
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 mb-4">
            Lainnya
          </p>
          <ul className="space-y-1">
            {otherItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="sidebar-link"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Dropdown Users untuk demo */}
          <div className="mt-8">
            <button
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className="sidebar-link w-full justify-between"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                <span>Dropdown Demo</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isUsersOpen ? 'rotate-180' : ''}`} />
            </button>
            {isUsersOpen && (
              <div className="ml-8 mt-2 space-y-1">
                <Link href="#" className="block py-2 text-sm text-gray-600 hover:text-blue-600">
                  Submenu 1
                </Link>
                <Link href="#" className="block py-2 text-sm text-gray-600 hover:text-blue-600">
                  Submenu 2
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button className="sidebar-link w-full text-gray-700 hover:text-red-600">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  )
}